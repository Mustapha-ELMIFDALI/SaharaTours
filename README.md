<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:F97316,50:EA580C,100:7C3AED&height=160&section=header&text=SaharaTours&fontSize=52&fontColor=ffffff&fontAlignY=40&desc=Plateforme%20intelligente%20de%20Gestion%20des%20R%C3%A9servations%20Touristiques&descAlignY=62&descSize=18&animation=fadeIn"/>

<br/>

<a href="./enset_mohammedia.png">
  <img src="./enset_mohammedia.png" alt="ENSET Mohammedia — École Normale Supérieure de l'Enseignement Technique" width="260" />
</a>

<br/>

<img src="https://img.shields.io/badge/%F0%9F%8F%9C%EF%B8%8F%20PROJET%20ACAD%C3%89MIQUE-ENSET%20MOHAMMEDIA%20%E2%80%A2%202025%2F2026-1f2937?style=for-the-badge&labelColor=ea580c" />

<h3>🏜️ <strong>SaharaTours</strong></h3>

<p>
  <em>Une plateforme full-stack moderne qui digitalise la réservation d'activités et de transports touristiques au Maroc,<br/>enrichie d'un chatbot IA propulsé par Google Gemini 2.5.</em>
</p>

<p>
  <img src="https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
</p>
<p>
  <img src="https://img.shields.io/badge/JWT-Security-D63AFF?style=flat-square&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini-2.5_AI-8E75B2?style=flat-square&logo=googlegemini&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Nginx-ready-009639?style=flat-square&logo=nginx&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=flat-square&logo=githubactions&logoColor=white" />
  <img src="https://img.shields.io/badge/Tests-JUnit5_·_Vitest_·_Mockito-25A162?style=flat-square&logo=vitest&logoColor=white" />
  <img src="https://img.shields.io/badge/license-MIT-F2C811?style=flat-square" />
</p>

<p>
  <a href="#-aperçu">Aperçu</a> •
  <a href="#-fonctionnalités">Fonctionnalités</a> •
  <a href="#%EF%B8%8F-architecture--stack-technique">Stack technique</a> •
  <a href="#-démarrage-rapide">Démarrage rapide</a> •
  <a href="#-déploiement-docker">Docker</a> •
  <a href="#-modélisation-uml">UML</a> •
  <a href="#-équipe--encadrement">Équipe</a>
</p>

</div>

<br/>

> [!NOTE]
> Ce projet a été réalisé dans le cadre d'un projet académique à **l'ENSET de Mohammedia**, sous l'encadrement du **Prof. Oumayma Agherai**.

---

## 🌍 Aperçu

**SaharaTours** est une plateforme web qui répond à un constat simple : le marché marocain du tourisme manque d'outils numériques modernes — les agences locales s'appuient encore sur des tableurs et des appels téléphoniques, ce qui génère inefficacités, doublons et une expérience client en deçà des attentes actuelles.

SaharaTours propose une solution complète et **clé en main** :

| 🔐 Authentification sécurisée | 🗺️ Catalogue riche | 🤖 Chatbot intelligent |
|:---:|:---:|:---:|
| Sessions protégées par **JWT** lors de l'inscription et de la connexion | **25 activités** et **18 options de transport** à explorer et filtrer | Assistant **Gemini 2.5** disponible **24h/24** pour guider les clients |

---

## ✨ Fonctionnalités

### 🧑‍🤝‍🧑 Côté Visiteur & Client
- 🔍 Parcourir et **filtrer le catalogue d'activités** (catégorie, difficulté, prix, lieu)
- 📄 Consulter les **fiches détaillées** des activités et des transports
- 📝 **S'inscrire / se connecter** via une authentification sécurisée par JWT
- 🎟️ **Réserver une activité** et/ou **un transport**, choisir une date et un nombre de participants
- 📋 **Suivre, modifier ou annuler** ses réservations en temps réel
- 👤 **Gérer son profil** (informations personnelles, mot de passe)
- 💬 Discuter avec **Sahara**, le chatbot IA, pour des recommandations et un suivi personnalisé

### 🛠️ Côté Administrateur
- 📊 **Tableau de bord** avec statistiques et graphiques dynamiques (Recharts)
- ✅ Gestion **CRUD complète** des activités, des transports et des réservations
- 👥 Gestion des **utilisateurs et des rôles**
- 🔄 Mise à jour en temps réel du **statut des réservations**

### 🤖 Intelligence Artificielle (Gemini 2.5)
- Réponses **contextualisées** basées sur le catalogue réel (activités, transports, tarifs)
- Recommandations personnalisées pour les clients connectés
- Suivi conversationnel des réservations du client (statut, historique)
- Disponible en accès libre **et** en mode personnalisé une fois authentifié

---

## 🏗️ Architecture & Stack technique

<table>
<tr>
<td valign="top" width="33%">

### 🎨 Frontend
| Technologie | Rôle |
|---|---|
| ⚛️ **React 19** | Librairie UI |
| ⚡ **Vite 5** | Build & dev server |
| 🎨 **Tailwind CSS v4** | Styling utilitaire |
| 🧭 **React Router** | Routage SPA |
| 🌐 **Axios** | Client HTTP |
| 📈 **Recharts** | Graphiques du dashboard |
| 🧠 **Context API** | Gestion d'état globale |

</td>
<td valign="top" width="33%">

### ⚙️ Backend
| Technologie | Rôle |
|---|---|
| 🍃 **Spring Boot 3.2** | Framework applicatif |
| 🔒 **Spring Security** | Authentification & rôles |
| 🔑 **JWT (JJWT)** | Jetons d'accès sécurisés |
| 🗄️ **JPA / Hibernate** | ORM & persistance |
| 📦 **Maven** | Gestion de build |
| ✂️ **Lombok** | Réduction du boilerplate |

</td>
<td valign="top" width="33%">

### 🚀 Données, Tests & DevOps
| Technologie | Rôle |
|---|---|
| 🐬 **MySQL 8** | Base de données relationnelle |
| 🐳 **Docker Compose** | Orchestration des services |
| 🌐 **Nginx** | Serveur frontend / reverse proxy |
| 🔁 **GitHub Actions** | Intégration continue (CI) |
| 🧪 **JUnit 5 / Mockito** | Tests backend |
| 🧪 **Vitest** | Tests frontend |
| ✨ **Gemini 2.5 AI** | Chatbot intelligent |

</td>
</tr>
</table>

---

## 🚀 Démarrage rapide

### ✅ Prérequis
- ☕ Java 17+
- 🟢 Node.js 20+
- 🐬 MySQL 8+
- 🐳 Docker & Docker Compose *(optionnel — voir [section Docker](#-déploiement-docker))*
- 🔑 Une clé API **Google Gemini** ([Google AI Studio](https://aistudio.google.com/app/apikey))

### 1️⃣ Cloner le dépôt
```bash
git clone https://github.com/Mustapha-ELMIFDALI/SaharaTours.git
cd SaharaTours
```

### 2️⃣ Configurer et lancer le backend
```bash
cd backend
```

```yaml
# src/main/resources/application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/saharatours_db?createDatabaseIfNotExist=true
    username: root
    password: YOUR_DB_PASSWORD
  jpa:
    hibernate:
      ddl-auto: update

app:
  jwt:
    secret: YOUR_JWT_SECRET_BASE64_MIN_32_CHARS
    expiration-ms: 86400000
```

```bash
mvn spring-boot:run
```
> 🟢 API disponible sur **http://localhost:8080**

> 💡 Pour précharger des données de démonstration : `mysql -u root -p saharatours_db < data_seed.sql`

### 3️⃣ Configurer et lancer le frontend
```bash
cd frontend
cp .env.example .env.local
```

```env
# .env.local
VITE_API_BASE_URL=http://localhost:8080/api
VITE_GEMINI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY
```

```bash
npm install
npm run dev
```
> 🟢 Application disponible sur **http://localhost:5173**

---

## 🐳 Déploiement Docker

Toute la stack (MySQL · Backend Spring Boot · Frontend React/Nginx) est orchestrée via **Docker Compose**.

```bash
# Construire et démarrer tous les services
docker compose up --build

# En arrière-plan
docker compose up -d --build

# Avec phpMyAdmin (outil d'administration MySQL)
docker compose --profile tools up

# Tout arrêter (et supprimer les volumes)
docker compose down -v
```

| Service | Conteneur | Port hôte | Description |
|---|---|:---:|---|
| 🌐 Frontend | `saharatours-frontend` | `80` | React buildé, servi par Nginx |
| ⚙️ Backend | `saharatours-backend` | `8080` | API REST Spring Boot |
| 🐬 MySQL | `saharatours-mysql` | `3307` | Base de données |
| 🛠️ phpMyAdmin | `saharatours-phpmyadmin` | `8081` | *(profil `tools`, optionnel)* |

---

## 🧪 Tests & Qualité

```bash
# Backend — JUnit 5 + Mockito
cd backend && mvn test

# Frontend — Vitest
cd frontend && npm run test
```

Le pipeline **GitHub Actions** exécute automatiquement les suites de tests backend et frontend à chaque push / pull request.

---

## 🗺️ Modélisation UML

La conception fonctionnelle du système s'appuie sur une **modélisation UML** complète :

- 📐 **Diagramme des cas d'utilisation** — trois niveaux d'accès :
  - 👤 **Visiteur** *(public)* : consulter le catalogue, filtrer, voir le détail d'une activité, s'inscrire, se connecter
  - 🧳 **Client** *(authentifié, hérite du visiteur)* : réserver une activité / un transport, suivre ses réservations, les annuler, gérer son profil, utiliser le chatbot IA
  - 🛡️ **Administrateur** *(accès complet)* : gestion CRUD des activités, transports, réservations et utilisateurs, accès au tableau de bord
- 🧩 **Diagramme de classes** — entités `Utilisateur`, `Activité`, `Transport`, `Réservation` et leurs relations, base du schéma relationnel et des entités JPA

---

## 🧭 Défis techniques relevés

| Défi | Description |
|---|---|
| 🌐 **CORS** | Résolution des blocages de requêtes entre le frontend et le backend |
| 🗄️ **JPA / Relations** | Gestion fine des relations d'entités et du mapping objet-relationnel |
| 🤖 **Gemini API (v1beta)** | Adaptation au format de requêtes spécifique et gestion du *thinking budget* du modèle |
| 🔑 **JWT & Rôles** | Mise en place robuste de l'authentification et du contrôle d'accès basé sur les rôles |
| 🎯 **Analyse métier** | Traduction des besoins du domaine touristique (réservations, activités, clients) en fonctionnalités concrètes |

---

## 🔮 Perspectives — Vision v2.0

- 💳 **Paiement en ligne** — intégration Stripe / CMI Maroc
- 📱 **Application mobile** — développement avec React Native
- 🧩 **Architecture microservices** enrichie d'un moteur **d'IA de recommandation**

---

## 📁 Structure du projet

```
SaharaTours/
├── backend/                  # API REST Spring Boot
│   └── src/main/java/...     # Auth, Activités, Transports, Réservations, Utilisateurs
├── frontend/                 # Application React + Vite
│   └── src/
│       ├── components/       # Composants réutilisables (UI, Chatbot, Layout...)
│       ├── pages/            # Pages publiques, espace client & back-office admin
│       ├── services/         # Appels API (Axios) & intégration Gemini
│       └── data/             # Données de référence (catégories, mocks)
├── docker-compose.yml        # Orchestration MySQL · Backend · Frontend · phpMyAdmin
├── data_seed.sql             # Jeu de données de démonstration
└── README.md
```

---

## 👥 Équipe & Encadrement

<div align="center">

### 🎓 Réalisé par

<table>
  <tr>
    <td align="center" width="220">
      <img src="https://img.shields.io/badge/-ELMIFDALI%20MUSTAPHA-EA580C?style=for-the-badge&logo=github&logoColor=white" /><br/>
      <sub><strong>Backend · Sécurité JWT · IA · DevOps</strong></sub>
    </td>
    <td align="center" width="220">
      <img src="https://img.shields.io/badge/-MOUSSNAOUI%20ILYAS-2563EB?style=for-the-badge&logo=github&logoColor=white" /><br/>
      <sub><strong>Architecture · Technologies</strong></sub>
    </td>
    <td align="center" width="220">
      <img src="https://img.shields.io/badge/-OUAOUACHE%20HICHAM-16A34A?style=for-the-badge&logo=github&logoColor=white" /><br/>
      <sub><strong>Cahier des charges · Conception</strong></sub>
    </td>
  </tr>
</table>

### 🧑‍🏫 Encadré par

<img src="https://img.shields.io/badge/Prof.%20OUMAYMA%20AGHERAI-Encadrante-7C3AED?style=for-the-badge&logo=googlescholar&logoColor=white" />

</div>

---

## 📄 Licence

<img src="https://img.shields.io/badge/Licence-MIT-F2C811?style=for-the-badge&labelColor=1f2937" />

Ce projet est distribué sous licence **MIT** — voir le fichier [`LICENSE`](LICENSE) pour plus de détails.

<br/>

<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:7C3AED,50:EA580C,100:F97316&height=120&section=footer&animation=fadeIn"/>

✨ &nbsp;**Réalisé avec passion à l'ENSET de Mohammedia** &nbsp;·&nbsp; 🇲🇦 &nbsp;**Made in Morocco** &nbsp;·&nbsp; 🌴 **2025/2026** &nbsp;✨

</div>
