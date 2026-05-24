package ma.saharatours;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.saharatours.entity.Activity;
import ma.saharatours.entity.Reservation;
import ma.saharatours.entity.Transport;
import ma.saharatours.entity.User;
import ma.saharatours.enums.ReservationStatus;
import ma.saharatours.enums.Role;
import ma.saharatours.repository.ActivityRepository;
import ma.saharatours.repository.ReservationRepository;
import ma.saharatours.repository.TransportRepository;
import ma.saharatours.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

/**
 * Seeds the database with initial data matching the frontend mockData.js.
 * Runs only if the database is empty (no users found).
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepo;
    private final ActivityRepository activityRepo;
    private final TransportRepository transportRepo;
    private final ReservationRepository reservationRepo;
    private final PasswordEncoder encoder;

    @Override
    public void run(String... args) {
        if (userRepo.count() > 0) {
            log.info("Base de données déjà initialisée — seed ignoré.");
            return;
        }
        log.info("Initialisation de la base de données SaharaTours…");
        seedUsers();
        seedActivities();
        seedTransports();
        seedReservations();
        log.info("Seed terminé ✓");
    }

    // ─── Users ────────────────────────────────────────────────────────────────
    private void seedUsers() {
        userRepo.saveAll(List.of(
            user("Admin SaharaTours",  "admin@saharatours.ma",  "admin123",   Role.ADMIN, "2024-01-15"),
            user("Fatima Zahra",       "fatima@example.com",    "client123",  Role.CLIENT, "2024-02-20"),
            user("Mohammed Alami",     "mohammed@example.com",  "client123",  Role.CLIENT, "2024-03-10"),
            user("Aicha Benali",       "aicha@example.com",     "client123",  Role.CLIENT, "2024-04-05"),
            user("Karim Tahiri",       "karim@example.com",     "client123",  Role.CLIENT, "2024-05-01")
        ));
    }

    private User user(String name, String email, String password, Role role, String date) {
        return User.builder()
                .name(name).email(email)
                .password(encoder.encode(password))
                .role(role)
                .createdAt(LocalDate.parse(date))
                .build();
    }

    // ─── Activities ───────────────────────────────────────────────────────────
    private void seedActivities() {
        activityRepo.saveAll(List.of(
            Activity.builder()
                .title("Nuit sous les étoiles — Désert de Merzouga")
                .category("desert").price(1200).duration("2 jours / 1 nuit")
                .difficulty("Facile").location("Merzouga, Errachidia").maxPeople(12)
                .image("https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80")
                .rating(4.9).reviews(234)
                .description("Vivez une nuit magique sous les étoiles du Sahara. Arrivée à dos de dromadaire au camp berbère, dîner traditionnel, musique gnawa et lever de soleil inoubliable sur les dunes de l'Erg Chebbi.")
                .includes(List.of("Guide certifié", "Repas inclus", "Tente berbère", "Transport dromadaire"))
                .build(),
            Activity.builder()
                .title("Quad & Buggy dans le désert d'Agafay")
                .category("desert").price(680).duration("1 journée")
                .difficulty("Facile").location("Agafay, Marrakech").maxPeople(8)
                .image("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80")
                .rating(4.7).reviews(189)
                .description("Adrénaline garantie dans le désert de pierres d'Agafay ! Pilotez quad ou buggy à travers les pistes rocailleuses avec vue sur l'Atlas, à 40 km de Marrakech.")
                .includes(List.of("Équipement de sécurité", "Guide accompagnateur", "Thé menthe", "Assurance"))
                .build(),
            Activity.builder()
                .title("Ascension du Toubkal — Haut Atlas")
                .category("mountain").price(1800).duration("3 jours / 2 nuits")
                .difficulty("Difficile").location("Imlil, Marrakech").maxPeople(8)
                .image("https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80")
                .rating(4.8).reviews(156)
                .description("Conquérez le Jbel Toubkal (4167m), le plus haut sommet d'Afrique du Nord. Trek exigeant récompensé par des panoramas à couper le souffle sur l'Atlas et le Sahara.")
                .includes(List.of("Guide montagne certifié", "Hébergement refuges", "Repas trek", "Équipement technique"))
                .build(),
            Activity.builder()
                .title("Cascades d'Ouzoud & Nature")
                .category("mountain").price(480).duration("1 journée")
                .difficulty("Moyen").location("Ouzoud, Béni Mellal").maxPeople(15)
                .image("https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80")
                .rating(4.6).reviews(312)
                .description("Les plus belles cascades du Maroc (110m de hauteur) entourées d'oliviers centenaires. Baignade en piscines naturelles, observation des singes magots et pique-nique berbère.")
                .includes(List.of("Transport A/R", "Guide local", "Pique-nique traditionnel", "Temps libre baignade"))
                .build(),
            Activity.builder()
                .title("Kitesurf & Plage à Essaouira")
                .category("sea").price(850).duration("2 jours")
                .difficulty("Moyen").location("Essaouira").maxPeople(6)
                .image("https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80")
                .rating(4.7).reviews(89)
                .description("Essaouira, capitale du vent, est le paradis des kitesurfeurs. Cours encadrés par des moniteurs certifiés sur les plages atlantiques, puis découverte de la médina et de la cuisine de la mer.")
                .includes(List.of("Matériel kitesurf", "Moniteur certifié", "Hébergement riad", "Dîner poisson"))
                .build(),
            Activity.builder()
                .title("Plongée sous-marine à Taghazout")
                .category("sea").price(750).duration("1 journée")
                .difficulty("Moyen").location("Taghazout, Agadir").maxPeople(8)
                .image("https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80")
                .rating(4.5).reviews(67)
                .description("Explorez les fonds marins atlantiques du Maroc. Faune et flore méditerranéennes exceptionnelles, épaves historiques et formations coralliennes. Accessible aux débutants comme aux confirmés.")
                .includes(List.of("Équipement plongée complet", "Moniteur PADI", "2 plongées", "Combinaison"))
                .build(),
            Activity.builder()
                .title("Médina de Marrakech — Visite guidée")
                .category("city").price(350).duration("Demi-journée")
                .difficulty("Facile").location("Marrakech, Marrakech-Safi").maxPeople(10)
                .image("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80")
                .rating(4.8).reviews(412)
                .description("La médina de Marrakech est classée au patrimoine mondial de l'UNESCO. Notre guide vous dévoilera les trésors cachés : le souk des teinturiers, le palais Bahia, la Médersa Ben Youssef et bien sûr la place Jemaa el-Fna au coucher du soleil. Visite à pied de 4h avec dégustation de thé à la menthe.")
                .includes(List.of("Guide agréé", "Entrées monuments", "Thé à la menthe", "Dégustation épices"))
                .build(),
            Activity.builder()
                .title("Fès Médina & Tanneries")
                .category("city").price(950).duration("2 jours")
                .difficulty("Facile").location("Fès, Fès-Meknès").maxPeople(12)
                .image("https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80")
                .rating(4.9).reviews(278)
                .description("Fès el-Bali, la plus grande médina médiévale du monde, vous transporte au Moyen-Âge. Les célèbres tanneries Chouara, la Médersa Bou Inania et les souks spécialisés. Nuit dans un riad du XIVe siècle.")
                .includes(List.of("Transport A/R", "Guide expert", "Nuit riad 4*", "2 dîners traditionnels"))
                .build()
        ));
    }

    // ─── Transports ───────────────────────────────────────────────────────────
    private void seedTransports() {
        transportRepo.saveAll(List.of(
            Transport.builder()
                .name("4x4 Désert — Toyota Land Cruiser")
                .type("SUV").capacity(4).pricePerTrip(700).pricePerDay(1500.0)
                .driver(true).ac(true)
                .image("https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80")
                .features(List.of("Pilote désert", "4x4 équipé", "Jerricans eau"))
                .build(),
            Transport.builder()
                .name("Van 8 places — Confort")
                .type("Van").capacity(8).pricePerTrip(200).pricePerDay(800.0)
                .driver(true).ac(true)
                .image("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80")
                .features(List.of("Sièges inclinables", "USB charging", "Wifi à bord"))
                .build(),
            Transport.builder()
                .name("Transfert Aéroport — Casablanca")
                .type("Sedan").capacity(4).pricePerTrip(280).pricePerDay(null)
                .driver(true).ac(true)
                .image("https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80")
                .features(List.of("Accueil nominatif", "Suivi vols en temps réel", "Ponctualité garantie"))
                .build(),
            Transport.builder()
                .name("Bus Touristique 30 places")
                .type("Bus").capacity(30).pricePerTrip(1500).pricePerDay(3000.0)
                .driver(true).ac(true)
                .image("https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80")
                .features(List.of("Micro guide", "Porte-bagages", "Climatisation double"))
                .build(),
            Transport.builder()
                .name("Minibus 16 places")
                .type("Minibus").capacity(16).pricePerTrip(800).pricePerDay(1800.0)
                .driver(true).ac(true)
                .image("https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80")
                .features(List.of("Idéal groupes", "Bagages inclus", "Chauffeur bilingue"))
                .build(),
            Transport.builder()
                .name("Caïd Luxe Marrakech")
                .type("Luxury").capacity(3).pricePerTrip(1200).pricePerDay(2500.0)
                .driver(true).ac(true)
                .image("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80")
                .features(List.of("Mercedes classe S", "Eau et snacks", "Chauffeur en costume"))
                .build()
        ));
    }

    // ─── Reservations ─────────────────────────────────────────────────────────
    private void seedReservations() {
        List<User>      users       = userRepo.findAll();
        List<Activity>  activities  = activityRepo.findAll();
        List<Transport> transports  = transportRepo.findAll();

        User fatima   = users.get(1); // id 2
        User mohammed = users.get(2); // id 3
        User aicha    = users.get(3); // id 4
        User karim    = users.get(4); // id 5

        Activity nuit    = activities.get(0); // #1
        Activity quad    = activities.get(1); // #2
        Activity toubkal = activities.get(2); // #3
        Activity kite    = activities.get(4); // #5
        Activity medina  = activities.get(6); // #7

        Transport van = transports.get(1); // #2

        reservationRepo.saveAll(List.of(
            reservation(fatima,   nuit.getId(),    "activity",  nuit.getTitle(),    "2024-06-15", 2, 2400,  ReservationStatus.CONFIRMED),
            reservation(mohammed, toubkal.getId(), "activity",  toubkal.getTitle(), "2024-07-20", 1, 1800,  ReservationStatus.CONFIRMED),
            reservation(fatima,   van.getId(),     "transport", van.getName(),      "2024-07-10", 6, 1200,  ReservationStatus.CONFIRMED),
            reservation(aicha,    kite.getId(),    "activity",  kite.getTitle(),    "2024-08-05", 2, 1700,  ReservationStatus.PENDING),
            reservation(karim,    medina.getId(),  "activity",  medina.getTitle(),  "2024-08-12", 4, 1400,  ReservationStatus.PENDING),
            reservation(mohammed, quad.getId(),    "activity",  quad.getTitle(),    "2024-09-01", 3, 2040,  ReservationStatus.CANCELLED)
        ));
    }

    private Reservation reservation(User user, Long itemId, String type, String itemName,
                                    String date, int people, double total, ReservationStatus status) {
        return Reservation.builder()
                .user(user).itemId(itemId).type(type).itemName(itemName)
                .date(LocalDate.parse(date)).people(people).total(total).status(status)
                .build();
    }
}
