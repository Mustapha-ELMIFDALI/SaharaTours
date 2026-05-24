-- ============================================================
--  SaharaTours — Real Morocco Data Seed  (v2 — extended)
--  Sources: GetYourGuide, Viator, Tripadvisor, CTM, Supratours
--  Generated: 2026-05-31
-- ============================================================

-- -------------------------------------------------------
-- Clear existing data (preserve users & reservations)
-- -------------------------------------------------------
DELETE FROM activity_includes;
DELETE FROM transport_features;
DELETE FROM activities;
DELETE FROM transports;

ALTER TABLE activities AUTO_INCREMENT = 1;
ALTER TABLE transports  AUTO_INCREMENT = 1;

-- ============================================================
--  ACTIVITIES  (25 real Morocco experiences)
-- ============================================================

INSERT INTO activities
  (title, category, price, duration, difficulty, location, max_people, image, rating, reviews, description)
VALUES

-- ── BATCH 1 : original 15 ─────────────────────────────────

-- 1
(
  '3-Day Sahara Desert Tour: Marrakech → Merzouga → Fès',
  'Desert',
  299.00,
  '3 days / 2 nights',
  'Easy',
  'Marrakech → Erg Chebbi, Merzouga',
  16,
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format&fit=crop',
  4.8,
  3247,
  'Cross the High Atlas via Tizi n''Tichka pass, stop at the UNESCO Kasbah of Aït Ben Haddou, ride a camel into the golden Erg Chebbi dunes at sunset, sleep under stars in a Berber luxury camp, then continue to Fès through the Ziz Valley.'
),
-- 2
(
  'Marrakech Medina & Souks Guided Walking Tour',
  'Cultural',
  35.00,
  '3 hours',
  'Easy',
  'Marrakech Medina',
  12,
  'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&auto=format&fit=crop',
  4.7,
  2189,
  'Navigate the labyrinthine souks of the Marrakech medina with a local expert. Visit the dyers'' quarter, spice market, tanneries, Madrasa Ben Youssef, and end at Jemaa el-Fnaa square. Includes Moroccan mint tea.'
),
-- 3
(
  'Agafay Desert: Quad Biking + Camel Ride & Dinner Show',
  'Adventure',
  65.00,
  '6 hours',
  'Moderate',
  'Agafay Desert, Marrakech',
  20,
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
  4.6,
  1854,
  'Ride a quad bike across the rocky Agafay desert 30 km from Marrakech, then switch to a camel for a sunset ride. The evening ends with a traditional Moroccan fantasia dinner show with live music.'
),
-- 4
(
  'Fès: Full-Day Medina & Tanneries Private Guided Tour',
  'Cultural',
  45.00,
  '8 hours',
  'Easy',
  'Fès el-Bali, Fès',
  10,
  'https://images.unsplash.com/photo-1577147443647-81856d5151af?w=800&auto=format&fit=crop',
  4.9,
  1102,
  'Explore the world''s largest car-free urban area. Visit the famous Chouara Tannery from a rooftop terrace, the Al-Qarawiyyin Mosque (oldest university in the world), Bou Inania Madrasa, and the copper-beaters'' foundouk.'
),
-- 5
(
  'Chefchaouen Day Trip from Fès – The Blue City',
  'Sightseeing',
  55.00,
  '12 hours',
  'Easy',
  'Chefchaouen, Rif Mountains',
  14,
  'https://images.unsplash.com/photo-1548019979-86c7e2cf8e11?w=800&auto=format&fit=crop',
  4.7,
  987,
  'Full-day air-conditioned transfer from Fès to the iconic blue-washed medina of Chefchaouen. Free time to wander the indigo alleys, visit the Kasbah museum, hike to the Spanish mosque for panoramic views. Cold drinks included.'
),
-- 6
(
  'Marrakech: Hot-Air Balloon Flight over the Atlas Mountains',
  'Adventure',
  185.00,
  '4 hours (1h flight)',
  'Easy',
  'Atlas Mountains, Marrakech',
  8,
  'https://images.unsplash.com/photo-1507812984078-917a274065be?w=800&auto=format&fit=crop',
  4.9,
  763,
  'Drift at sunrise above the patchwork of Berber villages, palm oases and the snow-capped High Atlas. Includes hotel pickup, pre-flight Moroccan breakfast, 60-minute flight and traditional Berber mint tea on landing.'
),
-- 7
(
  'Essaouira Day Trip from Marrakech – Coastal Fortified City',
  'Sightseeing',
  40.00,
  '10 hours',
  'Easy',
  'Essaouira',
  16,
  'https://images.unsplash.com/photo-1599982890963-3aabd60064d2?w=800&auto=format&fit=crop',
  4.6,
  1345,
  'Travel 3 hours across the Haouz plains to the UNESCO-listed blue-and-white port of Essaouira. Explore the ramparts, fish harbour, and medina souks famous for argan wood crafts. Free time for seafood lunch.'
),
-- 8
(
  'Sahara Overnight Camel Trek – Merzouga Erg Chebbi',
  'Desert',
  110.00,
  '1 night / 2 days',
  'Easy',
  'Merzouga, Drâa-Tafilalet',
  12,
  'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800&auto=format&fit=crop',
  4.8,
  2876,
  'Saddle up at sunset and ride into the Erg Chebbi dunes (up to 150 m). Spend the night in a private nomad-style tent with Berber music around the campfire. Wake for a breathtaking sunrise and try sandboarding before breakfast.'
),
-- 9
(
  'Marrakech: Authentic Hammam & Gommage Spa Experience',
  'Wellness',
  42.00,
  '2 hours',
  'Easy',
  'Marrakech Medina',
  6,
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop',
  4.7,
  654,
  'Authentic Moroccan hammam ritual at a traditional bathhouse in the medina: steam bath, black soap (beldi) scrub, kessa exfoliation, and optional argan oil massage. Towel, savon beldi and slippers provided.'
),
-- 10
(
  'Ouarzazate & Kasbah Taourirt Day Tour from Marrakech',
  'Cultural',
  75.00,
  '10 hours',
  'Easy',
  'Ouarzazate',
  16,
  'https://images.unsplash.com/photo-1565098772267-60af42b81ef2?w=800&auto=format&fit=crop',
  4.5,
  891,
  'Drive over the dramatic Tizi n''Tichka pass (2260 m) to Ouarzazate – the "Hollywood of Africa". Visit the UNESCO Kasbah of Aït Ben Haddou, Atlas Film Studios (Gladiator, Game of Thrones), and Kasbah Taourirt.'
),
-- 11
(
  'Toubkal National Park: 1-Day Guided Hike from Imlil',
  'Trekking',
  80.00,
  '8 hours',
  'Challenging',
  'Imlil, High Atlas',
  10,
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop',
  4.8,
  432,
  'Trek from the Berber village of Imlil to the Toubkal refuge (3207 m) with a certified local mountain guide. Pass walnut groves, terraced fields, and spectacular ridgelines. Includes mule for backpacks, Berber lunch, and transfer from Marrakech.'
),
-- 12
(
  'Casablanca City Tour: Hassan II Mosque + Corniche + Art Déco',
  'Cultural',
  38.00,
  '5 hours',
  'Easy',
  'Casablanca',
  15,
  'https://images.unsplash.com/photo-1600706432502-77a0e2e32790?w=800&auto=format&fit=crop',
  4.5,
  789,
  'Guided tour of the Hassan II Mosque – the world''s 7th largest mosque with a 210 m minaret – followed by a walk along the Atlantic corniche, the Art Déco Old Medina, and the vibrant Quartier Habous (New Medina).'
),
-- 13
(
  'Rabat: Royal Capital Full-Day Cultural Tour',
  'Cultural',
  50.00,
  '7 hours',
  'Easy',
  'Rabat',
  14,
  'https://images.unsplash.com/photo-1565035010268-a3816f98589a?w=800&auto=format&fit=crop',
  4.6,
  512,
  'Explore Morocco''s elegant capital: the UNESCO Kasbah of the Udayas, Hassan Tower, Mausoleum of Mohammed V, the medieval Chellah necropolis, and the colourful Medina. Includes English-speaking guide and air-conditioned transport.'
),
-- 14
(
  'Dades & Todra Gorges 2-Day Tour from Marrakech',
  'Nature',
  155.00,
  '2 days / 1 night',
  'Moderate',
  'Dades & Todra Gorges, Drâa Valley',
  12,
  'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&auto=format&fit=crop',
  4.7,
  678,
  'Drive the Road of a Thousand Kasbahs through the Drâa Valley, stop at Skoura palm grove, walk the ochre-red slot canyons of the Dadès Gorge, then hike into the Todra Gorge (300 m walls). Overnight in a kasbah hotel.'
),
-- 15
(
  'Marrakech: Traditional Moroccan Cooking Class in a Riad',
  'Gastronomy',
  55.00,
  '3.5 hours',
  'Easy',
  'Marrakech Medina',
  8,
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop',
  4.9,
  1203,
  'Start with a guided spice-market visit, then cook 3 traditional dishes (tagine, couscous, bastilla or harira) under a Moroccan chef''s instruction in a riad kitchen. Eat your creations for lunch. Recipe booklet included.'
),

-- ── BATCH 2 : 10 new activities ───────────────────────────

-- 16
(
  'Taghazout: Full-Day Beginner Surf Lesson + Lunch',
  'Adventure',
  68.00,
  '6 hours',
  'Easy',
  'Taghazout Beach, Agadir',
  10,
  'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&auto=format&fit=crop',
  4.8,
  1127,
  'Taghazout is Morocco''s surf capital. Certified ISA instructors guide absolute beginners through ocean safety, paddling, pop-up technique and first waves on a soft-top board. Full wetsuit and board rental included. A fresh Moroccan lunch at a beach café caps the day. Hotel transfer from Agadir included.'
),
-- 17
(
  'Agadir: Beach Horseback Riding at Sunset',
  'Adventure',
  45.00,
  '1.5 hours',
  'Easy',
  'Agadir Beach',
  8,
  'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&auto=format&fit=crop',
  4.7,
  854,
  'Ride along the 10 km Agadir beach as the Atlantic sun drops towards the horizon. Suitable for all levels including total beginners. Helmet, gloves and safety vest provided. Professional bilingual (French/English) riding instructor accompanies the group. Hotel pickup from Agadir city included.'
),
-- 18
(
  'Tangier: City Tour, Caves of Hercules & Cap Spartel',
  'Sightseeing',
  48.00,
  '5 hours',
  'Easy',
  'Tangier',
  15,
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&auto=format&fit=crop',
  4.6,
  731,
  'Discover the gateway between Europe and Africa. Walk the Kasbah and Old Medina, visit the American Legation Museum (only US National Historic Landmark abroad), then drive to the mythological Caves of Hercules at Cape Spartel where the Atlantic meets the Mediterranean. Panoramic viewpoint included.'
),
-- 19
(
  'Volubilis & Meknès: Roman Ruins + Imperial City Day Trip',
  'Cultural',
  60.00,
  '9 hours',
  'Easy',
  'Volubilis & Meknès',
  14,
  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&auto=format&fit=crop',
  4.7,
  592,
  'Step back 2,000 years at Volubilis, Morocco''s finest Roman archaeological site (UNESCO). Walk among extraordinary in-situ mosaics, triumphal arches and basilicas. Continue to Meknès – one of Morocco''s four Imperial Cities – to visit Bab Mansour gate, the Mausoleum of Moulay Ismail, and the vast granary Heri es-Souani. Departs from Fès or Rabat.'
),
-- 20
(
  'Ourika Valley: Waterfall Hike & Berber Village Experience',
  'Nature',
  38.00,
  '7 hours',
  'Moderate',
  'Ourika Valley, High Atlas',
  12,
  'https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=800&auto=format&fit=crop',
  4.7,
  943,
  'Just 1 hour from Marrakech, the lush Ourika Valley offers a dramatic contrast to the desert. Hike through terraced Berber farms to the seven Setti Fatma waterfalls (1800 m altitude). Visit a women''s argan oil cooperative, share a mint tea with a local Berber family, and explore traditional markets on the valley floor.'
),
-- 21
(
  'Agadir: Tandem Paragliding over the Atlantic Coast',
  'Adventure',
  95.00,
  '3 hours (20 min flight)',
  'Easy',
  'Aguergour, Agadir',
  4,
  'https://images.unsplash.com/photo-1503455637927-730bce8583c0?w=800&auto=format&fit=crop',
  4.8,
  318,
  'Soar from the 800 m cliffs of Aguergour above Agadir with an experienced FFVL-certified tandem pilot. Enjoy sweeping views of the Atlantic, Souss river estuary, and the Anti-Atlas mountains. No experience required. GoPro video of your flight included. Transfer from Agadir beach hotel provided.'
),
-- 22
(
  'Marrakech: Jardin Majorelle & Yves Saint Laurent Museum',
  'Cultural',
  30.00,
  '3 hours',
  'Easy',
  'Guéliz, Marrakech',
  15,
  'https://images.unsplash.com/photo-1548604165-b1f2ae2f00e0?w=800&auto=format&fit=crop',
  4.8,
  2541,
  'Explore one of the world''s most photographed gardens: Jardin Majorelle, designed by French painter Jacques Majorelle and later owned by Yves Saint Laurent. Cobalt-blue Art Deco Villa Oasis, giant cacti, bamboo groves and exotic fish ponds. Includes skip-the-line entrance and visit to the adjacent YSL Museum.'
),
-- 23
(
  'Merzouga: 4×4 Desert Safari, Fossil Valley & Nomad Tent',
  'Desert',
  85.00,
  '5 hours',
  'Easy',
  'Merzouga, Erfoud',
  6,
  'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&auto=format&fit=crop',
  4.7,
  476,
  'Explore the landscapes surrounding Erg Chebbi by 4×4 with a Berber driver-guide. Visit the fossil-rich black rocks of Erfoud (trilobites, orthoceras), the oasis village of Khamlia for Gnawa music, a salt lake (sebkha), and a traditional nomad family tent for tea. Sandboarding stop on the big dunes included.'
),
-- 24
(
  'Asilah: Atlantic Arts Town Day Trip from Tangier',
  'Cultural',
  42.00,
  '8 hours',
  'Easy',
  'Asilah',
  14,
  'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=800&auto=format&fit=crop',
  4.6,
  389,
  'Asilah is a jewel of Morocco''s Atlantic coast: whitewashed ramparts built by the Portuguese in 1471, narrow alleys covered in international street art (created each year during the Moussem festival), and a tranquil medina overlooking the ocean. Visit the Centre Hassan II des Rencontres Internationales and enjoy fresh grilled fish on the harbour. Transfer from Tangier included.'
),
-- 25
(
  'Agadir: Full-Day Sous-Massa National Park Flamingo Safari',
  'Nature',
  72.00,
  '8 hours',
  'Easy',
  'Sous-Massa National Park, Agadir',
  12,
  'https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=800&auto=format&fit=crop',
  4.7,
  264,
  'The Sous-Massa National Park, 40 km south of Agadir, shelters one of Morocco''s most important wetlands. Guided 4×4 safari through argan woodlands and dunes to observe flamingos, herons, oystercatchers and the endangered bald ibis (one of the last wild colonies on Earth). Includes binoculars, a Berber picnic and a swim stop on a deserted beach.'
);

-- ============================================================
--  ACTIVITY INCLUDES
-- ============================================================

-- Activity 1 — 3-Day Sahara Desert Tour
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(1,'Round-trip A/C transport Marrakech–Fès',0),
(1,'2 nights accommodation (desert camp + guesthouse)',1),
(1,'Camel trek at sunset & sunrise',2),
(1,'All breakfasts and dinners',3),
(1,'English-speaking guide',4),
(1,'Sandboarding equipment',5);

-- Activity 2 — Medina & Souks
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(2,'Local expert English-speaking guide',0),
(2,'Moroccan mint tea tasting',1),
(2,'Small group (max 12 people)',2),
(2,'Entry to Madrasa Ben Youssef',3);

-- Activity 3 — Agafay Quad + Camel + Dinner
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(3,'Hotel pickup and drop-off in Marrakech',0),
(3,'1-hour quad biking (helmet & gloves provided)',1),
(3,'30-minute camel ride',2),
(3,'Traditional Moroccan dinner (tagine, couscous)',3),
(3,'Live music & fantasia show',4);

-- Activity 4 — Fès Medina
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(4,'Private certified medina guide',0),
(4,'Rooftop tannery visit with mint sprig',1),
(4,'Bou Inania Madrasa entrance fee',2),
(4,'Traditional Moroccan lunch',3),
(4,'Hotel pickup & drop-off in Fès',4);

-- Activity 5 — Chefchaouen
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(5,'Return A/C transport from Fès',0),
(5,'English-speaking guide',1),
(5,'Cold drinks on board',2),
(5,'Free time to explore independently',3);

-- Activity 6 — Hot-Air Balloon
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(6,'Hotel pickup from Marrakech (04:30)',0),
(6,'60-minute sunrise flight with CAA-certified pilot',1),
(6,'Pre-flight Moroccan breakfast',2),
(6,'Berber mint tea & certificate on landing',3),
(6,'Flight insurance included',4);

-- Activity 7 — Essaouira
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(7,'Return A/C transfer from Marrakech',0),
(7,'English-speaking local guide',1),
(7,'Visit to ramparts & sea bastions',2),
(7,'Free time for shopping & lunch',3);

-- Activity 8 — Overnight Camel Trek
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(8,'Camel ride to the dunes at sunset',0),
(8,'Night in private Berber luxury tent (en-suite)',1),
(8,'Dinner & breakfast at camp',2),
(8,'Sandboarding board',3),
(8,'Live Gnawa music around campfire',4);

-- Activity 9 — Hammam
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(9,'Traditional steam hammam session',0),
(9,'Kessa exfoliation scrub',1),
(9,'Black soap (savon beldi) wash',2),
(9,'Towel, slippers & toiletries',3),
(9,'Optional 30-min argan oil massage (+€15)',4);

-- Activity 10 — Ouarzazate
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(10,'Hotel pickup in Marrakech',0),
(10,'A/C transport over Tizi n''Tichka pass',1),
(10,'Guided tour of Aït Ben Haddou (UNESCO)',2),
(10,'Atlas Film Studios entrance',3),
(10,'Moroccan lunch',4);

-- Activity 11 — Toubkal Hike
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(11,'Certified Toubkal mountain guide',0),
(11,'Mule for carrying backpacks',1),
(11,'Berber lunch at mountain gîte',2),
(11,'Round-trip transfer Marrakech → Imlil',3),
(11,'Trekking poles available on request',4);

-- Activity 12 — Casablanca City Tour
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(12,'Hassan II Mosque guided visit',0),
(12,'English-speaking licensed guide',1),
(12,'Air-conditioned transport',2),
(12,'Old Medina & Corniche walk',3);

-- Activity 13 — Rabat City Tour
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(13,'Kasbah of the Udayas entrance',0),
(13,'Mausoleum of Mohammed V guided visit',1),
(13,'Hassan Tower',2),
(13,'Chellah necropolis',3),
(13,'English-speaking guide + A/C transport',4);

-- Activity 14 — Dades & Todra Gorges
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(14,'Round-trip A/C transport from Marrakech',0),
(14,'1 night at a kasbah hotel (breakfast included)',1),
(14,'Guided walk through Todra Gorge',2),
(14,'Drâa Valley & Skoura palm grove stop',3),
(14,'English-speaking guide',4);

-- Activity 15 — Cooking Class
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(15,'Market visit with chef guide',0),
(15,'Hands-on cooking of 3 traditional dishes',1),
(15,'Lunch: eat what you cooked',2),
(15,'Recipe booklet (English/French)',3),
(15,'Apron & utensils provided',4);

-- Activity 16 — Taghazout Surf
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(16,'Hotel transfer from Agadir',0),
(16,'ISA-certified surf instructor (ratio 1:4)',1),
(16,'Soft-top surfboard + full wetsuit rental',2),
(16,'Rash guard, wax, leash & fins',3),
(16,'Fresh Moroccan lunch at beach café',4),
(16,'GoPro footage of your session',5);

-- Activity 17 — Agadir Horseback Riding
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(17,'Hotel pickup from Agadir city centre',0),
(17,'90-minute guided beach ride',1),
(17,'Helmet, gloves & safety vest',2),
(17,'Bilingual French/English riding instructor',3);

-- Activity 18 — Tangier City Tour
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(18,'English-speaking licensed guide',0),
(18,'Caves of Hercules entrance fee',1),
(18,'A/C transport throughout',2),
(18,'Medina & Kasbah walking tour',3),
(18,'Moroccan mint tea stop',4);

-- Activity 19 — Volubilis & Meknès
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(19,'Round-trip A/C transport from Fès or Rabat',0),
(19,'Licensed archaeologist guide at Volubilis',1),
(19,'Volubilis site entrance fee',2),
(19,'Guided tour of Meknès Medina',3),
(19,'Moroccan lunch at local restaurant',4);

-- Activity 20 — Ourika Valley
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(20,'Round-trip A/C transport from Marrakech',0),
(20,'Certified mountain guide',1),
(20,'Visit to women''s argan oil cooperative',2),
(20,'Berber family mint tea',3),
(20,'Waterfalls hike to 1800 m altitude',4);

-- Activity 21 — Paragliding Agadir
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(21,'Transfer from Agadir beach hotel',0),
(21,'FFVL-certified tandem pilot',1),
(21,'20-minute tandem flight',2),
(21,'GoPro video of your flight (downloadable)',3),
(21,'Insurance & equipment included',4);

-- Activity 22 — Jardin Majorelle
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(22,'Skip-the-line Jardin Majorelle entrance',0),
(22,'YSL Museum entrance',1),
(22,'Expert art & design guide',2),
(22,'Small group (max 15)',3);

-- Activity 23 — Merzouga 4×4 Safari
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(23,'Berber 4×4 driver-guide',0),
(23,'Fossil site & Erfoud market visit',1),
(23,'Gnawa music at Khamlia village',2),
(23,'Traditional Berber tea at nomad tent',3),
(23,'Sandboarding on Erg Chebbi',4);

-- Activity 24 — Asilah Day Trip
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(24,'Return A/C transport from Tangier',0),
(24,'English-speaking local guide',1),
(24,'Guided medina & street art tour',2),
(24,'Free time for lunch & seafood',3);

-- Activity 25 — Sous-Massa Safari
INSERT INTO activity_includes (activity_id, include_item, idx) VALUES
(25,'4×4 transport within the national park',0),
(25,'Specialist ornithologist guide',1),
(25,'Binoculars provided',2),
(25,'Berber picnic (tagine, bread, salads, fruit)',3),
(25,'Beach swim stop',4),
(25,'Transfer from Agadir hotel',5);


-- ============================================================
--  TRANSPORTS  (18 real Morocco vehicles / services)
-- ============================================================

INSERT INTO transports
  (name, type, capacity, price_per_trip, price_per_day, driver, ac, image)
VALUES

-- ── BATCH 1 : original 10 ────────────────────────────────

-- 1
(
  'Marrakech ↔ Casablanca Airport Private Transfer',
  'Sedan',
  3,
  145.00, NULL,
  true, true,
  'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&auto=format&fit=crop'
),
-- 2
(
  'Marrakech ↔ Essaouira Private Transfer',
  'Sedan',
  3,
  85.00, NULL,
  true, true,
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop'
),
-- 3
(
  'Marrakech ↔ Agadir Private Transfer',
  'SUV',
  5,
  125.00, NULL,
  true, true,
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop'
),
-- 4
(
  'Fès ↔ Chefchaouen Private Transfer',
  'Sedan',
  3,
  90.00, NULL,
  true, true,
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop'
),
-- 5
(
  'Marrakech ↔ Fès Intercity Private Transfer',
  'SUV',
  5,
  220.00, NULL,
  true, true,
  'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop'
),
-- 6
(
  'Luxury Mercedes Sprinter — Group Transfers Morocco',
  'Minibus',
  16,
  380.00, 450.00,
  true, true,
  'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&auto=format&fit=crop'
),
-- 7
(
  'Private Driver — Full Day Marrakech City (Sedan)',
  'Sedan',
  3,
  NULL, 95.00,
  true, true,
  'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&auto=format&fit=crop'
),
-- 8
(
  'Desert 4×4 — Merzouga Dunes Explorer',
  '4x4',
  4,
  120.00, 160.00,
  true, true,
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop'
),
-- 9
(
  'Casablanca ↔ Rabat ↔ Tangier Shared Shuttle',
  'Minibus',
  8,
  25.00, NULL,
  true, true,
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&auto=format&fit=crop'
),
-- 10
(
  'Airport Transfer — Marrakech RAK Airport to City Centre',
  'Sedan',
  3,
  18.00, NULL,
  true, true,
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop'
),

-- ── BATCH 2 : 8 new transports ───────────────────────────

-- 11  CTM Bus – official premium intercity coach
(
  'CTM Premium Bus — Marrakech → Agadir',
  'Bus',
  44,
  14.00, NULL,
  true, true,
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop'
),
-- 12  Supratours coach connecting train network
(
  'Supratours Coach — Marrakech → Essaouira',
  'Bus',
  44,
  9.00, NULL,
  true, true,
  'https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=800&auto=format&fit=crop'
),
-- 13  Grand Taxi shared – common Moroccan transport
(
  'Grand Taxi Shared — Marrakech → Ouarzazate',
  'Sedan',
  5,
  12.00, NULL,
  true, false,
  'https://images.unsplash.com/photo-1558981852-426c09b3d70a?w=800&auto=format&fit=crop'
),
-- 14  Luxury van for business/group intercity
(
  'Luxury Van — Fès ↔ Rabat ↔ Casablanca',
  'Minibus',
  8,
  180.00, 270.00,
  true, true,
  'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop'
),
-- 15  Airport transfer Fès
(
  'Airport Transfer — Fès FEZ Airport to Medina',
  'Sedan',
  3,
  22.00, NULL,
  true, true,
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop'
),
-- 16  Airport transfer Agadir
(
  'Airport Transfer — Agadir AGA Airport to Taghazout / City',
  'Sedan',
  3,
  20.00, NULL,
  true, true,
  'https://images.unsplash.com/photo-1540339832862-474599807836?w=800&auto=format&fit=crop'
),
-- 17  Campervan for Morocco overland
(
  '4×4 Campervan — Morocco Overland (Marrakech → Sahara)',
  '4x4',
  4,
  NULL, 220.00,
  false, true,
  'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop'
),
-- 18  Casablanca ↔ Tangier premium transfer
(
  'Casablanca ↔ Tangier Private Premium Transfer',
  'SUV',
  5,
  195.00, NULL,
  true, true,
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop'
);


-- ============================================================
--  TRANSPORT FEATURES
-- ============================================================

-- T1 — Marrakech ↔ Casablanca
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(1,'Door-to-door pickup & drop-off',0),
(1,'English-speaking driver',1),
(1,'Free bottled water on board',2),
(1,'Free cancellation 24 h before',3),
(1,'Fixed price — no meter surcharges',4);

-- T2 — Marrakech ↔ Essaouira
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(2,'Scenic argan forest route',0),
(2,'English-speaking driver',1),
(2,'Free bottled water',2),
(2,'Optional photo stops along the way',3);

-- T3 — Marrakech ↔ Agadir
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(3,'Comfortable SUV',0),
(3,'English & French-speaking driver',1),
(3,'Free bottled water',2),
(3,'Free cancellation 12 h before',3),
(3,'Luggage assistance',4);

-- T4 — Fès ↔ Chefchaouen
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(4,'Rif Mountain route',0),
(4,'English-speaking driver',1),
(4,'Cold drinks included',2),
(4,'Flexible pickup time',3);

-- T5 — Marrakech ↔ Fès
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(5,'Full-day transfer via Beni Mellal',0),
(5,'Bilingual English/French driver',1),
(5,'Azrou Cedar Forest stop on request',2),
(5,'Free bottled water & snacks',3),
(5,'Child seat available on request',4);

-- T6 — Luxury Sprinter
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(6,'Up to 16 passengers',0),
(6,'Luggage hold for 20 bags',1),
(6,'USB charging ports at every seat',2),
(6,'Professional licensed driver',3),
(6,'Wi-Fi on board',4),
(6,'Ideal for group tours & events',5);

-- T7 — Full-Day Marrakech Driver
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(7,'8-hour disposal — go anywhere in Marrakech',0),
(7,'Local knowledge & hidden-gem recommendations',1),
(7,'Free water & tissues on board',2),
(7,'Waiting time included',3);

-- T8 — Desert 4×4
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(8,'Off-road capable for desert tracks',0),
(8,'Berber driver / guide familiar with dunes',1),
(8,'Roof rack for luggage',2),
(8,'Sandboarding board on board',3),
(8,'Satellite communication device',4);

-- T9 — Casa–Rabat–Tangier Shuttle
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(9,'Shared shuttle — meets at agreed hotel',0),
(9,'Direct route — no unnecessary stops',1),
(9,'Free Wi-Fi on board',2),
(9,'1 bag + cabin bag luggage allowance',3);

-- T10 — RAK Airport Transfer
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(10,'Flight tracking — driver waits if delayed',0),
(10,'Name board at arrivals hall',1),
(10,'60 min free waiting after landing',2),
(10,'15 min to Jemaa el-Fnaa',3);

-- T11 — CTM Bus Marrakech → Agadir
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(11,'CTM official premium coach service (founded 1919)',0),
(11,'Reclining seats with extra legroom',1),
(11,'Onboard toilet',2),
(11,'Luggage hold (checked baggage)',3),
(11,'E-ticket — book online or at CTM office',4),
(11,'Departs Marrakech Gare Routière daily at 08:00 & 14:00',5);

-- T12 — Supratours Marrakech → Essaouira
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(12,'ONCF Supratours official service',0),
(12,'Connects to train network at Marrakech station',1),
(12,'Reclining seats',2),
(12,'Luggage compartment',3),
(12,'Departs daily: 07:30 / 13:00 / 17:30',4);

-- T13 — Grand Taxi Shared
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(13,'Traditional Moroccan shared grand taxi (Mercedes 190)',0),
(13,'Departs when 5 passengers fill the taxi',1),
(13,'Budget-friendly — price per seat',2),
(13,'Available from Bab Doukkala taxi rank, Marrakech',3);

-- T14 — Luxury Van Fès–Casa
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(14,'8-passenger VIP van',0),
(14,'Individual leather seats with USB charging',1),
(14,'Wi-Fi & screen entertainment',2),
(14,'Bilingual driver-guide',3),
(14,'Hotel door-to-door',4),
(14,'Stops at Azrou cedar forest on request',5);

-- T15 — Fès Airport Transfer
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(15,'Flight tracking',0),
(15,'English-speaking driver',1),
(15,'Free 45 min waiting after landing',2),
(15,'Fixed price — no surprises',3);

-- T16 — Agadir Airport Transfer
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(16,'Transfer to Agadir city or Taghazout surf village',0),
(16,'Flight monitoring',1),
(16,'Name board at arrivals',2),
(16,'Free 45 min waiting after landing',3),
(16,'Free bottled water on board',4);

-- T17 — 4×4 Campervan
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(17,'Self-drive — no driver required',0),
(17,'Full kitchen & sleeping area (2 adults)',1),
(17,'Solar panel + 100Ah battery',2),
(17,'GPS + offline Morocco maps pre-loaded',3),
(17,'Unlimited mileage',4),
(17,'24/7 roadside assistance in Morocco',5);

-- T18 — Casablanca ↔ Tangier Premium
INSERT INTO transport_features (transport_id, feature, idx) VALUES
(18,'330 km route via A1 autoroute',0),
(18,'English-speaking professional driver',1),
(18,'Free bottled water & snacks',2),
(18,'Optional stop at Asilah seaside town',3),
(18,'Free cancellation 24 h before',4);

-- ============================================================
--  END OF SEED  — 25 activities · 18 transports
-- ============================================================
