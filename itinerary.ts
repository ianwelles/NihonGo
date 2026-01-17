import { DayItinerary } from './types';

// --- Date Configuration ---
export const startDate = new Date('2025-02-18');
export const endDate = new Date('2025-02-28');

// --- Itinerary Data ---
export const itineraryData: DayItinerary[] = [
  {
    "dayNumber": 1,
    "city": "Tokyo",
    "theme": "Neon Lights & First Bites",
    "date": "Wed 18 Feb",
    "hotelIds": ["hilton-tokyo"],
    "activities": [
      {
        "placeId": "haneda-airport",
        "time": "10:25",
        "label": "Arrival",
        "icon": "🛬"
      },
      {
        "placeId": "shinjuku-gyoen",
        "time": "Day",
        "label": "Shinjuku & Garden",
        "description": "Transfer to Shinjuku (Hotel Shuttle). Lunch at Sobahouse Konjiki Hototogisu. Walk through Shinjuku Gyoen National Garden.",
        "tip": "Konjiki Hototogisu holds a Michelin Star for their clam-broth ramen. Arrive early for a ticket!",
        "icon": "🌳"
      },
      {
        "placeId": "torikizoku",
        "time": "Evening",
        "label": "Dinner",
        "description": "Dinner at Torikizoku (Yakitori) or the atmospheric Omoide Yokocho.",
        "tip": "Torikizoku is a reliable chain where every item is the same price—great for a low-stress first meal.",
        "icon": "🍢"
      }
    ]
  },
  {
    "dayNumber": 2,
    "city": "Tokyo",
    "theme": "Temples, Tuna & Two-Chōme",
    "date": "Thu 19 Feb",
    "hotelIds": ["hilton-tokyo"],
    "activities": [
      {
        "placeId": "senso-ji",
        "time": "Morning",
        "label": "Senso-ji Temple",
        "tip": "Try the Ningyo-yaki (doll-shaped sponge cakes) on Nakamise street.",
        "icon": "⛩️"
      },
      {
        "placeId": "imperial-palace-east",
        "time": "Day",
        "label": "Imperial Palace & Tsukiji",
        "description": "Walk the Imperial Palace East Gardens. Lunch at Tsukiji Outer Market.",
        "tip": "At Tsukiji, look for the queues at Sushizanmai for reliable quality.",
        "icon": "🏯"
      },
      {
        "placeId": "shinjuku-nichome",
        "time": "Evening",
        "label": "Shinjuku Ni-chōme",
        "description": "Dinner at Ramen Nagi (Golden Gai). Then explore Shinjuku Ni-chōme.",
        "tip": "Ramen Nagi is legendary for its intense Niboshi (sardine) broth.",
        "icon": "🍸"
      }
    ]
  },
  {
    "dayNumber": 3,
    "city": "Tokyo",
    "theme": "Scrambles, Skylines & Sushi",
    "date": "Fri 20 Feb",
    "hotelIds": ["hilton-tokyo"],
    "activities": [
      {
        "placeId": "shibuya-crossing",
        "time": "Morning",
        "label": "Shibuya Crossing",
        "icon": "📸"
      },
      {
        "placeId": "tokyo-metro-gov",
        "time": "Day",
        "label": "Tokyo Metro Gov. Building",
        "description": "Views from Tokyo Metro Gov. Building. Walk Takeshita Street (Harajuku).",
        "tip": "The South Observatory is often less crowded than the North one.",
        "icon": "🏙️"
      },
      {
        "placeId": "sushi-kunimitsu",
        "time": "Lunch",
        "label": "Sushi",
        "description": "Authentic sushi at Sushi Kunimitsu or Osushiya Taiki.",
        "tip": "Kunimitsu is highly rated (4.7★) for its Omakase course. Booking essential.",
        "icon": "🍣"
      },
      {
        "placeId": "fuunji",
        "time": "Dinner",
        "label": "Fuunji",
        "description": "Fuunji (Shinjuku).",
        "tip": "Known for the best Tsukemen (dipping noodles) in Tokyo. Expect a line, but it moves fast!",
        "icon": "🍜"
      }
    ]
  },
  {
    "dayNumber": 4,
    "city": "Tokyo",
    "theme": "The Shinkansen Sprint",
    "date": "Sat 21 Feb",
    "hotelIds": ["hilton-tokyo"],
    "activities": [
      {
        "placeId": "shinjuku-station",
        "time": "Morning",
        "label": "Travel to Kyoto",
        "description": "Checkout. Train to Tokyo Station. Shinkansen to Kyoto (2.5 hrs).",
        "tip": "Buy a Bento at Tokyo Station.",
        "icon": "🚅"
      }
    ]
  },
  {
    "dayNumber": 4,
    "city": "Kyoto",
    "theme": "Geisha Streets & Kaiseki Eats",
    "date": "Sat 21 Feb",
    "hotelIds": ["doubletree-kyoto"],
    "activities": [
      {
        "placeId": "kyoto-station",
        "time": "Morning",
        "label": "Arrival",
        "description": "Arrive at Kyoto Station. Drop bags at DoubleTree.",
        "tip": "Hotel is located directly across from the Station (Hachijo Exit).",
        "icon": "📍"
      },
      {
        "placeId": "gion-district",
        "time": "Afternoon",
        "label": "Gion District",
        "description": "Explore Gion District and Pontocho Alley.",
        "tip": "Walk from Shijo-dori across the river to Pontocho.",
        "icon": "🍵"
      },
      {
        "placeId": "gion-district",
        "time": "Dinner",
        "label": "Kyo-Kaiseki meal",
        "description": "Traditional Kyo-Kaiseki meal in Gion.",
        "tip": "If not booked, wander down Pontocho Alley for atmospheric river-side dining.",
        "icon": "🍱"
      }
    ]
  },
  {
    "dayNumber": 5,
    "city": "Kyoto",
    "theme": "Torii Gates & Deer Dates",
    "date": "Sun 22 Feb",
    "hotelIds": ["doubletree-kyoto"],
    "activities": [
      {
        "placeId": "fushimi-inari",
        "time": "Morning",
        "label": "Fushimi Inari Taisha",
        "description": "Visit Fushimi Inari early. Then take JR Nara Line to Nara.",
        "tip": "Arriving by 8:00 AM avoids the massive crowds.",
        "icon": "⛩️"
      },
      {
        "placeId": "nara-park",
        "time": "Day",
        "label": "Nara Deer Park",
        "description": "Feed the deer at Nara Park and visit Todai-ji Temple. Return to Kyoto.",
        "tip": "Don't carry open food—the deer can be aggressive!",
        "icon": "🦌"
      },
      {
        "placeId": "honke-daiichi",
        "time": "Dinner",
        "label": "Honke Daiichi-Asahi",
        "description": "Dinner at Honke Daiichi-Asahi near Kyoto Station.",
        "tip": "A Kyoto institution serving classic soy-based ramen.",
        "icon": "🍜"
      }
    ]
  },
  {
    "dayNumber": 6,
    "city": "Kyoto",
    "theme": "Bamboo Groves & Market Troves",
    "date": "Mon 23 Feb",
    "hotelIds": ["doubletree-kyoto"],
    "activities": [
      {
        "placeId": "arashiyama",
        "time": "Morning",
        "label": "Arashiyama Bamboo",
        "description": "Train to Arashiyama (Bamboo Grove). Visit Tenryu-ji Temple.",
        "tip": "Go as early as possible for the best photos.",
        "icon": "🎋"
      },
      {
        "placeId": "nishiki-market",
        "time": "Lunch",
        "label": "Nishiki Market",
        "description": "Return to central Kyoto for lunch at Nishiki Market.",
        "tip": "Try the Tako Tamago (red baby octopus with a quail egg inside).",
        "icon": "🐙"
      },
      {
        "placeId": "kiyomizu-dera",
        "time": "Afternoon",
        "label": "Kiyomizu-dera",
        "description": "Visit Kiyomizu-dera Temple. Walk down Sannenzaka.",
        "tip": "Great spot for sunset views over the city.",
        "icon": "🍂"
      }
    ]
  },
  {
    "dayNumber": 7,
    "city": "Kyoto",
    "theme": "Bound for the Kitchen",
    "date": "Tue 24 Feb",
    "hotelIds": ["doubletree-kyoto"],
    "activities": [
      {
        "placeId": "kyoto-station",
        "time": "Morning",
        "label": "Travel to Osaka",
        "description": "Checkout. Special Rapid Service to Osaka Station (30 mins).",
        "tip": "Stand on the platform early to secure a seat.",
        "icon": "🚆"
      }
    ]
  },
  {
    "dayNumber": 7,
    "city": "Osaka",
    "theme": "Castles, Crabs & Doyama Nights",
    "date": "Tue 24 Feb",
    "hotelIds": ["hilton-osaka"],
    "activities": [
      {
        "placeId": "osaka-station",
        "time": "Morning",
        "label": "Arrival",
        "description": "Arrive at Osaka Station. Drop bags at Hilton Osaka.",
        "tip": "Hotel is directly across from the Central South Exit.",
        "icon": "📍"
      },
      {
        "placeId": "osaka-castle",
        "time": "Morning",
        "label": "Osaka Castle",
        "description": "Visit Osaka Castle.",
        "tip": "Hotel is at Umeda; Castle is a short loop line ride away.",
        "icon": "🏯"
      },
      {
        "placeId": "kushikatsu-daruma",
        "time": "Day",
        "label": "Dotonbori & Shinsekai",
        "description": "Lunch at Kushikatsu Daruma. Eat through Dotonbori and retro Shinsekai.",
        "tip": "Famous for \"no double dipping\" fried skewers.",
        "icon": "🦀"
      },
      {
        "placeId": "doyama-cho",
        "time": "Evening",
        "label": "Dōyama-chō",
        "description": "Visit Dōyama-chō (Gay District) - walking distance from Hilton.",
        "tip": "Umeda is the main gay area in Osaka.",
        "icon": "🏳️‍🌈"
      },
      {
        "placeId": "fukutaro",
        "time": "Dinner",
        "label": "Okonomiyaki",
        "description": "Okonomiyaki at Fukutaro or Ajinoya Honten.",
        "tip": "Order the Negiyaki (green onion pancake) at Fukutaro.",
        "icon": "🥞"
      }
    ]
  },
  {
    "dayNumber": 8,
    "city": "Osaka",
    "theme": "Wings to China",
    "date": "Wed 25 Feb",
    "hotelIds": ["hilton-osaka"],
    "activities": [
      {
        "placeId": "kansai-airport",
        "time": "Morning",
        "label": "Travel to KIX & Fly",
        "description": "Train/Bus to Kansai Airport. Flight to Shanghai (PVG).",
        "tip": "Allow 60-75 mins for transit to KIX.",
        "icon": "🛫"
      }
    ]
  },
  {
    "dayNumber": 8,
    "city": "Shanghai",
    "theme": "Maglev Speed & Metropolis",
    "date": "Wed 25 Feb",
    "hotelIds": ["hilton-shanghai"],
    "activities": [
      {
        "placeId": "maglev-station",
        "time": "Afternoon",
        "label": "Arrival & Maglev",
        "description": "Land at PVG. Maglev to Longyang Rd; Metro to Hotel.",
        "tip": "Maglev top speed (430km/h) usually 9:00-10:45 & 15:00-15:45.",
        "icon": "🚄"
      }
    ]
  },
  {
    "dayNumber": 9,
    "city": "Shanghai",
    "theme": "Beto's Birthday Bash 🎂",
    "date": "Thu 26 Feb",
    "hotelIds": ["hilton-shanghai"],
    "activities": [
      {
        "placeId": "french-concession",
        "time": "Day",
        "label": "French Concession",
        "description": "Walk the French Concession. Shopping and cafe hopping.",
        "tip": "Hotel is located near the French Concession border.",
        "icon": "🌳"
      },
      {
        "placeId": "fu-1039",
        "time": "Dinner",
        "label": "Fu 1039 or Fu He Hui",
        "description": "Fu 1039 (Classic) or Fu He Hui (Veg).",
        "tip": "Fu 1039 (1 Michelin Star) for Smoked Fish. Fu He Hui (2 Michelin Stars) for world-class vegetarian.",
        "icon": "🥢"
      },
      {
        "placeId": "asia-blue",
        "time": "Drinks",
        "label": "HUNT or Asia Blue",
        "description": "Drinks at HUNT (Bear friendly) or Asia Blue (Relaxed).",
        "tip": "HUNT is busy and energetic; Asia Blue is quieter for conversation.",
        "icon": "🍸"
      }
    ]
  },
  {
    "dayNumber": 10,
    "city": "Shanghai",
    "theme": "Gardens, Giants & The Bund",
    "date": "Fri 27 Feb",
    "hotelIds": ["hilton-shanghai"],
    "activities": [
      {
        "placeId": "yu-garden",
        "time": "Morning",
        "label": "Yu Garden & Bazaar",
        "icon": "🏮"
      },
      {
        "placeId": "jianguo-328",
        "time": "Lunch",
        "label": "Jianguo 328",
        "tip": "Bib Gourmand favorite for MSG-free home-style cooking.",
        "icon": "🥟"
      },
      {
        "placeId": "shanghai-tower",
        "time": "Afternoon",
        "label": "Shanghai Tower",
        "description": "Visit the observation deck of China's tallest building.",
        "tip": "Book tickets in advance to skip the queue.",
        "icon": "🏙️"
      },
      {
        "placeId": "the-bund",
        "time": "Evening",
        "label": "The Bund",
        "description": "Walk The Bund.",
        "tip": "Best views are just after sunset when the lights turn on.",
        "icon": "🌃"
      },
      {
        "placeId": "old-jesse",
        "time": "Dinner",
        "label": "Old Jesse",
        "description": "Old Jesse.",
        "tip": "Pre-order the Hong Shao Rou and Scallion Roasted Fish Head when booking!",
        "icon": "🍽️"
      }
    ]
  },
  {
    "dayNumber": 11,
    "city": "Shanghai",
    "theme": "Dumplings & Departure",
    "date": "Sat 28 Feb",
    "hotelIds": ["hilton-shanghai"],
    "activities": [
      {
        "placeId": "maglev-station",
        "time": "Morning",
        "label": "MAGLEV to PVG",
        "description": "Ride MAGLEV to PVG. Access First Class Lounge.",
        "icon": "🚄"
      },
      {
        "placeId": "yangs-dumplings",
        "time": "Snack",
        "label": "Yang's Dumplings",
        "description": "Yang's Dumplings inside airport.",
        "tip": "Bite a small hole in the Sheng Jian Bao first to vent the steam!",
        "icon": "🥟"
      },
      {
        "placeId": "pudong-airport",
        "time": "10:55",
        "label": "Return Flight",
        "description": "British Airways BA0168 to London (LHR).",
        "tip": "Departs Terminal 2.",
        "icon": "🛫"
      }
    ]
  }
];
