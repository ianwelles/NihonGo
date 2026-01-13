import { Place } from './types';

export const places: Record<string, Place> = {
  "hilton-tokyo": {
    "id": "hilton-tokyo",
    "name": "Hilton Tokyo",
    "type": "hotel",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6925,
      "lon": 139.6921
    },
    "description": "Top Pick Hotel - 6-6-2 Nishi-Shinjuku.",
    "url": "https://www.hilton.com/en/hotels/tyohitw-hilton-tokyo/",
    "tags": [
      "City Views",
      "Executive Lounge"
    ],
    "hotelMeta": {
      "address": "6-6-2 Nishi-Shinjuku, Shinjuku-ku, Tokyo 160-0023, Japan",
      "directions": "https://www.google.com/maps/dir/?api=1&destination=35.6925,139.6921",
      "neighborhoodInsights": "Nishi-Shinjuku is Tokyo's premier skyscraper district. It offers a sophisticated, professional atmosphere a short walk from the neon-lit 'Golden Gai'.",
      "tags": [
        "City Views",
        "Executive Lounge"
      ]
    }
  },
  "haneda-airport": {
    "id": "haneda-airport",
    "name": "Haneda Airport",
    "type": "travel",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.5494,
      "lon": 139.7798
    },
    "description": "Arrival Airport (10:25 AM)",
    "url": "https://tokyo-haneda.com/en/",
    "tags": [
      "Gateway Hub",
      "Efficient"
    ]
  },
  "shinjuku-station": {
    "id": "shinjuku-station",
    "name": "Shinjuku Station",
    "type": "travel",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6896,
      "lon": 139.7006
    },
    "description": "Main Transport Hub",
    "url": "https://www.gotokyo.org/en/destinations/western-tokyo/shinjuku/index.html",
    "tags": [
      "Bustling Hub",
      "Connected"
    ]
  },
  "shinjuku-gyoen": {
    "id": "shinjuku-gyoen",
    "name": "Shinjuku Gyoen",
    "type": "sight",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6852,
      "lon": 139.7101
    },
    "description": "Serene garden with greenhouse",
    "url": "https://www.env.go.jp/garden/shinjukugyoen/english/index.html",
    "tags": [
      "Urban Oasis",
      "Greenhouse"
    ]
  },
  "senso-ji": {
    "id": "senso-ji",
    "name": "Senso-ji",
    "type": "sight",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.7148,
      "lon": 139.7967
    },
    "description": "Tokyo's oldest temple (Asakusa)",
    "url": "https://www.senso-ji.jp/english/",
    "tags": [
      "Historic Temple",
      "Asakusa Vibe"
    ]
  },
  "imperial-palace-east": {
    "id": "imperial-palace-east",
    "name": "Imperial Palace East Gardens",
    "type": "sight",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6852,
      "lon": 139.7528
    },
    "description": "Historic castle grounds",
    "url": "https://www.kunaicho.go.jp/e-event/higashigyoen02.html",
    "tags": [
      "Castle Ruins",
      "Serene Walk"
    ]
  },
  "shinjuku-nichome": {
    "id": "shinjuku-nichome",
    "name": "Shinjuku Ni-chome",
    "type": "sight",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6905,
      "lon": 139.7066
    },
    "description": "Tokyo's Gay District",
    "url": "https://www.timeout.com/tokyo/lgbtq/shinjuku-nichome-guide",
    "tags": [
      "Gay District",
      "Micro-Bars"
    ]
  },
  "shibuya-crossing": {
    "id": "shibuya-crossing",
    "name": "Shibuya Crossing",
    "type": "sight",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6595,
      "lon": 139.7004
    },
    "description": "Iconic Scramble Crossing",
    "url": "https://www.japan-guide.com/e/e3007.html",
    "tags": [
      "Iconic Scramble",
      "Chaotic Energy"
    ]
  },
  "tokyo-metro-gov": {
    "id": "tokyo-metro-gov",
    "name": "Tokyo Metro Gov Building",
    "type": "sight",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6896,
      "lon": 139.6921
    },
    "description": "Free Panoramic Views",
    "url": "https://www.yokoso.metro.tokyo.lg.jp/en/tenbou/",
    "tags": [
      "Free Views",
      "Panoramic"
    ]
  },
  "torikizoku": {
    "id": "torikizoku",
    "name": "Torikizoku",
    "type": "food",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6938,
      "lon": 139.7016
    },
    "description": "Casual Yakitori (All items same price)",
    "url": "https://www.torikizoku.co.jp/en/",
    "tags": [
      "Cheap Yakitori",
      "Izakaya Chain"
    ]
  },
  "omoide-yokocho": {
    "id": "omoide-yokocho",
    "name": "Omoide Yokocho",
    "type": "food_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6929,
      "lon": 139.6995
    },
    "description": "Atmospheric Memory Lane (Yakitori)",
    "url": "http://shinjuku-omoide.com/english/",
    "tags": [
      "Nostalgic Alley",
      "Yakitori"
    ]
  },
  "tsukiji-market": {
    "id": "tsukiji-market",
    "name": "Tsukiji Outer Market",
    "type": "food_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6655,
      "lon": 139.7704
    },
    "description": "Fresh Seafood Breakfast/Lunch",
    "url": "https://www.tsukiji.or.jp/english/",
    "tags": [
      "Fresh Seafood",
      "Street Food"
    ]
  },
  "konjiki-hototogisu": {
    "id": "konjiki-hototogisu",
    "name": "Konjiki Hototogisu",
    "type": "food_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6897,
      "lon": 139.7047
    },
    "description": "Michelin Star Ramen (Clam Broth)",
    "url": "https://konjikihototogisu.com/",
    "tags": [
      "Michelin Ramen",
      "Clam Broth"
    ]
  },
  "ramen-nagi": {
    "id": "ramen-nagi",
    "name": "Ramen Nagi (Golden Gai)",
    "type": "food_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6943,
      "lon": 139.7046
    },
    "description": "Famous Niboshi (Sardine) Ramen",
    "url": "http://www.n-nagi.com/english/",
    "tags": [
      "Niboshi Ramen",
      "Golden Gai"
    ]
  },
  "fuunji": {
    "id": "fuunji",
    "name": "Fuunji",
    "type": "food",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6872,
      "lon": 139.6967
    },
    "description": "Legendary Tsukemen (Dipping Noodles)",
    "url": "https://www.fu-unji.com/",
    "tags": [
      "Dipping Noodles",
      "Tsukemen"
    ]
  },
  "ichiran-shinjuku": {
    "id": "ichiran-shinjuku",
    "name": "Ichiran Shinjuku",
    "type": "suggestion",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6909,
      "lon": 139.7032
    },
    "description": "The ultimate solo dining experience. Customize your Tonkotsu ramen.",
    "url": "https://www.instagram.com/ichiran_jp",
    "tags": [
      "Tonkotsu Ramen",
      "Solo Booths"
    ]
  },
  "sushi-kunimitsu": {
    "id": "sushi-kunimitsu",
    "name": "Sushi Kunimitsu",
    "type": "food",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6896,
      "lon": 139.6921
    },
    "description": "Authentic Omakese Sushi.",
    "url": "https://japan-food.guide/en/restaurants/962",
    "tags": [
      "Omakase",
      "Intimate"
    ]
  },
  "ginza-district": {
    "id": "ginza-district",
    "name": "Ginza District",
    "type": "sight_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6712,
      "lon": 139.7665
    },
    "description": "Symbol of luxury and modernity.",
    "url": "https://www.japan-guide.com/e/e3005.html",
    "tags": [
      "Luxury Shopping",
      "Upscale Dining"
    ]
  },
  "tokyo-tower": {
    "id": "tokyo-tower",
    "name": "Tokyo Tower",
    "type": "sight_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6586,
      "lon": 139.7454
    },
    "description": "Iconic red tower with city views.",
    "url": "https://www.tokyotower.co.jp/en/",
    "tags": [
      "Iconic Landmark",
      "Red Tower"
    ]
  },
  "zojo-ji": {
    "id": "zojo-ji",
    "name": "Zojo-ji Temple",
    "type": "sight_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6574,
      "lon": 139.7482
    },
    "description": "Where modernity meets tradition.",
    "url": "https://www.zojoji.or.jp/en/",
    "tags": [
      "Historic Temple",
      "Tower Views"
    ]
  },
  "meiji-shrine": {
    "id": "meiji-shrine",
    "name": "Meiji Shrine",
    "type": "sight_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6764,
      "lon": 139.6993
    },
    "description": "Serene Shinto shrine in a dense forest.",
    "url": "https://www.meijijingu.or.jp/en/",
    "tags": [
      "Shinto Shrine",
      "Forested"
    ]
  },
  "kabukicho": {
    "id": "kabukicho",
    "name": "Kabukicho",
    "type": "sight_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6938,
      "lon": 139.7035
    },
    "description": "The famous 'red light' and nightlife district.",
    "url": "https://www.gotokyo.org/en/destinations/western-tokyo/shinjuku/index.html",
    "tags": [
      "Red Light District",
      "Neon Lights"
    ]
  },
  "omotesando": {
    "id": "omotesando",
    "name": "Omotesando",
    "type": "sight_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6652,
      "lon": 139.7125
    },
    "description": "Tree-lined fashion and architecture avenue.",
    "url": "https://www.japan-guide.com/e/e3006.html",
    "tags": [
      "Architecture",
      "Luxury Fashion"
    ]
  },
  "takeshita-street": {
    "id": "takeshita-street",
    "name": "Takeshita Street",
    "type": "sight_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6715,
      "lon": 139.7031
    },
    "description": "Harajuku youth culture and urban tribes.",
    "url": "https://www.japan-guide.com/e/e3006.html",
    "tags": [
      "Harajuku Fashion",
      "Crepes"
    ]
  },
  "hachiko-statue": {
    "id": "hachiko-statue",
    "name": "Hachiko Statue",
    "type": "sight_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6591,
      "lon": 139.7006
    },
    "description": "Legendary loyal dog statue in Shibuya.",
    "url": "https://www.japan-guide.com/e/e3007.html",
    "tags": [
      "Loyal Dog",
      "Meeting Spot"
    ]
  },
  "akihabara-electric": {
    "id": "akihabara-electric",
    "name": "Akihabara Electric Town",
    "type": "sight_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6997,
      "lon": 139.7713
    },
    "description": "Neons, anime, manga, and video games.",
    "url": "https://www.japan-guide.com/e/e3003.html",
    "tags": [
      "Anime Culture",
      "Electronics"
    ]
  },
  "hamarikyu": {
    "id": "hamarikyu",
    "name": "Hamarikyu Gardens",
    "type": "sight_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6601,
      "lon": 139.763
    },
    "description": "Quiet garden right next to Tsukiji Outer Market.",
    "url": "https://www.tokyo-park.or.jp/teien/en/hama-rikyu/",
    "tags": [
      "Seaside Garden",
      "Teahouse"
    ]
  },
  "yamato-sushi": {
    "id": "yamato-sushi",
    "name": "Yamato Sushi",
    "type": "food_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6465,
      "lon": 139.7879
    },
    "description": "Fresh sushi (Toyosu Market location).",
    "url": "https://www.sushiyamato-toyosu.com/",
    "tags": [
      "Tsukiji Fresh",
      "Sushi Breakfast"
    ]
  },
  "hakushu-teppanyaki": {
    "id": "hakushu-teppanyaki",
    "name": "Hakushu Teppanyaki",
    "type": "food_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6558,
      "lon": 139.7015
    },
    "description": "High-end Teppanyaki for authentic Kobe beef in Shibuya.",
    "url": "https://teppanyaki-hakushu.com/",
    "tags": [
      "Kobe Beef",
      "Teppanyaki"
    ]
  },
  "niagara-curry": {
    "id": "niagara-curry",
    "name": "Niágara Curry",
    "type": "food_rec",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6375,
      "lon": 139.6917
    },
    "description": "Train-themed curry restaurant in Yutenji.",
    "url": "https://www.niagara-curry.com/",
    "tags": [
      "Train Theme",
      "Curry Rice"
    ]
  },
  "ginza-shopping": {
    "id": "ginza-shopping",
    "name": "Ginza Shopping Area",
    "type": "shopping",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6712,
      "lon": 139.7651
    },
    "description": "Luxury boutiques and department stores.",
    "url": "https://www.japan-guide.com/e/e3005.html",
    "tags": [
      "High-End Retail",
      "Pedestrian Paradise"
    ]
  },
  "akihabara-shopping": {
    "id": "akihabara-shopping",
    "name": "Akihabara Shopping",
    "type": "shopping",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6984,
      "lon": 139.7731
    },
    "description": "Best for electronics and anime merchandise.",
    "url": "https://www.japan-guide.com/e/e3003.html",
    "tags": [
      "Otaku Goods",
      "Gadgets"
    ]
  },
  "doubletree-kyoto": {
    "id": "doubletree-kyoto",
    "name": "DoubleTree by Hilton Kyoto Station",
    "type": "hotel",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.9825,
      "lon": 135.7621
    },
    "description": "Top Pick Hotel - 15 Higashi Kujo Nishi Iwamotocho.",
    "url": "https://www.hilton.com/en/hotels/itmksdi-doubletree-kyoto-station/",
    "tags": [
      "Station Access",
      "Modern Comfort"
    ],
    "hotelMeta": {
      "address": "15 Higashi Kujo Nishi Iwamotocho, Minami-ku, Kyoto, 601-8005, Japan",
      "directions": "https://www.google.com/maps/dir/?api=1&destination=34.9825,135.7621",
      "neighborhoodInsights": "The south side of Kyoto Station is a modern gateway to the city. It offers the quickest rail access to Fushimi Inari and Nara.",
      "tags": [
        "Station Access",
        "Modern Comfort"
      ]
    }
  },
  "kyoto-station": {
    "id": "kyoto-station",
    "name": "Kyoto Station",
    "type": "travel",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.9858,
      "lon": 135.7588
    },
    "description": "Shinkansen Hub",
    "url": "https://www.japan-guide.com/e/e2018.html",
    "tags": [
      "Modern Architecture",
      "Transport Hub"
    ]
  },
  "gion-district": {
    "id": "gion-district",
    "name": "Gion District",
    "type": "sight",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0037,
      "lon": 135.7785
    },
    "description": "Historic Geisha District",
    "url": "https://www.japan-guide.com/e/e3902.html",
    "tags": [
      "Geisha District",
      "Traditional"
    ]
  },
  "fushimi-inari": {
    "id": "fushimi-inari",
    "name": "Fushimi Inari Taisha",
    "type": "sight",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.9671,
      "lon": 135.7727
    },
    "description": "1,000 Red Torii Gates",
    "url": "http://inari.jp/en/",
    "tags": [
      "Torii Gates",
      "Mountain Hike"
    ]
  },
  "kiyomizu-dera": {
    "id": "kiyomizu-dera",
    "name": "Kiyomizu-dera",
    "type": "sight",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.9949,
      "lon": 135.785
    },
    "description": "Iconic Wooden Temple",
    "url": "https://www.kiyomizudera.or.jp/en/",
    "tags": [
      "Wooden Stage",
      "Hillside Views"
    ]
  },
  "arashiyama": {
    "id": "arashiyama",
    "name": "Arashiyama Bamboo Grove",
    "type": "sight",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0094,
      "lon": 135.6668
    },
    "description": "Famous Bamboo Forest",
    "url": "https://www.japan-guide.com/e/e3912.html",
    "tags": [
      "Bamboo Forest",
      "Photo Spot"
    ]
  },
  "nishiki-market": {
    "id": "nishiki-market",
    "name": "Nishiki Market",
    "type": "food",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.005,
      "lon": 135.7649
    },
    "description": "Kyoto's Kitchen (Street Food)",
    "url": "https://www.kyoto-nishiki.or.jp/",
    "tags": [
      "Kitchen of Kyoto",
      "Food Stalls"
    ]
  },
  "honke-daiichi": {
    "id": "honke-daiichi",
    "name": "Honke Daiichi-Asahi",
    "type": "food",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.9856,
      "lon": 135.7602
    },
    "description": "Classic Kyoto Soy Ramen",
    "url": "https://www.honke-daiichiasahi.com/",
    "tags": [
      "Kyoto Ramen",
      "Soy Broth"
    ]
  },
  "menbaka-fire": {
    "id": "menbaka-fire",
    "name": "Menbaka Fire Ramen",
    "type": "suggestion",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0211,
      "lon": 135.746
    },
    "description": "A literal explosive dining experience!",
    "url": "https://www.instagram.com/menbaka_fire_ramen",
    "tags": [
      "Fire Performance",
      "Negi Ramen"
    ]
  },
  "kyoto-imperial": {
    "id": "kyoto-imperial",
    "name": "Kyoto Imperial Palace",
    "type": "sight_rec",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0254,
      "lon": 135.7621
    },
    "description": "Historic palace grounds.",
    "url": "https://sankan.kunaicho.go.jp/english/index.html",
    "tags": [
      "Imperial History",
      "Spacious Park"
    ]
  },
  "higashiyama": {
    "id": "higashiyama",
    "name": "Higashiyama District",
    "type": "sight_rec",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.9949,
      "lon": 135.785
    },
    "description": "Historic preserved district.",
    "url": "https://www.japan-guide.com/e/e3959.html",
    "tags": [
      "Preserved Streets",
      "Old Kyoto"
    ]
  },
  "ninenzaka": {
    "id": "ninenzaka",
    "name": "Ninenzaka & Sannenzaka",
    "type": "sight_rec",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.9968,
      "lon": 135.782
    },
    "description": "Charming traditional sloping streets.",
    "url": "https://www.japan-guide.com/e/e3959.html",
    "tags": [
      "Traditional Slopes",
      "Souvenirs"
    ]
  },
  "yasaka-pagoda": {
    "id": "yasaka-pagoda",
    "name": "Yasaka Pagoda (Hokan-ji)",
    "type": "sight_rec",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.9985,
      "lon": 135.7794
    },
    "description": "Iconic 5-story pagoda view.",
    "url": "https://kyoto.travel/en/shrines_temples/160.html",
    "tags": [
      "Iconic Pagoda",
      "Photo Spot"
    ]
  },
  "yasaka-jinja": {
    "id": "yasaka-jinja",
    "name": "Yasaka Jinja",
    "type": "sight_rec",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0037,
      "lon": 135.7785
    },
    "description": "Large complex of temples and gates in Gion.",
    "url": "https://www.yasaka-jinja.or.jp/en/",
    "tags": [
      "Gion Shrine",
      "Lanterns"
    ]
  },
  "shirakawa-lane": {
    "id": "shirakawa-lane",
    "name": "Shirakawa Lane",
    "type": "sight_rec",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0055,
      "lon": 135.7758
    },
    "description": "Beautiful canal street, good for Geisha spotting.",
    "url": "https://www.japan-guide.com/e/e3902.html",
    "tags": [
      "Scenic Canal",
      "Willow Trees"
    ]
  },
  "nijo-castle": {
    "id": "nijo-castle",
    "name": "Nijo Castle",
    "type": "sight_rec",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0142,
      "lon": 135.7482
    },
    "description": "Shogun residence and gardens.",
    "url": "https://nijo-jocastle.city.kyoto.lg.jp/?lang=en",
    "tags": [
      "Shogun Palace",
      "Nightingale Floors"
    ]
  },
  "kinkaku-ji": {
    "id": "kinkaku-ji",
    "name": "Kinkaku-ji",
    "type": "sight_rec",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0394,
      "lon": 135.7292
    },
    "description": "The Golden Pavilion.",
    "url": "https://www.shokoku-ji.jp/en/kinkakuji/",
    "tags": [
      "Golden Pavilion",
      "Zen Garden"
    ]
  },
  "philosophers-path": {
    "id": "philosophers-path",
    "name": "Philosopher’s Path",
    "type": "sight_rec",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0268,
      "lon": 135.7954
    },
    "description": "Pleasant canal-side walking path.",
    "url": "https://www.japan-guide.com/e/e3906.html",
    "tags": [
      "Canal Walk",
      "Cherry Blossoms"
    ]
  },
  "ginkaku-ji": {
    "id": "ginkaku-ji",
    "name": "Ginkaku-ji",
    "type": "sight_rec",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0267,
      "lon": 135.7982
    },
    "description": "The Silver Pavilion.",
    "url": "https://www.shokoku-ji.jp/en/ginkakuji/",
    "tags": [
      "Silver Pavilion",
      "Sand Garden"
    ]
  },
  "hikiniku-to-come": {
    "id": "hikiniku-to-come",
    "name": "Hikiniku to Come",
    "type": "food_rec",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.9965,
      "lon": 135.778
    },
    "description": "Famous charcoal grilled hamburger steaks.",
    "url": "https://www.instagram.com/hikiniku.to.come/",
    "tags": [
      "Hamburger Steak",
      "Charcoal Grilled"
    ]
  },
  "restaurante-tomisen": {
    "id": "restaurante-tomisen",
    "name": "Restaurante Tomisen",
    "type": "food_rec",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.004,
      "lon": 135.776
    },
    "description": "Specialises in Sushi.",
    "url": "https://tabelog.com/en/kyoto/A2601/A260301/26002011/",
    "tags": [
      "Family Sushi",
      "Tatami"
    ]
  },
  "mouriya-gion": {
    "id": "mouriya-gion",
    "name": "Mouriya Gion",
    "type": "food_rec",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0045,
      "lon": 135.7765
    },
    "description": "Specialises in Kobe Beef.",
    "url": "https://www.mouriya.co.jp/en/gion",
    "tags": [
      "Kobe Beef",
      "Teppanyaki"
    ]
  },
  "botanic-coffee": {
    "id": "botanic-coffee",
    "name": "Botanic Coffee Kyoto",
    "type": "food_rec",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0012,
      "lon": 135.7595
    },
    "description": "Retro café for pancakes and coffee.",
    "url": "https://www.instagram.com/botanic_coffee_kyoto/",
    "tags": [
      "Vintage Cafe",
      "Fluffy Pancakes"
    ]
  },
  "starbucks-ninenzaka": {
    "id": "starbucks-ninenzaka",
    "name": "Starbucks Ninenzaka",
    "type": "food_rec",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.9982,
      "lon": 135.7825
    },
    "description": "Inside a traditional house with tatami floors.",
    "url": "https://store.starbucks.co.jp/detail-1484/",
    "tags": [
      "Tatami Seating",
      "Machiya Style"
    ]
  },
  "yojiya-main": {
    "id": "yojiya-main",
    "name": "Yojiya Main Store",
    "type": "shopping",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0094,
      "lon": 135.7686
    },
    "description": "Kyoto-based rice cosmetics brand.",
    "url": "https://www.yojiya.co.jp/english/",
    "tags": [
      "Cosmetics",
      "Cafe"
    ]
  },
  "shijo-kawaramachi": {
    "id": "shijo-kawaramachi",
    "name": "Shijo Kawaramachi",
    "type": "shopping",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0039,
      "lon": 135.7684
    },
    "description": "Kyoto's main shopping district.",
    "url": "https://www.japan-guide.com/e/e3960.html",
    "tags": [
      "Shopping District",
      "Department Stores"
    ]
  },
  "hilton-osaka": {
    "id": "hilton-osaka",
    "name": "Hilton Osaka",
    "type": "hotel",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.7003,
      "lon": 135.4955
    },
    "description": "Top Pick Hotel - Umeda, Kita-ku.",
    "url": "https://www.hilton.com/en/hotels/osahitw-hilton-osaka/",
    "tags": [
      "Umeda Location",
      "City Views"
    ],
    "hotelMeta": {
      "address": "1-8-8, Umeda, Kita-ku, Osaka 530-0001, Japan",
      "directions": "https://www.google.com/maps/dir/?api=1&destination=34.7003,135.4955",
      "neighborhoodInsights": "Umeda is Osaka's glittering northern hub. It's a vertical city of giant department stores and high-end dining.",
      "tags": [
        "Umeda Location",
        "City Views"
      ]
    }
  },
  "osaka-castle": {
    "id": "osaka-castle",
    "name": "Osaka Castle",
    "type": "sight",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6873,
      "lon": 135.5262
    },
    "description": "Historic Landmark",
    "url": "https://www.osakacastle.net/english/",
    "tags": [
      "Historic Castle",
      "Park Views"
    ]
  },
  "dotonbori": {
    "id": "dotonbori",
    "name": "Dotonbori",
    "type": "sight_rec",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6687,
      "lon": 135.5013
    },
    "description": "Food & Neon District",
    "url": "https://osaka-info.jp/en/spot/dotonbori/",
    "tags": [
      "Neon Lights",
      "Street Food"
    ]
  },
  "shinsekai": {
    "id": "shinsekai",
    "name": "Shinsekai",
    "type": "sight_rec",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.652,
      "lon": 135.5063
    },
    "description": "Retro Osaka Vibes",
    "url": "https://osaka-info.jp/en/spot/shinsekai/",
    "tags": [
      "Retro Vibe",
      "Kushikatsu"
    ]
  },
  "doyama-cho": {
    "id": "doyama-cho",
    "name": "Dōyama-chō",
    "type": "sight",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.7036,
      "lon": 135.5033
    },
    "description": "Gay District",
    "url": "https://insideosaka.com/osaka-gay-district/",
    "tags": [
      "Gay District",
      "Nightlife"
    ]
  },
  "kushikatsu-daruma": {
    "id": "kushikatsu-daruma",
    "name": "Kushikatsu Daruma",
    "type": "food",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.669,
      "lon": 135.503
    },
    "description": "Famous Fried Skewers",
    "url": "https://www.kushikatsu-daruma.com/",
    "tags": [
      "Deep Fried Skewers",
      "No Double Dipping"
    ]
  },
  "fukutaro": {
    "id": "fukutaro",
    "name": "Fukutaro",
    "type": "food",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6655,
      "lon": 135.502
    },
    "description": "Top Rated Okonomiyaki",
    "url": "https://2951.jp/",
    "tags": [
      "Okonomiyaki",
      "Negiyaki"
    ]
  },
  "ajinoya-honten": {
    "id": "ajinoya-honten",
    "name": "Ajinoya Honten",
    "type": "food_rec",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.668,
      "lon": 135.501
    },
    "description": "Michelin Bib Gourmand Okonomiyaki",
    "url": "http://www.ajinoya-okonomiyaki.com/top/",
    "tags": [
      "Michelin Bib",
      "Okonomiyaki"
    ]
  },
  "den-den-town": {
    "id": "den-den-town",
    "name": "Den Den Town",
    "type": "sight_rec",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6593,
      "lon": 135.506
    },
    "description": "Electronics district (Osaka's Akihabara).",
    "url": "https://osaka-info.jp/en/spot/nipponbashi-den-den-town/",
    "tags": [
      "Anime Goods",
      "Electronics"
    ]
  },
  "nishinomaru-garden": {
    "id": "nishinomaru-garden",
    "name": "Nishinomaru Garden",
    "type": "sight_rec",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.685,
      "lon": 135.5255
    },
    "description": "Osaka Castle grounds with 600 cherry trees.",
    "url": "https://www.osakacastle.net/english/park/nishinomaru.html",
    "tags": [
      "Castle Views",
      "Cherry Blossoms"
    ]
  },
  "glico-man": {
    "id": "glico-man",
    "name": "Glico Man Sign",
    "type": "sight_rec",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6687,
      "lon": 135.5013
    },
    "description": "Iconic photo spot in Dotonbori.",
    "url": "https://osaka-info.jp/en/spot/dotonbori/",
    "tags": [
      "Iconic Photo",
      "Dotonbori"
    ]
  },
  "kani-doraku": {
    "id": "kani-doraku",
    "name": "Kani Doraku Dotonbori",
    "type": "food_rec",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6687,
      "lon": 135.5013
    },
    "description": "Famous crab specialist with giant sign.",
    "url": "https://douraku.co.jp/",
    "tags": [
      "Crab Feast",
      "Moving Sign"
    ]
  },
  "gems-namba": {
    "id": "gems-namba",
    "name": "GEMS Namba",
    "type": "food_rec",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6644,
      "lon": 135.5008
    },
    "description": "Dining complex specialising in meat.",
    "url": "https://www.gems-portal.com/series/detail.php?id=8",
    "tags": [
      "Dining Complex",
      "Namba"
    ]
  },
  "ajinoya-branch": {
    "id": "ajinoya-branch",
    "name": "Ajinoya",
    "type": "food_rec",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.668,
      "lon": 135.5015
    },
    "description": "Famous Okonomiyaki (Bib Gourmand).",
    "url": "http://www.ajinoya-okonomiyaki.com/english/",
    "tags": [
      "Okonomiyaki",
      "Fluffy Pancake"
    ]
  },
  "don-quijote": {
    "id": "don-quijote",
    "name": "Don Quijote Dotonbori",
    "type": "shopping",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6693,
      "lon": 135.5028
    },
    "description": "For Skincare/Snack Loot Drops (Ferris Wheel).",
    "url": "https://www.donki.com/en/",
    "tags": [
      "Discount Shopping",
      "Ferris Wheel"
    ]
  },
  "shinsaibashi-arcade": {
    "id": "shinsaibashi-arcade",
    "name": "Shinsaibashi Shopping Arcade",
    "type": "shopping",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6716,
      "lon": 135.5015
    },
    "description": "Premier covered shopping street.",
    "url": "https://osaka-info.jp/en/spot/shinsaibashi-suji/",
    "tags": [
      "Covered Shopping",
      "Fashion"
    ]
  },
  "hilton-shanghai": {
    "id": "hilton-shanghai",
    "name": "Hilton Shanghai City Center",
    "type": "hotel",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2185,
      "lon": 121.4332
    },
    "description": "Top Pick Hotel - West Yan'an Road.",
    "url": "https://www.hilton.com/en/hotels/shamshi-hilton-shanghai-city-center/",
    "tags": [
      "Central Location",
      "Business"
    ],
    "hotelMeta": {
      "address": "No. 488 West Yan'an Road, Shanghai, 200050, China",
      "directions": "https://www.google.com/maps/dir/?api=1&destination=31.2185,121.4332",
      "neighborhoodInsights": "Located near the edge of the historic Former French Concession. It provides a more localized and authentic 'Old Shanghai' feel.",
      "tags": [
        "Central Location",
        "Business"
      ]
    }
  },
  "pudong-airport": {
    "id": "pudong-airport",
    "name": "Pudong Airport (PVG)",
    "type": "travel",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.1443,
      "lon": 121.8083
    },
    "description": "Arrival/Departure",
    "url": "https://www.shanghaiairport.com/en/",
    "tags": [
      "International Hub",
      "Far from City"
    ]
  },
  "maglev-station": {
    "id": "maglev-station",
    "name": "Maglev Longyang Rd",
    "type": "travel",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.209,
      "lon": 121.558
    },
    "description": "High Speed Train Station",
    "url": "https://www.meet-in-shanghai.net/traffic/maglev",
    "tags": [
      "High Speed Train",
      "Airport Link"
    ]
  },
  "french-concession": {
    "id": "french-concession",
    "name": "French Concession",
    "type": "sight",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2155,
      "lon": 121.4556
    },
    "description": "Historic Walking Area",
    "url": "https://www.smartshanghai.com/articles/tourist/the-former-french-concession",
    "tags": [
      "Tree-lined Streets",
      "European Vibe"
    ]
  },
  "yu-garden": {
    "id": "yu-garden",
    "name": "Yu Garden",
    "type": "sight",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2272,
      "lon": 121.4921
    },
    "description": "Classical Garden",
    "url": "https://www.meet-in-shanghai.net/scenic-spots/yu-garden",
    "tags": [
      "Classical Garden",
      "Old City"
    ]
  },
  "the-bund": {
    "id": "the-bund",
    "name": "The Bund",
    "type": "sight",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2402,
      "lon": 121.4905
    },
    "description": "Iconic Waterfront Skyline",
    "url": "https://www.meet-in-shanghai.net/scenic-spots/the-bund",
    "tags": [
      "Waterfront Views",
      "Colonial Architecture"
    ]
  },
  "fu-1039": {
    "id": "fu-1039",
    "name": "Fu 1039",
    "type": "food",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.22,
      "lon": 121.43
    },
    "description": "Birthday Dinner (Classic)",
    "url": "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/fu-1039",
    "tags": [
      "Shanghainese",
      "Heritage Villa"
    ]
  },
  "fu-he-hui": {
    "id": "fu-he-hui",
    "name": "Fu He Hui",
    "type": "food_rec",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.221,
      "lon": 121.431
    },
    "description": "Birthday Dinner (Veg Option)",
    "url": "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/fu-he-hui",
    "tags": [
      "Vegetarian Fine Dining",
      "Michelin"
    ]
  },
  "old-jesse": {
    "id": "old-jesse",
    "name": "Old Jesse",
    "type": "food",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.205,
      "lon": 121.44
    },
    "description": "Authentic Local Cuisine",
    "url": "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/old-jesse-xuhui",
    "tags": [
      "Authentic Local",
      "Braised Pork"
    ]
  },
  "jianguo-328": {
    "id": "jianguo-328",
    "name": "Jianguo 328",
    "type": "food",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.208,
      "lon": 121.455
    },
    "description": "MSG-Free Shanghainese.",
    "url": "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/jianguo-328",
    "tags": [
      "MSG-Free",
      "Homestyle"
    ]
  },
  "yangs-dumplings": {
    "id": "yangs-dumplings",
    "name": "Yang's Dumplings",
    "type": "food",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.1443,
      "lon": 121.8083
    },
    "description": "Famous Sheng Jian Bao chain (PVG Airport).",
    "tags": [
      "Sheng Jian Bao",
      "Pan-Fried"
    ]
  },
  "hunt-bar": {
    "id": "hunt-bar",
    "name": "HUNT",
    "type": "bar_rec",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2057,
      "lon": 121.4336
    },
    "description": "Popular Gay Bar/Club (Bear Friendly)",
    "tags": [
      "Gay Bar",
      "Social Hub"
    ]
  },
  "nara-park": {
    "id": "nara-park",
    "name": "Nara Deer Park",
    "type": "sight",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.685,
      "lon": 135.843
    },
    "description": "Park with free-roaming deer and temples.",
    "url": "https://www.japan-guide.com/e/e4103.html",
    "tags": [
      "Friendly Deer",
      "Temple Grounds"
    ]
  },
  "asia-blue": {
    "id": "asia-blue",
    "name": "Asia Blue",
    "type": "bar",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.203857,
      "lon": 121.430064
    },
    "description": "Shanghai's oldest gay bar and pioneer of LGBTQ+ nightlife.",
    "url": "https://www.smartshanghai.com/venue/20153/asia_blue_panyu_lu",
    "tags": [
      "Gay Bar",
      "Cozy"
    ]
  }
};
