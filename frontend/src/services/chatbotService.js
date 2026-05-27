import { ACTIVITIES, TRANSPORTS } from '../data/mockData'

// ─── Config ───────────────────────────────────────────────────────────────────
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
// systemInstruction is only available on v1beta; gemini-2.5-flash is supported there
const MODEL   = 'gemini-2.5-flash'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`

// ─── System prompt ────────────────────────────────────────────────────────────
function buildSystemPrompt(user, reservations = []) {
  const activitiesText = ACTIVITIES.map(a =>
    `• [ID:${a.id}] ${a.title}
   Catégorie: ${a.category} | Prix: ${a.price} MAD/pers. | Durée: ${a.duration}
   Difficulté: ${a.difficulty} | Lieu: ${a.location} | Capacité: ${a.maxPeople} pers. max
   Inclus: ${a.includes.join(', ')}
   Description: ${a.description}`
  ).join('\n\n')

  const transportsText = TRANSPORTS.map(t =>
    `• [ID:${t.id}] ${t.name}
   Type: ${t.type} | Capacité: ${t.capacity} pers. | Prix/trajet: ${t.pricePerTrip} MAD${t.pricePerDay ? ` | Prix/jour: ${t.pricePerDay} MAD` : ''}
   Chauffeur: ${t.driver ? '✓ Inclus' : '✗ Non'} | Clim: ${t.ac ? '✓ Oui' : '✗ Non'}
   Options: ${t.features.join(', ')}`
  ).join('\n\n')

  let userSection = '👤 STATUT: Visiteur non connecté — peut consulter mais doit créer un compte pour réserver.'

  if (user) {
    userSection = `👤 CLIENT CONNECTÉ:
   Nom: ${user.name} | Email: ${user.email} | Rôle: ${user.role} | Membre depuis: ${user.createdAt}`

    if (reservations.length > 0) {
      userSection += `\n\n📋 RÉSERVATIONS DE CE CLIENT (${reservations.length}):\n` +
        reservations.map(r =>
          `• Réf #${String(r.id).padStart(4, '0')} — ${r.itemName}
   Type: ${r.type === 'activity' ? '🏔️ Activité' : '🚗 Transport'}
   Date: ${new Date(r.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
   Personnes: ${r.people} | Montant: ${r.total.toLocaleString('fr-FR')} MAD
   Statut: ${r.status === 'CONFIRMED' ? '✅ Confirmée' : r.status === 'PENDING' ? '⏳ En attente' : '❌ Annulée'}`
        ).join('\n\n')
    } else {
      userSection += '\n\n📋 Ce client n\'a pas encore de réservations.'
    }
  }

  return `Tu es Sahara, l'assistant virtuel de SaharaTours — agence touristique marocaine basée à Marrakech. Tu es chaleureux, enthousiaste et professionnel.

AGENCE:
• Nom: SaharaTours | Email: info@saharatours.ma | Tel: +212 524 000 000
• Adresse: 12 Rue de la Liberté, Guéliz, Marrakech | Horaires: Lun-Sam 9h-19h

ACTIVITÉS DISPONIBLES (${ACTIVITIES.length}):
${activitiesText}

TRANSPORTS DISPONIBLES (${TRANSPORTS.length}):
${transportsText}

${userSection}

RÈGLES:
1. Réponds en français (ou dans la langue de l'utilisateur)
2. Sois concis: 2-3 phrases max sauf si on demande des détails
3. Pour les VISITEURS: présente activités et tarifs, encourage l'inscription sur /register
4. Pour les CLIENTS: réponds sur leurs réservations personnelles, ne divulgue pas les données d'autres clients
5. Pour réserver: redirige vers /activities ou /transport
6. N'invente aucune information absente du catalogue ci-dessus
7. Si tu ne sais pas: propose de contacter l'équipe au +212 524 000 000`
}

// ─── Send message via REST fetch ──────────────────────────────────────────────
export async function sendChatMessage(userMessage, history, user, reservations) {
  const systemText = buildSystemPrompt(user, reservations)

  // Build conversation: skip leading bot messages so history starts with 'user'
  const raw = history.filter(m => m.role !== 'system')
  const firstUserIdx = raw.findIndex(m => m.role === 'user')
  const previous = firstUserIdx >= 0 ? raw.slice(firstUserIdx) : []

  // Full contents array: previous turns + current user message
  const contents = [
    ...previous.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    })),
    { role: 'user', parts: [{ text: userMessage }] },
  ]

  const body = {
    system_instruction: { parts: [{ text: systemText }] },
    contents,
    generationConfig: {
      maxOutputTokens: 500,
      temperature: 0.75,
      topP: 0.95,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Erreur ${res.status}`)
  }

  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Réponse vide reçue de Gemini')
  return text
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getWelcomeMessage(user) {
  if (!user) {
    return `👋 Bonjour ! Je suis **Sahara**, votre assistant SaharaTours.\n\nJe peux vous renseigner sur nos activités au Maroc (désert, montagne, mer, médina), nos transports et nos tarifs. Que puis-je faire pour vous ?`
  }
  return `👋 Bon retour **${user.name.split(' ')[0]}** ! Je suis **Sahara**, votre assistant personnel.\n\nJe peux répondre à vos questions sur vos réservations ou vous présenter de nouvelles aventures au Maroc. Comment puis-je vous aider ?`
}

export function getSuggestions(user) {
  if (!user) {
    return [
      'Quelles activités proposez-vous ?',
      "Prix d'un transfert aéroport ?",
      'Activités pour famille ?',
      'Vos contacts',
    ]
  }
  return [
    'Mes réservations en cours',
    'Statut de mes réservations',
    'Activités disponibles',
    'Comment annuler une réservation ?',
  ]
}
