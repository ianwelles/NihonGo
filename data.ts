import { DayItinerary, CityName, LocationsMap, ShoppingCategory } from './types';

// --- Date Configuration ---
export const startDate = new Date('2025-02-18');
export const endDate = new Date('2025-02-28');

export const dateToDayMap: Record<string, string> = {
  "2025-02-18": "Day 1",
  "2025-02-19": "Day 2",
  "2025-02-20": "Day 3",
  "2025-02-21": "Day 4",
  "2025-02-22": "Day 5",
  "2025-02-23": "Day 6",
  "2025-02-24": "Day 7",
  "2025-02-25": "Day 8",
  "2025-02-26": "Day 9",
  "2025-02-27": "Day 10",
  "2025-02-28": "Day 11",
};

export const dayToCity: Record<string, CityName> = {
  "Day 1": "Tokyo", "Day 2": "Tokyo", "Day 3": "Tokyo",
  "Day 4": "Kyoto", "Day 5": "Kyoto", "Day 6": "Kyoto",
  "Day 7": "Osaka",
  "Day 8": "Shanghai", "Day 9": "Shanghai", "Day 10": "Shanghai", "Day 11": "Shanghai"
};

// --- Colour Configurations ---

// UI Theme Colours by City
export const cityThemeColors: { [key in CityName]: string } = {
  Tokyo: '#FF1744',
  Kyoto: '#00B0FF',
  Osaka: '#FFEA00',
  Shanghai: '#76FF03',
};

// Map Marker Categories
export const mapMarkerColors: Record<string, string> = {
  'hotel': '#ffe0b2',     // Orange
  'food': '#ff8a80',      // Red
  'sight': '#b9f6ca',     // Green
  'travel': '#82b1ff',    // Blue
  'suggestion': '#d500f9',// Purple
  'sight_rec': '#00BCD4', // Cyan/Teal
  'food_rec': '#F48FB1',  // Soft Pink
  'shopping': '#FFD700',  // Gold
  'default': '#82b1ff'
};

// --- Itinerary Data ---
export const itineraryData: DayItinerary[] = [
  {
    dayNumber: 1,
    city: 'Tokyo',
    theme: 'Arrival & Local Life',
    date: 'Tue 18 Feb',
    activities: [
      {
        time: '10:25 AM',
        label: 'Arrival',
        description: 'Arrive at Haneda Airport. Pick up Suica/Pasmo cards.',
        link: 'https://tokyo-haneda.com/en/',
        icon: '🛬',
      },
      {
        time: 'Day',
        label: 'Shinjuku & Garden',
        description: 'Transfer to Shinjuku. Lunch at Sobahouse Konjiki Hototogisu. Walk through Shinjuku Gyoen National Garden.',
        link: 'https://konjikihototogisu.com/',
        tip: 'Konjiki Hototogisu holds a Michelin Star for their clam-broth ramen. Arrive early for a ticket!',
        icon: '🚅',
      },
      {
        time: 'Evening',
        label: 'Dinner',
        description: 'Dinner at Torikizoku (Yakitori) or the atmospheric Omoide Yokocho.',
        link: 'https://www.torikizoku.co.jp/en/',
        tip: 'Torikizoku is a reliable chain where every item is the same price—great for a low-stress first meal.',
        icon: '🍢',
      },
    ],
    hotel: {
      name: 'Hilton Tokyo',
      address: '6-6-2 Nishi-Shinjuku, Shinjuku-ku, Tokyo 160-0023, Japan',
      officialSite: 'https://www.hilton.com/en/hotels/tyohitw-hilton-tokyo/',
      directions: 'https://www.google.com/maps/dir/?api=1&destination=35.6925,139.6921',
      neighborhoodInsights: "Nishi-Shinjuku is Tokyo\'s premier skyscraper district. It offers a sophisticated, professional atmosphere a short walk from the neon-lit 'Golden Gai'. Don\'t miss the free observation decks at the Tokyo Metropolitan Government Building nearby. The area is exceptionally well-connected and borders the beautiful Shinjuku Central Park, perfect for a peaceful morning stroll.",
      tags: ['Local Vibe', 'Expert Guide'],
    },
  },
  {
    dayNumber: 2,
    city: 'Tokyo',
    theme: 'Old Tokyo & Culture',
    date: 'Wed 19 Feb',
    activities: [
      {
        time: 'Morning',
        label: 'Senso-ji Temple',
        description: 'Visit Senso-ji Temple in Asakusa.',
        link: 'https://www.senso-ji.jp/english/',
        tip: 'Try the Ningyo-yaki (doll-shaped sponge cakes) on Nakamise street; they are freshly baked and filled with red bean paste.',
        icon: '⛩️',
      },
      {
        time: 'Day',
        label: 'Imperial Palace & Tsukiji',
        description: 'Walk the Imperial Palace East Gardens. Lunch at Tsukiji Outer Market.',
        link: 'https://www.kunaicho.go.jp/e-event/higashigyoen02.html',
        tip: 'At Tsukiji, look for the queues at Sushizanmai for reliable quality, or grab a Tamagoyaki (sweet egg omelette) stick for a classic street snack.',
        icon: '🏯',
      },
      {
        time: 'Evening',
        label: 'Shinjuku Ni-chōme',
        description: 'Dinner at Ramen Nagi (Golden Gai). Then explore Shinjuku Ni-chōme. Drinks at Bridge or New Sazae.',
        link: 'http://www.n-nagi.com/english/',
        tip: 'Ramen Nagi is legendary for its intense Niboshi (sardine) broth. New Sazae is a disco institution since the 60s/70s.',
        icon: '🍸',
      },
    ],
  },
  {
    dayNumber: 3,
    city: 'Tokyo',
    theme: 'Modern Icons',
    date: 'Thu 20 Feb',
    activities: [
      {
        time: 'Morning',
        label: 'Shibuya Crossing',
        description: 'Witness the Shibuya Crossing.',
        link: 'https://www.japan-guide.com/e/e3007.html',
        icon: '📸',
      },
      {
        time: 'Day',
        label: 'Tokyo Metro Gov. Building & Takeshita Street',
        description: 'Views from Tokyo Metro Gov. Building. Walk Takeshita Street (Harajuku).',
        link: 'https://www.yokoso.metro.tokyo.lg.jp/en/tenbou/',
        icon: '🏙️',
      },
      {
        time: 'Lunch',
        label: 'Sushi',
        description: 'Authentic sushi at Sushi Kunimitsu or Osushiya Taiki.',
        link: 'https://japan-food.guide/en/restaurants/962',
        tip: 'Kunimitsu is highly rated (4.7★) for its Omakase course. Booking essential.',
        icon: '🍣',
      },
      {
        time: 'Dinner',
        label: 'Fuunji',
        description: 'Fuunji (Shinjuku).',
        link: 'https://www.fu-unji.com/',
        tip: 'Known for the best Tsukemen (dipping noodles) in Tokyo. Expect a line, but it moves fast!',
        icon: '🍜',
      },
    ],
  },
  {
    dayNumber: 4,
    city: 'Kyoto',
    theme: 'Bullet Train & Gion',
    date: 'Fri 21 Feb',
    activities: [
      {
        time: 'Morning',
        label: 'Shinkansen to Kyoto',
        description: 'Shinkansen to Kyoto (2.5 hrs). Buy an Ekiben!',
        link: 'https://www.japan-guide.com/e/e2018.html',
        tip: 'Buy a "Makunouchi" bento at Tokyo Station\'s Ekibenya Matsuri before boarding.',
        icon: '🚅',
      },
      {
        time: 'Afternoon',
        label: 'Gion District',
        description: 'Check in. Explore Gion District and Pontocho Alley.',
        link: 'https://www.japan-guide.com/e/e3902.html',
        icon: '🍵',
      },
      {
        time: 'Dinner',
        label: 'Kyo-Kaiseki meal',
        description: 'Traditional Kyo-Kaiseki meal in Gion.',
        link: 'https://www.japan-guide.com/e/e2036.html',
        tip: 'Kaiseki is the haute cuisine of Japan. If not booked, wander down Pontocho Alley for atmospheric river-side dining.',
        icon: '🍱',
      },
    ],
    hotel: {
      name: 'DoubleTree By Hilton Kyoto Station',
      address: '15 Higashi Kujo Nishi Iwamotocho, Minami-ku, Kyoto, 601-8005, Japan',
      officialSite: 'https://www.hilton.com/en/hotels/itmksdi-doubletree-kyoto-station/',
      directions: 'https://www.google.com/maps/dir/?api=1&destination=34.9825,135.7621',
      neighborhoodInsights: "The south side of Kyoto Station is a modern gateway to the city. Often quieter than the northern entrance, it features major shopping complexes like Kyoto Avanti and Aeon Mall. It\'s the most convenient spot for Shinkansen travelers and offers the quickest rail access to the Fushimi Inari shrine and the deer park in nearby Nara.",
      tags: ['Local Vibe', 'Expert Guide'],
    },
  },
  {
    dayNumber: 5,
    city: 'Kyoto',
    theme: 'Shrines, Zen & Tea',
    date: 'Sat 22 Feb',
    activities: [
      {
        time: 'Morning',
        label: 'Fushimi Inari Taisha',
        description: 'Fushimi Inari Taisha (1,000 Gates). Go early!',
        link: 'http://inari.jp/en/',
        tip: 'Arriving by 8:00 AM avoids the massive crowds and allows for a peaceful walk up the mountain.',
        icon: '⛩️',
      },
      {
        time: 'Day',
        label: 'Kiyomizu-dera & Tea Ceremony',
        description: 'Visit Kiyomizu-dera and attend a traditional Tea Ceremony.',
        link: 'https://www.kiyomizudera.or.jp/en/',
        icon: '🍂',
      },
      {
        time: 'Lunch',
        label: 'Honke Daiichi-Asahi',
        description: 'Honke Daiichi-Asahi (Kyoto Ramen).',
        link: 'https://www.honke-daiichiasahi.com/',
        tip: 'A Kyoto institution serving classic soy-based ramen. A perfect "fanatic" stop.',
        icon: '🥗',
      },
      {
        time: 'Dinner',
        label: 'Depachika',
        description: 'Explore a Depachika (Department Store Food Hall) for a variety dinner.',
        link: 'https://www.japan-guide.com/e/e2062.html',
        icon: '🍱',
      },
    ],
  },
  {
    dayNumber: 6,
    city: 'Kyoto',
    theme: 'Bamboo & Local Flavours',
    date: 'Sun 23 Feb',
    activities: [
      {
        time: 'Morning',
        label: 'Nishiki Market',
        description: 'Nishiki Market ("Kyoto\'s Kitchen").',
        link: 'https://www.kyoto-nishiki.or.jp/',
        tip: 'Try the Tako Tamago (red baby octopus with a quail egg inside).',
        icon: '🥒',
      },
      {
        time: 'Day',
        label: 'Arashiyama or Nara',
        description: 'Train to Arashiyama (Bamboo Grove) or Nara Deer Park.',
        link: 'https://www.japan-guide.com/e/e3912.html',
        icon: '🎋',
      },
      {
        time: 'Dinner',
        label: 'Obanzai',
        description: 'Obanzai (home cooking) at a local tavern.',
        link: 'https://kyoto.travel/en/dining/obanzai.html',
        tip: 'Obanzai focuses on seasonal Kyoto vegetables. For casual exploration, walk down Kiyamachi-dori.',
        icon: '🍲',
      },
    ],
  },
  {
    dayNumber: 7,
    city: 'Osaka',
    theme: 'Kitchen of Japan',
    date: 'Mon 24 Feb',
    activities: [
      {
        time: 'Morning',
        label: 'Osaka Castle',
        description: 'Train to Osaka (30 mins). Visit Osaka Castle.',
        link: 'https://www.osakacastle.net/english/',
        icon: '🚆',
      },
      {
        time: 'Day',
        label: 'Dotonbori & Shinsekai',
        description: 'Lunch at Kushikatsu Daruma. Eat through Dotonbori and retro Shinsekai.',
        link: 'https://www.kushikatsu-daruma.com/',
        tip: 'Famous for "no double dipping" fried skewers. The Dotombori branch has the giant angry chef statue!',
        icon: '🦀',
      },
      {
        time: 'Evening',
        label: 'Dōyama-chō',
        description: 'Visit Dōyama-chō (Gay District).',
        link: 'https://insideosaka.com/osaka-gay-district/',
        icon: '🏳️‍🌈',
      },
      {
        time: 'Dinner',
        label: 'Okonomiyaki',
        description: 'Okonomiyaki at Fukutaro or Ajinoya Honten.',
        link: 'https://2951.jp/',
        tip: 'Both places are legendary. Order the Negiyaki (green onion pancake) at Fukutaro.',
        icon: '🥞',
      },
    ],
    hotel: {
      name: 'Hilton Osaka',
      address: '1-8-8, Umeda, Kita-ku, Osaka 530-0001, Japan',
      officialSite: 'https://www.hilton.com/en/hotels/osahitw-hilton-osaka/',
      directions: 'https://www.google.com/maps/dir/?api=1&destination=34.7003,135.4955',
      neighborhoodInsights: "Umeda is Osaka\'s glittering northern hub. It\'s a vertical city of giant department stores, high-end dining, and the futuristic Umeda Sky Building. Being at the nexus of the city\'s rail network makes day trips to Kyoto or Kobe effortless. The \'Kitashinchi\' entertainment district nearby offers world-class cocktail bars and sophisticated dining.",
      tags: ['Local Vibe', 'Expert Guide'],
    },
  },
  {
    dayNumber: 8,
    city: 'Shanghai',
    theme: 'Arrival & Maglev',
    date: 'Tue 25 Feb',
    activities: [
      {
        time: 'Travel',
        label: 'Fly KIX to PVG. Ride the MAGLEV',
        description: 'Fly KIX to PVG. Ride the MAGLEV (430km/h).',
        link: 'https://www.meet-in-shanghai.net/traffic/maglev',
        tip: 'Maglev closes at 23:40. If hungry late, wander Anfu Road near FFC.',
        icon: '🛫',
      },
    ],
  },
  {
    dayNumber: 9,
    city: 'Shanghai',
    theme: 'Birthday Celebration 🎂',
    date: 'Wed 26 Feb',
    activities: [
      {
        time: 'Day',
        label: 'French Concession',
        description: 'Walk the French Concession. Shopping and cafe hopping at Ferguson Lane.',
        link: 'https://www.smartshanghai.com/articles/tourist/the-former-french-concession',
        icon: '🌳',
      },
      {
        time: 'Dinner',
        label: 'Fu 1039 or Fu He Hui',
        description: 'Fu 1039 (Classic) or Fu He Hui (Veg).',
        link: 'https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/fu-1039',
        tip: 'Fu 1039 (1 Michelin Star) for Smoked Fish. Fu He Hui (2 Michelin Stars) for world-class vegetarian.',
        icon: '🥢',
      },
      {
        time: 'Drinks',
        label: 'Eddy\'s or Lucca 390',
        description: 'Eddy\'s or Lucca 390.',
        link: 'https://www.timeoutshanghai.com/venue/Bars__Clubs-Bars-Gay_Bars/1368/Eddys-Bar.html',
        icon: '🍸',
      },
    ],
  },
  {
    dayNumber: 10,
    city: 'Shanghai',
    theme: 'History & Skylines',
    date: 'Thu 27 Feb',
    activities: [
      {
        time: 'Morning',
        label: 'Yu Garden & Bazaar',
        description: 'Yu Garden & Bazaar.',
        link: 'https://www.meet-in-shanghai.net/scenic-spots/yu-garden',
        icon: '🏮',
      },
      {
        time: 'Lunch',
        label: 'Jianguo 328',
        description: 'Jianguo 328.',
        link: 'https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/jianguo-328',
        tip: 'Bib Gourmand favorite for MSG-free home-style cooking.',
        icon: '🥟',
      },
      {
        time: 'Evening',
        label: 'The Bund',
        description: 'Walk The Bund.',
        link: 'https://www.meet-in-shanghai.net/scenic-spots/the-bund',
        icon: '🏙️',
      },
      {
        time: 'Dinner',
        label: 'Old Jesse',
        description: 'Old Jesse.',
        link: 'https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/old-jesse-xuhui',
        tip: 'Pre-order the Hong Shao Rou and Scallion Roasted Fish Head when booking!',
        icon: '🍽️',
      },
    ],
  },
  {
    dayNumber: 11,
    city: 'Shanghai',
    theme: 'Departure',
    date: 'Fri 28 Feb',
    activities: [
      {
        time: 'Morning',
        label: 'MAGLEV to PVG',
        description: 'Ride MAGLEV to PVG. Access First Class Lounge.',
        link: 'https://www.meet-in-shanghai.net/traffic/maglev',
        icon: '🛫',
      },
      {
        time: 'Snack',
        label: 'Yang\'s Dumplings',
        description: 'Yang\'s Dumplings inside airport.',
        tip: 'Bite a small hole in the Sheng Jian Bao first to vent the steam!',
        icon: '🥟',
      },
    ],
    hotel: {
      name: 'Hilton Shanghai City Center',
      address: 'No. 488 West Yan\'an Road, Shanghai, 200050, China',
      officialSite: 'https://www.hilton.com/en/hotels/shamshi-hilton-shanghai-city-center/',
      directions: 'https://www.google.com/maps/dir/?api=1&destination=31.2185,121.4332',
      neighborhoodInsights: "Located near the edge of the historic Former French Concession, West Yan\'an Road offers a blend of colonial charm and modern luxury. The neighborhood is famous for its tree-lined streets, boutique cafes, and art-deco architecture. It provides a more localized and authentic \'Old Shanghai\' feel compared to the tourist-heavy Bund.",
      tags: ['Local Vibe', 'Expert Guide'],
    },
  },
];

// --- Shopping Logic (Merged) ---
export const shoppingList: ShoppingCategory[] = [
  {
    title: "Drugstores (Matsumoto Kiyoshi / Welcia)",
    items: [
      { name: "Lululun Face Masks", notes: "Specifically the 'balancing' pink types." },
      { name: "Perfect Whip Cleanser", notes: "Pink version (collagen) is recommended." },
      { name: "Anessa Sunscreen", notes: "Gold bottle, roll-on or milk." },
      { name: "Rohto Lycée Eye Drops", notes: "Whitening and clearing eyes." },
      { name: "Shiseido Elixir", notes: "Creams and retinol products." },
      { name: "Zero Spot Patches", notes: "For acne/pimples." }
    ]
  },
  {
    title: "Convenience Stores (7-Eleven / Lawson)",
    items: [
      { name: "Onigiri", notes: "Tuna with mayonnaise flavour is recommended." },
      { name: "Pocky Almond Crush", notes: "Classic crunchy chocolate snack." },
      { name: "Kanro Pure Premium Gummies", notes: "Popular fruit gummy candy." }
    ]
  },
  {
    title: "Japanese Souvenirs & Brands",
    items: [
      { name: "Matcha Kit", notes: "High-quality ceremonial matcha, whisk, and bowl." },
      { name: "Yojiya", notes: "Kyoto-based brand (rice-based products)." },
      { name: "Kimono/Yukata", notes: "Traditional Japanese garment, casual summer kimono." },
      { name: "Japanese Sweets", notes: 'Assortment of mochi, KitKats, Pocky, and regional snacks.' },
      { name: "Daruma Doll", notes: 'Traditional hollow, round, Japanese doll (good luck charm).' },
    ],
  },
  {
    title: 'Electronics',
    items: [
      { name: 'Noise-Cancelling Headphones', notes: 'For long flights and bullet train rides.' },
      { name: 'Portable Power Bank', notes: 'Keep devices charged on the go.' },
      { name: 'Universal Travel Adapter', notes: 'Japan uses Type A/B sockets (like North America).' },
    ],
  },
  {
    title: 'Comfort, Health & Essentials',
    items: [
      { name: 'Comfortable Walking Shoes', notes: 'Essential for extensive walking tours.' },
      { name: 'Small First-Aid Kit', notes: 'Band-aids, pain relievers, antiseptic wipes.' },
      { name: 'Hand Sanitizer', notes: 'Convenient for on-the-go hygiene.' },
      { name: 'Passport & Visa', notes: 'Check validity and visa requirements in advance.' },
      { name: 'Travel Insurance', notes: 'Comprehensive coverage for emergencies.' },
      { name: 'Yen & Yuan (local currency)', notes: 'Some smaller shops may not accept cards.' },
      { name: 'Pocket WiFi / eSIM', notes: 'Stay connected throughout your trip.' },
    ],
  },
];

// --- Map Locations ---
export const locations: LocationsMap = {
  'Tokyo': [
    // Original Itinerary
    {name: "Haneda Airport", lat: 35.5494, lon: 139.7798, type: "travel", desc: "Arrival Airport (10:25 AM)", day: "Day 1", url: "https://tokyo-haneda.com/en/"},
    {name: "Shinjuku Station", lat: 35.6896, lon: 139.7006, type: "travel", desc: "Main Transport Hub", day: "Day 1", url: "https://www.gotokyo.org/en/destinations/western-tokyo/shinjuku/index.html"},
    {name: "Shinjuku Gyoen", lat: 35.6852, lon: 139.7101, type: "sight", desc: "Serene garden with greenhouse", day: "Day 1", url: "https://www.env.go.jp/garden/shinjukugyoen/english/index.html"},
    {name: "Torikizoku", lat: 35.6938, lon: 139.7016, type: "food", desc: "Casual Yakitori (All items same price)", day: "Day 1", url: "https://www.torikizoku.co.jp/en/"},
    {name: "Omoide Yokocho", lat: 35.6929, lon: 139.6995, type: "food", desc: "Atmospheric Memory Lane (Yakitori)", day: "Day 1", url: "http://shinjuku-omoide.com/english/"},
    {name: "Senso-ji", lat: 35.7148, lon: 139.7967, type: "sight", desc: "Tokyo's oldest temple (Asakusa)", day: "Day 2", url: "https://www.senso-ji.jp/english/"},
    {name: "Imperial Palace East Gardens", lat: 35.6852, lon: 139.7528, type: "sight", desc: "Historic castle grounds", day: "Day 2", url: "https://www.kunaicho.go.jp/e-event/higashigyoen02.html"},
    {name: "Tsukiji Outer Market", lat: 35.6655, lon: 139.7704, type: "food", desc: "Fresh Seafood Breakfast/Lunch", day: "Day 2", url: "https://www.tsukiji.or.jp/english/"},
    {name: "Shinjuku Ni-chome", lat: 35.6905, lon: 139.7066, type: "sight", desc: "Tokyo's Gay District", day: "Day 2", url: "https://www.timeout.com/tokyo/lgbtq/shinjuku-nichome-guide"},
    {name: "Shibuya Crossing", lat: 35.6595, lon: 139.7004, type: "sight", desc: "Iconic Scramble Crossing", day: "Day 3", url: "https://www.japan-guide.com/e/e3007.html"},
    {name: "Tokyo Metro Gov Building", lat: 35.6896, lon: 139.6921, type: "sight", desc: "Free Panoramic Views", day: "Day 3", url: "https://www.yokoso.metro.tokyo.lg.jp/en/tenbou/"},
    {name: "Konjiki Hototogisu", lat: 35.6897, lon: 139.7047, type: "food", desc: "Michelin Star Ramen (Clam Broth)", day: "Day 1", url: "https://konjikihototogisu.com/"},
    {name: "Ramen Nagi (Golden Gai)", lat: 35.6943, lon: 139.7046, type: "food", desc: "Famous Niboshi (Sardine) Ramen", day: "Day 2", url: "http://www.n-nagi.com/english/"},
    {name: "Fuunji", lat: 35.6872, lon: 139.6967, type: "food", desc: "Legendary Tsukemen (Dipping Noodles)", day: "Day 3", url: "https://www.fu-unji.com/"},
    {name: "Hilton Tokyo", lat: 35.6925, lon: 139.6921, type: "hotel", desc: "Top Pick Hotel - 6-6-2 Nishi-Shinjuku, Shinjuku-ku, Tokyo 160-0023, Japan", day: "Stay", url: "https://www.hilton.com/en/hotels/tyohitw-hilton-tokyo/"},
    {name: "Ichiran Shinjuku", lat: 35.6909, lon: 139.7032, type: "suggestion", desc: "The ultimate solo dining experience. Customize your Tonkotsu ramen in a private booth. Perfect for a quick, focused culinary delight.", day: "Anytime", url: "https://www.instagram.com/ichiran_jp"},
    
    // NEW RECOMMENDATIONS - TOKYO SIGHTS (Cyan)
    {name: "Ginza District", lat: 35.6712, lon: 139.7665, type: "sight_rec", desc: "Symbol of luxury and modernity. Elegant glass buildings.", day: "Any", url: "https://www.japan-guide.com/e/e3005.html"},
    {name: "Tokyo Tower", lat: 35.6586, lon: 139.7454, type: "sight_rec", desc: "Iconic red tower with city views.", day: "Any", url: "https://www.tokyotower.co.jp/en/"},
    {name: "Zojo-ji Temple", lat: 35.6574, lon: 139.7482, type: "sight_rec", desc: "Where modernity meets tradition, next to Tokyo Tower.", day: "Any", url: "https://www.zojoji.or.jp/en/"},
    {name: "Meiji Shrine", lat: 35.6764, lon: 139.6993, type: "sight_rec", desc: "Serene Shinto shrine in a dense forest.", day: "Any", url: "https://www.meijijingu.or.jp/en/"},
    {name: "Kabukicho", lat: 35.6938, lon: 139.7035, type: "sight_rec", desc: "The famous 'red light' and nightlife district.", day: "Any", url: "https://www.gotokyo.org/en/destinations/western-tokyo/shinjuku/index.html"},
    {name: "Omotesando", lat: 35.6652, lon: 139.7125, type: "sight_rec", desc: "Tree-lined fashion and architecture avenue.", day: "Any", url: "https://www.japan-guide.com/e/e3006.html"},
    {name: "Takeshita Street", lat: 35.6715, lon: 139.7031, type: "sight_rec", desc: "Harajuku youth culture and urban tribes.", day: "Any", url: "https://www.japan-guide.com/e/e3006.html"},
    {name: "Hachiko Statue", lat: 35.6591, lon: 139.7006, type: "sight_rec", desc: "Legendary loyal dog statue in Shibuya.", day: "Any", url: "https://www.japan-guide.com/e/e3007.html"},
    {name: "Akihabara Electric Town", lat: 35.6997, lon: 139.7713, type: "sight_rec", desc: "Neons, anime, manga, and video games.", day: "Any", url: "https://www.japan-guide.com/e/e3003.html"},
    {name: "Hamarikyu Gardens", lat: 35.6601, lon: 139.7630, type: "sight_rec", desc: "Quiet garden right next to Tsukiji Outer Market.", day: "Any", url: "https://www.tokyo-park.or.jp/teien/en/hama-rikyu/"},

    // NEW RECOMMENDATIONS - TOKYO FOOD (Pink)
    {name: "Yamato Sushi", lat: 35.6465, lon: 139.7879, type: "food_rec", desc: "Fresh sushi (Toyosu Market location).", day: "Any", url: "https://www.sushiyamato-toyosu.com/"},
    {name: "Hakushu Teppanyaki", lat: 35.6558, lon: 139.7015, type: "food_rec", desc: "High-end Teppanyaki for authentic Kobe beef in Shibuya.", day: "Any", url: "https://teppanyaki-hakushu.com/"},
    {name: "Niágara Curry", lat: 35.6375, lon: 139.6917, type: "food_rec", desc: "Train-themed curry restaurant in Yutenji. Closed Mon.", day: "Any", url: "https://www.niagara-curry.com/"},
    
    // Tokyo Shopping
    {name: "Ginza Shopping Area", lat: 35.6712, lon: 139.7651, type: "shopping", desc: "Luxury boutiques and department stores.", day: "Any", url: "https://www.japan-guide.com/e/e3005.html"},
    {name: "Akihabara Shopping", lat: 35.6984, lon: 139.7731, type: "shopping", desc: "Best for electronics and anime merchandise.", day: "Any", url: "https://www.japan-guide.com/e/e3003.html"}
  ],
  'Kyoto': [
    // Original Itinerary
    {name: "Kyoto Station", lat: 34.9858, lon: 135.7588, type: "travel", desc: "Shinkansen Hub", day: "Day 4", url: "https://www.japan-guide.com/e/e2018.html"},
    {name: "Gion District", lat: 35.0037, lon: 135.7785, type: "sight", desc: "Historic Geisha District", day: "Day 4", url: "https://www.japan-guide.com/e/e3902.html"},
    {name: "Fushimi Inari Taisha", lat: 34.9671, lon: 135.7727, type: "sight", desc: "1,000 Red Torii Gates", day: "Day 5", url: "http://inari.jp/en/"},
    {name: "Kiyomizu-dera", lat: 34.9949, lon: 135.7850, type: "sight", desc: "Iconic Wooden Temple", day: "Day 5", url: "https://www.kiyomizudera.or.jp/en/"},
    {name: "Arashiyama Bamboo Grove", lat: 35.0094, lon: 135.6668, type: "sight", desc: "Famous Bamboo Forest", day: "Day 6", url: "https://www.japan-guide.com/e/e3912.html"},
    {name: "Nishiki Market", lat: 35.0050, lon: 135.7649, type: "food", desc: "Kyoto's Kitchen (Street Food)", day: "Day 6", url: "https://www.kyoto-nishiki.or.jp/"},
    {name: "Honke Daiichi-Asahi", lat: 34.9856, lon: 135.7602, type: "food", desc: "Classic Kyoto Soy Ramen", day: "Day 5", url: "https://www.honke-daiichiasahi.com/"},
    {name: "DoubleTree by Hilton Kyoto Station", lat: 34.9825, lon: 135.7621, type: "hotel", desc: "Top Pick Hotel - 15 Higashi Kujo Nishi Iwamotocho, Minami-ku, Kyoto, 601-8005, Japan", day: "Stay", url: "https://www.hilton.com/en/hotels/itmksdi-doubletree-kyoto-station/"},
    {name: "Menbaka Fire Ramen", lat: 35.0211, lon: 135.7460, type: "suggestion", desc: "A literal explosive dining experience! Watch as green onion oil is set ablaze over your bowl. High energy, high heat, and unforgettable.", day: "Anytime", url: "https://www.instagram.com/menbaka_fire_ramen"},

    // NEW RECOMMENDATIONS - KYOTO SIGHTS (Cyan)
    {name: "Kyoto Imperial Palace", lat: 35.0254, lon: 135.7621, type: "sight_rec", desc: "Historic palace grounds, walkable from center.", day: "Any", url: "https://sankan.kunaicho.go.jp/english/index.html"},
    {name: "Higashiyama District", lat: 34.9949, lon: 135.7850, type: "sight_rec", desc: "Historic preserved district, walking and street food.", day: "Any", url: "https://www.japan-guide.com/e/e3959.html"},
    {name: "Ninenzaka & Sannenzaka", lat: 34.9968, lon: 135.7820, type: "sight_rec", desc: "Charming traditional sloping streets.", day: "Any", url: "https://www.japan-guide.com/e/e3959.html"},
    {name: "Yasaka Pagoda (Hokan-ji)", lat: 34.9985, lon: 135.7794, type: "sight_rec", desc: "Iconic 5-story pagoda view.", day: "Any", url: "https://kyoto.travel/en/shrines_temples/160.html"},
    {name: "Yasaka Jinja", lat: 35.0037, lon: 135.7785, type: "sight_rec", desc: "Large complex of temples and gates in Gion.", day: "Any", url: "https://www.yasaka-jinja.or.jp/en/"},
    {name: "Shirakawa Lane", lat: 35.0055, lon: 135.7758, type: "sight_rec", desc: "Beautiful canal street, good for Geisha spotting.", day: "Any", url: "https://www.japan-guide.com/e/e3902.html"},
    {name: "Nijo Castle", lat: 35.0142, lon: 135.7482, type: "sight_rec", desc: "Shogun residence and gardens.", day: "Any", url: "https://nijo-jocastle.city.kyoto.lg.jp/?lang=en"},
    {name: "Kinkaku-ji", lat: 35.0394, lon: 135.7292, type: "sight_rec", desc: "The Golden Pavilion.", day: "Any", url: "https://www.shokoku-ji.jp/en/kinkakuji/"},
    {name: "Philosopher’s Path", lat: 35.0268, lon: 135.7954, type: "sight_rec", desc: "Pleasant canal-side walking path.", day: "Any", url: "https://www.japan-guide.com/e/e3906.html"},
    {name: "Ginkaku-ji", lat: 35.0267, lon: 135.7982, type: "sight_rec", desc: "The Silver Pavilion.", day: "Any", url: "https://www.shokoku-ji.jp/en/ginkakuji/"},

    // NEW RECOMMENDATIONS - KYOTO FOOD (Pink)
    {name: "Hikiniku to Come", lat: 34.9965, lon: 135.7780, type: "food_rec", desc: "Famous charcoal grilled hamburger steaks.", day: "Any", url: "https://www.instagram.com/hikiniku.to.come/"},
    {name: "Restaurante Tomisen", lat: 35.0040, lon: 135.7760, type: "food_rec", desc: "Specialises in Sushi.", day: "Any", url: "https://tabelog.com/en/kyoto/A2601/A260301/26002011/"},
    {name: "Mouriya Gion", lat: 35.0045, lon: 135.7765, type: "food_rec", desc: "Specialises in Kobe Beef.", day: "Any", url: "https://www.mouriya.co.jp/en/gion"},
    {name: "Botanic Coffee Kyoto", lat: 35.0012, lon: 135.7595, type: "food_rec", desc: "Retro café for pancakes and coffee.", day: "Any", url: "https://www.instagram.com/botanic_coffee_kyoto/"},
    {name: "Starbucks Ninenzaka", lat: 34.9982, lon: 135.7825, type: "food_rec", desc: "Inside a traditional house with tatami floors.", day: "Any", url: "https://store.starbucks.co.jp/detail-1484/"},

    // NEW SHOPPING (Gold)
    {name: "Yojiya Main Store", lat: 35.0094, lon: 135.7686, type: "shopping", desc: "Kyoto-based rice cosmetics brand.", day: "Any", url: "https://www.yojiya.co.jp/english/"},
    {name: "Shijo Kawaramachi", lat: 35.0039, lon: 135.7684, type: "shopping", desc: "Kyoto's main shopping district.", day: "Any", url: "https://www.japan-guide.com/e/e3960.html"}
  ],
  'Osaka': [
    // Original Itinerary
    {name: "Osaka Castle", lat: 34.6873, lon: 135.5262, type: "sight", desc: "Historic Landmark", day: "Day 7", url: "https://www.osakacastle.net/english/"},
    {name: "Dotonbori", lat: 34.6687, lon: 135.5013, type: "sight", desc: "Food & Neon District", day: "Day 7", url: "https://osaka-info.jp/en/spot/dotonbori/"},
    {name: "Shinsekai", lat: 34.6520, lon: 135.5063, type: "sight", desc: "Retro Osaka Vibes", day: "Day 7", url: "https://osaka-info.jp/en/spot/shinsekai/"},
    {name: "Doyama-cho", lat: 34.7036, lon: 135.5033, type: "sight", desc: "Gay District", day: "Day 7", url: "https://insideosaka.com/osaka-gay-district/"},
    {name: "Kushikatsu Daruma", lat: 34.6690, lon: 135.5030, type: "food", desc: "Famous Fried Skewers", day: "Day 7", url: "https://www.kushikatsu-daruma.com/"},
    {name: "Fukutaro", lat: 34.6655, lon: 135.5020, type: "food", desc: "Top Rated Okonomiyaki", day: "Day 7", url: "https://2951.jp/"},
    {name: "Ajinoya Honten", lat: 34.6680, lon: 135.5010, type: "food", desc: "Michelin Bib Gourmand Okonomiyaki", day: "Day 7", url: "http://www.ajinoya-okonomiyaki.com/top/"},
    {name: "Hilton Osaka", lat: 34.7003, lon: 135.4955, type: "hotel", desc: "Top Pick Hotel - 1-8-8, Umeda, Kita-ku, Osaka 530-0001, Japan", day: "Stay", url: "https://www.hilton.com/en/hotels/osahitw-hilton-osaka/"},
    
    // NEW RECOMMENDATIONS - OSAKA SIGHTS (Cyan)
    {name: "Den Den Town", lat: 34.6593, lon: 135.5060, type: "sight_rec", desc: "Electronics district (Osaka's Akihabara).", day: "Any", url: "https://osaka-info.jp/en/spot/nipponbashi-den-den-town/"},
    {name: "Nishinomaru Garden", lat: 34.6850, lon: 135.5255, type: "sight_rec", desc: "Osaka Castle grounds with 600 cherry trees.", day: "Any", url: "https://www.osakacastle.net/english/park/nishinomaru.html"},
    {name: "Glico Man Sign", lat: 34.6687, lon: 135.5013, type: "sight_rec", desc: "Iconic photo spot in Dotonbori.", day: "Any", url: "https://osaka-info.jp/en/spot/dotonbori/"},

    // NEW RECOMMENDATIONS - OSAKA FOOD (Pink)
    {name: "Kani Doraku Dotonbori", lat: 34.6687, lon: 135.5013, type: "food_rec", desc: "Famous crab specialist with giant sign.", day: "Any", url: "https://douraku.co.jp/"},
    {name: "GEMS Namba", lat: 34.6644, lon: 135.5008, type: "food_rec", desc: "Dining complex specialising in meat.", day: "Any", url: "https://www.gems-portal.com/series/detail.php?id=8"},
    {name: "Ajinoya", lat: 34.6680, lon: 135.5015, type: "food_rec", desc: "Famous Okonomiyaki (Bib Gourmand).", day: "Any", url: "http://www.ajinoya-okonomiyaki.com/english/"},

    // NEW SHOPPING (Gold)
    {name: "Don Quijote Dotonbori", lat: 34.6693, lon: 135.5028, type: "shopping", desc: "For Skincare/Snack Loot Drops (Ferris Wheel).", day: "Any", url: "https://www.donki.com/en/"},
    {name: "Shinsaibashi Shopping Arcade", lat: 34.6716, lon: 135.5015, type: "shopping", desc: "Premier covered shopping street.", day: "Any", url: "https://osaka-info.jp/en/spot/shinsaibashi-suji/"}
  ],
  'Shanghai': [
    {name: "Pudong Airport (PVG)", lat: 31.1443, lon: 121.8083, type: "travel", desc: "Arrival/Departure", day: "Day 8/11", url: "https://www.shanghaiairport.com/en/"},
    {name: "Maglev Longyang Rd", lat: 31.2090, lon: 121.5580, type: "travel", desc: "High Speed Train Station", day: "Day 8/11", url: "https://www.meet-in-shanghai.net/traffic/maglev"},
    {name: "French Concession", lat: 31.2155, lon: 121.4556, type: "sight", desc: "Historic Walking Area", day: "Day 9", url: "https://www.smartshanghai.com/articles/tourist/the-former-french-concession"},
    {name: "Yu Garden", lat: 31.2272, lon: 121.4921, type: "sight", desc: "Classical Garden", day: "Day 10", url: "https://www.meet-in-shanghai.net/scenic-spots/yu-garden"},
    {name: "The Bund", lat: 31.2402, lon: 121.4905, type: "sight", desc: "Iconic Waterfront Skyline", day: "Day 10", url: "https://www.meet-in-shanghai.net/scenic-spots/the-bund"},
    {name: "Fu 1039", lat: 31.2200, lon: 121.4300, type: "food", desc: "Birthday Dinner (Classic)", day: "Day 9", url: "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/fu-1039"},
    {name: "Fu He Hui", lat: 31.2210, lon: 121.4310, type: "food", desc: "Birthday Dinner (Veg Option)", day: "Day 9", url: "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/fu-he-hui"},
    {name: "Old Jesse", lat: 31.2050, lon: 121.4400, type: "food", desc: "Authentic Local Cuisine", day: "Day 10", url: "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/old-jesse-xuhui"},
    {name: "Jianguo 328", lat: 31.2080, lon: 121.4550, type: "food", desc: "MSG-Free Shanghainese. Cash/Phone Bookings.", day: "Day 10", url: "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/jianguo-328"},
    {name: "Hilton Shanghai City Center", lat: 31.2185, lon: 121.4332, type: "hotel", desc: "Top Pick Hotel - No. 488 West Yan'an Road, Shanghai, 200050, China", day: "Stay", url: "https://www.hilton.com/en/hotels/shamshi-hilton-shanghai-city-center/"}
  ]
};