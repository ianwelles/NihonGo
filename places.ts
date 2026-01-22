import { Place } from './types';

export const places: Record<string, Place> = {
  "hilton-tokyo": {
    "id": "hilton-tokyo",
    "name": "Hilton Tokyo (ヒルトン東京)",
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
      "directions": "https://www.google.com/maps/dir/?api=1&destination=35.6925,139.6921&travelmode=transit",
      "neighborhoodInsights": "Nishi-Shinjuku is Tokyo's premier skyscraper district. It offers a sophisticated, professional atmosphere a short walk from the neon-lit 'Golden Gai'.",
      "tags": [
        "City Views",
        "Executive Lounge"
      ]
    }
  },
  "haneda-airport": {
    "id": "haneda-airport",
    "name": "Haneda Airport (羽田空港)",
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
    "name": "Shinjuku Station (新宿駅)",
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
    "name": "Shinjuku Gyoen (新宿御苑)",
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
    "name": "Senso-ji (浅草寺)",
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
    "name": "Imperial Palace East Gardens (皇居東御苑)",
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
    "name": "Shinjuku Ni-chome (新宿二丁目)",
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
    "name": "Shibuya Crossing (渋谷スクランブル交差点)",
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
    "name": "Tokyo Metro Gov Building (東京都庁舎)",
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
    "name": "Torikizoku (鳥貴族)",
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
    "name": "Omoide Yokocho (思い出横丁)",
    "type": "food",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6929,
      "lon": 139.6995
    },
    "description": "Atmospheric Memory Lane (Yakitori)",
    "url": "https://en.shinjuku-omoide.com/",
    "tags": [
      "Nostalgic Alley",
      "Yakitori"
    ]
  },
  "tsukiji-market": {
    "id": "tsukiji-market",
    "name": "Tsukiji Outer Market (築地場外市場)",
    "type": "food",
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
    "name": "Konjiki Hototogisu (金色不如帰)",
    "type": "food",
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
    "name": "Ramen Nagi (ラーメン凪)",
    "type": "food",
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
    "name": "Fuunji (風雲児)",
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
    "name": "Ichiran Shinjuku (一蘭 新宿)",
    "type": "maria Tips",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6909,
      "lon": 139.7032
    },
    "description": "The ultimate solo dining experience. Customize your Tonkotsu ramen.",
    "url": "https://en.ichiran.com/shop/tokyo/shinjuku-chuo-higashiguchi/",
    "tags": [
      "Tonkotsu Ramen",
      "Solo Booths"
    ]
  },
  "sushi-kunimitsu": {
    "id": "sushi-kunimitsu",
    "name": "Sushi Kunimitsu (鮨 くにみつ)",
    "type": "food",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.7061,
      "lon": 139.6839
    },
    "description": "Highly rated Omakase course (4.7★).",
    "url": "https://www.instagram.com/sushi_kunimitsu/",
    "tags": [
      "Omakase",
      "Intimate"
    ]
  },
  "osushiya-taiki": {
    "id": "osushiya-taiki",
    "name": "Osushiya Taiki (お鮨屋 たいき)",
    "type": "food",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.7135,
      "lon": 139.704
    },
    "description": "Intimate counter sushi in Takadanobaba.",
    "url": "https://tabelog.com/en/tokyo/A1305/A130503/13247065/",
    "tags": [
      "Sushi",
      "Counter Seating"
    ]
  },
  "ginza-district": {
    "id": "ginza-district",
    "name": "Ginza District (銀座)",
    "type": "sight",
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
    "name": "Tokyo Tower (東京タワー)",
    "type": "sight",
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
    "name": "Zojo-ji Temple (増上寺)",
    "type": "sight",
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
    "name": "Meiji Shrine (明治神宮)",
    "type": "sight",
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
    "name": "Kabukicho (歌舞伎町)",
    "type": "sight",
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
    "name": "Omotesando (表参道)",
    "type": "sight",
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
    "name": "Takeshita Street (竹下通り)",
    "type": "sight",
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
    "name": "Hachiko Statue (忠犬ハチ公像)",
    "type": "sight",
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
    "name": "Akihabara Electric Town (秋葉原電気街)",
    "type": "sight",
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
    "name": "Hamarikyu Gardens (浜離宮恩賜庭園)",
    "type": "sight",
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
    "name": "Yamato Sushi (大和寿司)",
    "type": "food",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6465,
      "lon": 139.7879
    },
    "description": "Fresh sushi at Toyosu Market.",
    "url": "https://www.sushiyamato-toyosu.com/",
    "tags": [
      "Tsukiji Fresh",
      "Sushi Breakfast"
    ]
  },
  "hakushu-teppanyaki": {
    "id": "hakushu-teppanyaki",
    "name": "Hakushu Teppanyaki (鉄板焼き 白秋)",
    "type": "food",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6558,
      "lon": 139.7015
    },
    "description": "High-end Teppanyaki for Kobe beef.",
    "url": "https://teppanyaki-hakushu.com/",
    "tags": [
      "Kobe Beef",
      "Teppanyaki"
    ]
  },
  "niagara-curry": {
    "id": "niagara-curry",
    "name": "Niágara Curry (ナイアガラ)",
    "type": "food",
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
    "name": "Ginza Shopping Area (銀座ショッピングエリア)",
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
    "name": "Akihabara Shopping (秋葉原ショッピングエリア)",
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
  "gion-district": {
    "id": "gion-district",
    "name": "Gion District (祇園)",
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
    "name": "Fushimi Inari Taisha (伏見稲荷大社)",
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
    "name": "Kiyomizu-dera (清水寺)",
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
    "name": "Arashiyama Bamboo Grove (嵐山竹林)",
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
    "name": "Nishiki Market (錦市場)",
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
    "name": "Honke Daiichi-Asahi (本家 第一旭)",
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
    "name": "Menbaka Fire Ramen (めん馬鹿一代)",
    "type": "maria Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0211,
      "lon": 135.746
    },
    "description": "Explosive fire ramen performance.",
    "url": "https://www.instagram.com/menbaka_fire_ramen",
    "tags": [
      "Fire Performance",
      "Negi Ramen"
    ]
  },
  "kyoto-imperial": {
    "id": "kyoto-imperial",
    "name": "Kyoto Imperial Palace (京都御所)",
    "type": "sight",
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
    "name": "Higashiyama District (東山区)",
    "type": "sight",
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
    "name": "Ninenzaka & Sannenzaka (二寧坂・産寧坂)",
    "type": "sight",
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
    "name": "Yasaka Pagoda (法観寺)",
    "type": "sight",
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
    "name": "Yasaka Jinja (八坂神社)",
    "type": "sight",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0037,
      "lon": 135.7785
    },
    "description": "Large shrine complex in Gion.",
    "url": "https://www.yasaka-jinja.or.jp/en/",
    "tags": [
      "Gion Shrine",
      "Lanterns"
    ]
  },
  "shirakawa-lane": {
    "id": "shirakawa-lane",
    "name": "Shirakawa Lane (白川筋)",
    "type": "sight",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0055,
      "lon": 135.7758
    },
    "description": "Scenic canal street in Gion.",
    "url": "https://www.japan-guide.com/e/e3902.html",
    "tags": [
      "Scenic Canal",
      "Willow Trees"
    ]
  },
  "kinkaku-ji": {
    "id": "kinkaku-ji",
    "name": "Kinkaku-ji (金閣寺)",
    "type": "sight",
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
    "name": "Philosopher’s Path (哲学の道)",
    "type": "sight",
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
    "name": "Ginkaku-ji (銀閣寺)",
    "type": "sight",
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
    "name": "Hikiniku to Come (挽肉と米)",
    "type": "food",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.9965,
      "lon": 135.778
    },
    "description": "Charcoal grilled hamburger steaks.",
    "url": "https://hikinikutocome.com/en/",
    "tags": [
      "Hamburger Steak",
      "Charcoal Grilled"
    ]
  },
  "restaurante-tomisen": {
    "id": "restaurante-tomisen",
    "name": "Restaurante Tomisen (冨せん)",
    "type": "food",
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
    "name": "Mouriya Gion (モーリヤ祇園)",
    "type": "food",
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
    "name": "Botanic Coffee Kyoto (ボタニックコーヒーキョウト)",
    "type": "food",
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
    "name": "Starbucks Ninenzaka (スターバックス コーヒー 京都二寧坂ヤサカ茶屋店)",
    "type": "food",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.9982,
      "lon": 135.7825
    },
    "description": "Traditional house with tatami floors.",
    "url": "https://store.starbucks.co.jp/detail-1484/",
    "tags": [
      "Tatami Seating",
      "Machiya Style"
    ]
  },
  "yojiya-main": {
    "id": "yojiya-main",
    "name": "Yojiya Main Store (よーじや祇園本店)",
    "type": "shopping",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0094,
      "lon": 135.7686
    },
    "description": "Kyoto cosmetics and oil-blotting paper.",
    "url": "https://www.yojiya.co.jp/english/",
    "tags": [
      "Cosmetics",
      "Cafe"
    ]
  },
  "shijo-kawaramachi": {
    "id": "shijo-kawaramachi",
    "name": "Shijo Kawaramachi (四条河原町)",
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
    "name": "Hilton Osaka (ヒルトン大阪)",
    "type": "hotel",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.7003,
      "lon": 135.4955
    },
    "description": "Top Pick Hotel in Umeda.",
    "url": "https://www.hilton.com/en/hotels/osahitw-hilton-osaka/",
    "tags": [
      "Umeda Location",
      "City Views"
    ],
    "hotelMeta": {
      "address": "1-8-8, Umeda, Kita-ku, Osaka 530-0001, Japan",
      "directions": "https://www.google.com/maps/dir/?api=1&destination=34.7003,135.4955&travelmode=transit,Umeda",
      "neighborhoodInsights": "Umeda is Osaka's vertical city hub.",
      "tags": [
        "Umeda Location",
        "City Views"
      ]
    }
  },
  "osaka-castle": {
    "id": "osaka-castle",
    "name": "Osaka Castle (大阪城)",
    "type": "sight",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6873,
      "lon": 135.5262
    },
    "description": "Historic Landmark and museum.",
    "url": "https://www.osakacastle.net/english/",
    "tags": [
      "Historic Castle",
      "Park Views"
    ]
  },
  "dotonbori": {
    "id": "dotonbori",
    "name": "Dotonbori (道頓堀)",
    "type": "sight",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6687,
      "lon": 135.5013
    },
    "description": "Vibrant food and neon district.",
    "url": "https://osaka-info.jp/en/spot/dotonbori/",
    "tags": [
      "Neon Lights",
      "Street Food"
    ]
  },
  "shinsekai": {
    "id": "shinsekai",
    "name": "Shinsekai (新世界)",
    "type": "sight",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.652,
      "lon": 135.5063
    },
    "description": "Retro Osaka entertainment district.",
    "url": "https://osaka-info.jp/en/spot/shinsekai/",
    "tags": [
      "Retro Vibe",
      "Kushikatsu"
    ]
  },
  "doyama-cho": {
    "id": "doyama-cho",
    "name": "Dōyama-chō (堂山町)",
    "type": "sight",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.7036,
      "lon": 135.5033
    },
    "description": "Osaka's main gay district.",
    "url": "https://insideosaka.com/osaka-gay-district/",
    "tags": [
      "Gay District",
      "Nightlife"
    ]
  },
  "kushikatsu-daruma": {
    "id": "kushikatsu-daruma",
    "name": "Kushikatsu Daruma (串かつだるま)",
    "type": "food",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.669,
      "lon": 135.503
    },
    "description": "Famous deep-fried skewers.",
    "url": "https://www.kushikatsu-daruma.com/",
    "tags": [
      "Deep Fried Skewers",
      "No Double Dipping"
    ]
  },
  "fukutaro": {
    "id": "fukutaro",
    "name": "Fukutaro (福太郎)",
    "type": "food",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6645,
      "lon": 135.502
    },
    "description": "Renowned okonomiyaki and negiyaki.",
    "url": "https://2951.jp/",
    "tags": [
      "Okonomiyaki",
      "Negiyaki"
    ]
  },
  "ajinoya-honten": {
    "id": "ajinoya-honten",
    "name": "Ajinoya Honten (味乃家 本店)",
    "type": "food",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.668,
      "lon": 135.501
    },
    "description": "Michelin Bib Gourmand Okonomiyaki.",
    "url": "http://www.ajinoya-okonomiyaki.com/top/",
    "tags": [
      "Michelin Bib",
      "Okonomiyaki"
    ]
  },
  "den-den-town": {
    "id": "den-den-town",
    "name": "Den Den Town (でんでんタウン)",
    "type": "sight",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6593,
      "lon": 135.506
    },
    "description": "Osaka's electronics and anime district.",
    "url": "https://osaka-info.jp/en/spot/nipponbashi-den-den-town/",
    "tags": [
      "Anime Goods",
      "Electronics"
    ]
  },
  "nishinomaru-garden": {
    "id": "nishinomaru-garden",
    "name": "Nishinomaru Garden (西の丸庭園)",
    "type": "sight",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.685,
      "lon": 135.5255
    },
    "description": "Scenic garden in Osaka Castle Park.",
    "url": "https://www.osakacastle.net/english/park/nishinomaru.html",
    "tags": [
      "Castle Views",
      "Cherry Blossoms"
    ]
  },
  "glico-man": {
    "id": "glico-man",
    "name": "Glico Man Sign (グリコサイン)",
    "type": "sight",
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
    "name": "Kani Doraku Dotonbori (かに道楽)",
    "type": "food",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6687,
      "lon": 135.5013
    },
    "description": "Famous crab specialty restaurant.",
    "url": "https://douraku.co.jp/",
    "tags": [
      "Crab Feast",
      "Moving Sign"
    ]
  },
  "gems-namba": {
    "id": "gems-namba",
    "name": "GEMS Namba (GEMSなんば)",
    "type": "food",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6644,
      "lon": 135.5008
    },
    "description": "Dining complex for meat lovers.",
    "url": "https://www.gems-portal.com/series/detail.php?id=8",
    "tags": [
      "Dining Complex",
      "Namba"
    ]
  },
  "ajinoya-branch": {
    "id": "ajinoya-branch",
    "name": "Ajinoya (味乃家)",
    "type": "food",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.668,
      "lon": 135.5015
    },
    "description": "Famous fluffy Okonomiyaki.",
    "url": "http://www.ajinoya-okonomiyaki.com/english/",
    "tags": [
      "Okonomiyaki",
      "Fluffy Pancake"
    ]
  },
  "don-quijote": {
    "id": "don-quijote",
    "name": "Don Quijote Dotonbori (ドン・キホーテ 道頓堀店)",
    "type": "shopping",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6693,
      "lon": 135.5028
    },
    "description": "Discount shopping and Ferris wheel.",
    "url": "https://www.donki.com/en/",
    "tags": [
      "Discount Shopping",
      "Ferris Wheel"
    ]
  },
  "shinsaibashi-arcade": {
    "id": "shinsaibashi-arcade",
    "name": "Shinsaibashi Shopping Arcade (心斎橋筋商店街)",
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
    "name": "Hilton Shanghai City Center (上海静安希尔顿酒店)",
    "type": "hotel",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2185,
      "lon": 121.4332
    },
    "description": "Top Pick Hotel near Jing'an.",
    "url": "https://www.hilton.com/en/hotels/shamshi-hilton-shanghai-city-center/",
    "tags": [
      "Central Location",
      "Business"
    ],
    "hotelMeta": {
      "address": "No. 488 West Yan'an Road, Shanghai, 200050, China",
      "directions": "https://www.google.com/maps/dir/?api=1&destination=31.2185,121.4332&travelmode=transit,Located",
      "neighborhoodInsights": "Near the Former French Concession.",
      "tags": [
        "Central Location",
        "Business"
      ]
    }
  },
  "pudong-airport": {
    "id": "pudong-airport",
    "name": "Pudong Airport (PVG) (浦东国际机场)",
    "type": "travel",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.1443,
      "lon": 121.8083
    },
    "description": "Arrival and Departure hub.",
    "url": "https://www.shanghaiairport.com/en/",
    "tags": [
      "International Hub",
      "Far from City"
    ]
  },
  "maglev-station": {
    "id": "maglev-station",
    "name": "Maglev Longyang Rd (磁浮龙阳路站)",
    "type": "travel",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.209,
      "lon": 121.558
    },
    "description": "High Speed Maglev link to PVG.",
    "url": "https://www.smtdc.com/en/",
    "tags": [
      "High Speed Train",
      "Airport Link"
    ]
  },
  "french-concession": {
    "id": "french-concession",
    "name": "French Concession (上海法租界)",
    "type": "sight",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2155,
      "lon": 121.4556
    },
    "description": "Historic tree-lined walking area.",
    "url": "https://www.smartshanghai.com/articles/tourist/the-former-french-concession/",
    "tags": [
      "Tree-lined Streets",
      "European Vibe"
    ]
  },
  "yu-garden": {
    "id": "yu-garden",
    "name": "Yu Garden (豫园)",
    "type": "sight",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2272,
      "lon": 121.4921
    },
    "description": "Classical Ming-style garden.",
    "url": "https://www.meet-in-shanghai.net/scenic-spots/yu-garden",
    "tags": [
      "Classical Garden",
      "Old City"
    ]
  },
  "the-bund": {
    "id": "the-bund",
    "name": "The Bund (外滩)",
    "type": "sight",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2402,
      "lon": 121.4905
    },
    "description": "Iconic waterfront skyline view.",
    "url": "https://www.meet-in-shanghai.net/scenic-spots/the-bund",
    "tags": [
      "Waterfront Views",
      "Colonial Architecture"
    ]
  },
  "fu-1039": {
    "id": "fu-1039",
    "name": "Fu 1039 (福1039)",
    "type": "food",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.22,
      "lon": 121.43
    },
    "description": "Classic Shanghainese in a villa.",
    "url": "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/fu-1039",
    "tags": [
      "Shanghainese",
      "Heritage Villa"
    ]
  },
  "fu-he-hui": {
    "id": "fu-he-hui",
    "name": "Fu He Hui (福和慧)",
    "type": "food",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.221,
      "lon": 121.431
    },
    "description": "Michelin vegetarian fine dining.",
    "url": "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/fu-he-hui",
    "tags": [
      "Vegetarian Fine Dining",
      "Michelin"
    ]
  },
  "old-jesse": {
    "id": "old-jesse",
    "name": "Old Jesse (老吉士)",
    "type": "food",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.205,
      "lon": 121.44
    },
    "description": "Authentic local Shanghainese food.",
    "url": "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/old-jesse-xuhui",
    "tags": [
      "Authentic Local",
      "Braised Pork"
    ]
  },
  "jianguo-328": {
    "id": "jianguo-328",
    "name": "Jianguo 328 (建国328小馆)",
    "type": "food",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.208,
      "lon": 121.455
    },
    "description": "MSG-free local home cooking.",
    "url": "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/jianguo-328",
    "tags": [
      "MSG-Free",
      "Homestyle"
    ]
  },
  "yangs-dumplings": {
    "id": "yangs-dumplings",
    "name": "Yang's Dumplings (小杨生煎)",
    "type": "food",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.148,
      "lon": 121.81
    },
    "description": "Famous pan-fried soup buns.",
    "url": "https://www.smartshanghai.com/venue/2945/yang_s_fry-dumpling",
    "tags": [
      "Sheng Jian Bao",
      "Pan-Fried"
    ]
  },
  "hunt-bar": {
    "id": "hunt-bar",
    "name": "HUNT (HUNT酒吧)",
    "type": "bar",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2057,
      "lon": 121.4336
    },
    "description": "Popular social gay bar.",
    "url": "https://www.travelgay.com/venue/hunt-shanghai",
    "tags": [
      "Gay Bar",
      "Social Hub"
    ]
  },
  "nara-park": {
    "id": "nara-park",
    "name": "Nara Deer Park (奈良公園)",
    "type": "sight",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.685,
      "lon": 135.843
    },
    "description": "Park with wild bowing deer.",
    "url": "https://www.japan-guide.com/e/e4103.html",
    "tags": [
      "Friendly Deer",
      "Temple Grounds"
    ]
  },
  "shanghai-tower": {
    "id": "shanghai-tower",
    "name": "Shanghai Tower (上海中心大厦)",
    "type": "sight",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.233,
      "lon": 121.505
    },
    "description": "China's tallest observation deck.",
    "url": "https://en.shanghaitower.com/",
    "tags": [
      "Skyline",
      "Views"
    ]
  },
  "osaka-station": {
    "id": "osaka-station",
    "name": "Osaka Station (大阪駅)",
    "type": "travel",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.7025,
      "lon": 135.496
    },
    "description": "Main transit hub for Umeda.",
    "url": "https://www.westjr.co.jp/global/en/",
    "tags": [
      "Transport"
    ]
  },
  "kansai-airport": {
    "id": "kansai-airport",
    "name": "Kansai Intl Airport (KIX) (関西国際空港)",
    "type": "travel",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.4325,
      "lon": 135.2304
    },
    "description": "Departure airport for Osaka.",
    "url": "https://www.kansai-airport.or.jp/en/",
    "tags": [
      "Airport",
      "Departure"
    ]
  },
  "kyoto-station": {
    "id": "kyoto-station",
    "name": "Kyoto Station (京都駅)",
    "type": "travel",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.9858,
      "lon": 135.7588
    },
    "description": "Major architectural transport hub.",
    "url": "https://www.kyotostation.com/",
    "tags": [
      "Transport",
      "Architecture"
    ]
  },
  "ramen-tatsunoya": {
    "id": "ramen-tatsunoya",
    "name": "Ramen Tatsunoya (ラーメン龍の家)",
    "type": "food",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6946,
      "lon": 139.6993
    },
    "description": "Tonkotsu ramen and dipping noodles.",
    "url": "http://www.tatsunoya.net/",
    "tags": [
      "Ramen",
      "Tsukemen",
      "Lunch"
    ]
  },
  "ishibekoji-muan": {
    "id": "ishibekoji-muan",
    "name": "Ishibekoji Muan (石塀小路 夢庵)",
    "type": "hotel",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0003,
      "lon": 135.7797
    },
    "description": "Intimate luxury 5-star ryokan.",
    "url": "https://www.ishibekojimuan.com/",
    "tags": [
      "Ryokan",
      "Luxury",
      "Historic",
      "Hinoki Bath"
    ],
    "hotelMeta": {
      "address": "463-10 Shimokawara-cho, Higashiyama-ku, Kyoto 605-0825, Japan",
      "directions": "https://www.google.com/maps/dir/?api=1&destination=35.0003,135.7797&travelmode=transit",
      "neighborhoodInsights": "Located in atmospheric Ishibe-koji.",
      "tags": [
        "Ryokan",
        "Luxury",
        "Historic",
        "Hinoki Bath"
      ]
    }
  },
  "nanxiang-bun": {
    "id": "nanxiang-bun",
    "name": "Nanxiang Steamed Bun (南翔馒头店)",
    "type": "food",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2272,
      "lon": 121.4921
    },
    "description": "Iconic xiaolongbao in Yu Garden.",
    "url": "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/nanxiang-steamed-bun-city-god-temple",
    "tags": [
      "Old City",
      "Touristy but iconic"
    ]
  },
  "teamlab-planets": {
    "id": "teamlab-planets",
    "name": "TeamLab Planets (チームラボプラネッツ)",
    "type": "sight",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6457,
      "lon": 139.7892
    },
    "description": "Immersive water-themed digital art.",
    "url": "https://planets.teamlab.art/tokyo/",
    "tags": [
      "Art",
      "Interactive",
      "Indoor"
    ]
  },
  "shibuya-sky": {
    "id": "shibuya-sky",
    "name": "Shibuya Sky (渋谷スカイ)",
    "type": "sight",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6585,
      "lon": 139.7023
    },
    "description": "Open-air deck above the Scramble.",
    "url": "https://www.shibuya-scramble-square.com/sky/",
    "tags": [
      "Views",
      "Rooftop",
      "Sunset"
    ]
  },
  "nezu-museum": {
    "id": "nezu-museum",
    "name": "Nezu Museum (根津美術館)",
    "type": "sight",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.6622,
      "lon": 139.7188
    },
    "description": "Private art collection and garden.",
    "url": "https://www.nezu-muse.or.jp/en/",
    "tags": [
      "Garden",
      "Architecture",
      "Art"
    ]
  },
  "pontocho-alley": {
    "id": "pontocho-alley",
    "name": "Pontocho Alley (先斗町)",
    "type": "sight",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0049,
      "lon": 135.7712
    },
    "description": "Historic narrow dining alley.",
    "url": "https://www.japan-guide.com/e/e3921.html",
    "tags": [
      "Dining",
      "Atmospheric",
      "Night"
    ]
  },
  "todai-ji": {
    "id": "todai-ji",
    "name": "Todai-ji Temple (東大寺)",
    "type": "sight",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.689,
      "lon": 135.8398
    },
    "description": "Giant Buddha statue in Nara.",
    "url": "https://www.todaiji.or.jp/en/",
    "tags": [
      "Great Buddha",
      "Historic",
      "Temple"
    ]
  },
  "umeda-sky": {
    "id": "umeda-sky",
    "name": "Umeda Sky Building (梅田スカイビル)",
    "type": "sight",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.7053,
      "lon": 135.4897
    },
    "description": "Floating Garden Observatory.",
    "url": "https://www.skybldg.co.jp/en/",
    "tags": [
      "Architecture",
      "Views",
      "Sunset"
    ]
  },
  "kuromon-market": {
    "id": "kuromon-market",
    "name": "Kuromon Market (黒門市場)",
    "type": "food",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6653,
      "lon": 135.5074
    },
    "description": "Osaka's fresh seafood market hub.",
    "url": "https://kuromon.com/en/",
    "tags": [
      "Seafood",
      "Street Food",
      "Market"
    ]
  },
  "jingan-temple": {
    "id": "jingan-temple",
    "name": "Jing'an Temple (静安寺)",
    "type": "sight",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.223,
      "lon": 121.446
    },
    "description": "Golden Buddhist temple in the city centre.",
    "url": "https://www.meet-in-shanghai.net/scenic-spots/jingan-temple",
    "tags": [
      "Temple",
      "Gold",
      "Architecture"
    ]
  },
  "tianzifang": {
    "id": "tianzifang",
    "name": "Tianzifang (田子坊)",
    "type": "sight",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.209,
      "lon": 121.464
    },
    "description": "Artistic labyrinth of boutiques.",
    "url": "https://www.meet-in-shanghai.net/scenic-spots/tianzifang",
    "tags": [
      "Shopping",
      "Artsy",
      "Crowded"
    ]
  },
  "rice-bar": {
    "id": "rice-bar",
    "name": "Rice Bar (ライスバー)",
    "type": "bar",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2031,
      "lon": 121.4256
    },
    "description": "Japanese-themed social lounge.",
    "url": "https://www.smartshanghai.com/venue/5856/rice_bar",
    "tags": [
      "Lounge",
      "Friendly"
    ]
  },
  "ren-he-guan": {
    "id": "ren-he-guan",
    "name": "Ren He Guan (人和馆)",
    "type": "cesar Tips",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2035,
      "lon": 121.4565
    },
    "description": "Excellent Shanghainese home cooking.",
    "url": "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/ren-he-guan-zhaojiabang-road",
    "tags": [
      "Shanghainese",
      "Michelin Star",
      "Home Cooking"
    ]
  },
  "gion-tanto": {
    "id": "gion-tanto",
    "name": "Gion Tanto (祇園たんと)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0055,
      "lon": 135.7735
    },
    "description": "Popular riverside okonomiyaki in Gion.",
    "url": "http://www.gion-tanto.com/",
    "tags": [
      "Okonomiyaki",
      "Gion",
      "Riverside"
    ]
  },
  "omen-udon": {
    "id": "omen-udon",
    "name": "Omen (おめん)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.026,
      "lon": 135.7954
    },
    "description": "Renowned udon restaurant near Ginkaku-ji.",
    "url": "https://www.omen.co.jp/en/",
    "tags": [
      "Udon",
      "Traditional",
      "Ginkaku-ji"
    ]
  },
  "ichiran-kyoto": {
    "id": "ichiran-kyoto",
    "name": "Ichiran Ramen (一蘭)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.003,
      "lon": 135.768
    },
    "description": "Famous tonkotsu ramen with solo booths.",
    "url": "https://en.ichiran.com/",
    "tags": [
      "Tonkotsu Ramen",
      "Solo Booths",
      "Customisable"
    ]
  },
  "engine-ramen": {
    "id": "engine-ramen",
    "name": "Engine Ramen (エンジンラーメン)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0056,
      "lon": 135.7675
    },
    "description": "Modern ramen shop with vegan options.",
    "url": "https://www.engineramen.com/",
    "tags": [
      "Vegan Ramen",
      "Modern",
      "Downtown"
    ]
  },
  "honke-daiichi-asahi": {
    "id": "honke-daiichi-asahi",
    "name": "Honke Daiichi Asahi (本家 第一旭)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.9856,
      "lon": 135.7602
    },
    "description": "Historic shop for classic Kyoto soy ramen.",
    "url": "https://www.honke-daiichiasahi.com/",
    "tags": [
      "Soy Ramen",
      "Breakfast",
      "Kyoto Station"
    ]
  },
  "yakiniku-hiro": {
    "id": "yakiniku-hiro",
    "name": "Yakiniku Hiro (京の焼肉処 弘)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.009,
      "lon": 135.77
    },
    "description": "High-quality Japanese wagyu BBQ.",
    "url": "https://yakiniku-hiro.com/english/",
    "tags": [
      "Wagyu",
      "BBQ",
      "Gion"
    ]
  },
  "yakiniku-kua": {
    "id": "yakiniku-kua",
    "name": "Yakiniku-Kua (焼肉 摠)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0033,
      "lon": 135.7758
    },
    "description": "Small atmospheric grilled meat specialist.",
    "url": "https://yakiniku-kua.com/",
    "tags": [
      "Grilled Meat",
      "Local",
      "Atmospheric"
    ]
  },
  "roan-kikunoi": {
    "id": "roan-kikunoi",
    "name": "Roan Kikunoi (露庵 菊乃井)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0033,
      "lon": 135.7709
    },
    "description": "Michelin-starred seasonal kaiseki cuisine.",
    "url": "https://kikunoi.jp/english/roan/",
    "tags": [
      "Kaiseki",
      "Michelin",
      "Traditional"
    ]
  },
  "gion-sushi-matsumoto": {
    "id": "gion-sushi-matsumoto",
    "name": "Gion Sushi Matsumoto (祇園 鮨 まつもと)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.002,
      "lon": 135.7766
    },
    "description": "Traditional Edomae sushi omakase.",
    "url": "https://sushimatsumoto.com/",
    "tags": [
      "Sushi",
      "Omakase",
      "High-end"
    ]
  },
  "sushi-tetsu": {
    "id": "sushi-tetsu",
    "name": "Sushi Tetsu (すしてつ)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.008,
      "lon": 135.77
    },
    "description": "Budget-friendly sushi in Pontocho.",
    "url": "http://www.sushitetsu.jp/",
    "tags": [
      "Affordable Sushi",
      "Pontocho",
      "Casual"
    ]
  },
  "gyoza-nakajima": {
    "id": "gyoza-nakajima",
    "name": "Gyoza Nakajima (ぎょうざ処 亮昌)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0016,
      "lon": 135.7577
    },
    "description": "Local Kyoto gyoza with seasonal ingredients.",
    "url": "https://www.nakajimagyoza.com/",
    "tags": [
      "Gyoza",
      "Local Ingredients",
      "Budget"
    ]
  },
  "chao-chao-gyoza": {
    "id": "chao-chao-gyoza",
    "name": "Chao Chao Gyoza (餃々)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0048,
      "lon": 135.7711
    },
    "description": "Award-winning thin-skin gyoza specialty shop.",
    "url": "https://www.gyozaya.com/english/",
    "tags": [
      "Gyoza",
      "Variety",
      "Casual"
    ]
  },
  "katsukura-tonkatsu": {
    "id": "katsukura-tonkatsu",
    "name": "Katsukura Tonkatsu Sanjo (名代とんかつ かかつくら)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0087,
      "lon": 135.767
    },
    "description": "Top-rated crispy tonkatsu restaurant.",
    "url": "https://www.katsukura.jp/en/",
    "tags": [
      "Tonkatsu",
      "Sanjo",
      "Specialty"
    ]
  },
  "gohan-ya-isshin": {
    "id": "gohan-ya-isshin",
    "name": "Gohan Ya Isshin (ごはんや一芯)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.008,
      "lon": 135.768
    },
    "description": "Stylish restaurant for traditional washoku sets.",
    "url": "https://isshin-kyoto.gorp.jp/",
    "tags": [
      "Washoku",
      "Lunch Sets",
      "Trendy"
    ]
  },
  "matcha-house": {
    "id": "matcha-house",
    "name": "Matcha House (抹茶館)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.0045,
      "lon": 135.769
    },
    "description": "Famous for its matcha tiramisu.",
    "url": "https://maccha-house.com/en/",
    "tags": [
      "Tiramisu",
      "Matcha",
      "Social Media Famous"
    ]
  },
  "kirukan-okamoto": {
    "id": "kirukan-okamoto",
    "name": "Kirukan Okamoto (空海山 岡本)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.013,
      "lon": 135.766
    },
    "description": "Izakaya specialising in Japanese fried chicken.",
    "url": "http://karaage-okamoto.com/",
    "tags": [
      "Karaage",
      "Japanese Fried Chicken",
      "Izakaya"
    ]
  },
  "nishiki-market-tips": {
    "id": "nishiki-market-tips",
    "name": "Nishiki Market (錦市場)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 35.005,
      "lon": 135.7649
    },
    "description": "Iconic retail market for local Kyoto specialities.",
    "url": "https://www.kyoto-nishiki.or.jp/",
    "tags": [
      "Street Food",
      "Market",
      "Traditional"
    ]
  },
  "camellia-tea-house": {
    "id": "camellia-tea-house",
    "name": "Camellia Tea House (茶道体験 カメリア)",
    "type": "matts Tips",
    "city": "Kyoto",
    "coordinates": {
      "lat": 34.9977,
      "lon": 135.7818
    },
    "description": "Cultural tea ceremony experience near Ninenzaka.",
    "url": "https://tea-kyoto.com/",
    "tags": [
      "Tea Ceremony",
      "Cultural",
      "Ninenzaka"
    ]
  },
  "tonkatsu-daiki": {
    "id": "tonkatsu-daiki",
    "name": "Tonkatsu Daiki (とんかつ 大喜)",
    "type": "matts Tips",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.671,
      "lon": 135.505
    },
    "description": "Popular local tonkatsu spot in Shinsaibashi.",
    "url": "https://tatsudaiki.com/",
    "tags": [
      "Tonkatsu",
      "Shinsaibashi",
      "Local Gem"
    ]
  },
  "osaka-wonder-cruise": {
    "id": "osaka-wonder-cruise",
    "name": "Osaka Wonder Cruise (大阪ワンダークルーズ)",
    "type": "sight",
    "city": "Osaka",
    "coordinates": {
      "lat": 34.6687,
      "lon": 135.5011
    },
    "description": "Scenic boat cruise along the Dotonbori canal and Osaka waterways.",
    "url": "https://www.wondercruise.jp/en/",
    "tags": [
      "Boat Tour",
      "River Views",
      "Dotonbori"
    ]
  },
  "m50-creative-park-shanghai": {
    "id": "m50-creative-park-shanghai",
    "name": "M50 Creative Park (M50创意园)",
    "type": "cesar Tips",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2475,
      "lon": 121.4475
    },
    "description": "Contemporary art district situated in former textile mills along the Suzhou Creek, housing over 100 artist studios and galleries.",
    "url": "http://www.m50.com.cn",
    "tags": [
      "Art",
      "Culture"
    ]
  },
  "xiaotaoyuan-shanghai": {
    "id": "xiaotaoyuan-shanghai",
    "name": "Xiaotaoyuan (小桃园)",
    "type": "cesar Tips",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2131,
      "lon": 121.4524
    },
    "description": "Specialist in traditional Shanghainese 'Four King Kong' breakfast items, including fried dough sticks, soy milk, and rice balls.",
    "tags": [
      "Breakfast",
      "Traditional"
    ]
  },
  "xiejia-courtyard-shanghai": {
    "id": "xiejia-courtyard-shanghai",
    "name": "Xiejia Courtyard (谢家大院)",
    "type": "cesar Tips",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.235521,
      "lon": 121.486512
    },
    "description": "Preserved late-Qing dynasty courtyard residence featuring traditional Jiangnan architecture, located near the Bund.",
    "tags": [
      "Historic Site",
      "Architecture"
    ]
  },
  "yangs-fried-dumpling-shanghai": {
    "id": "yangs-fried-dumpling-shanghai",
    "name": "Yang's Fried Dumpling (小杨生煎)",
    "type": "cesar Tips",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2395,
      "lon": 121.4825
    },
    "description": "Prominent chain specialising in shengjianbao (pan-fried buns) known for thin skins and substantial soup content.",
    "url": "https://www.google.com/maps/search/?api=1&query=Yang's+Fried+Dumpling+Shanghai",
    "tags": [
      "Dumplings",
      "Local Eats"
    ]
  },
  "savoy-kaminarimon-tokyo": {
    "id": "savoy-kaminarimon-tokyo",
    "name": "Savoy Kaminarimon (SAVOY雷門店)",
    "type": "cesar Tips",
    "city": "Tokyo",
    "coordinates": {
      "lat": 35.710755,
      "lon": 139.796552
    },
    "description": "Asakusa outpost of the acclaimed Neapolitan pizza specialist, featuring wood-fired ovens and a counter-seating format.",
    "url": "https://www.google.com/maps/search/?api=1&query=Savoy+Kaminarimon+Tokyo",
    "tags": [
      "Pizza",
      "Italian"
    ]
  },
  "dahuchun-shanghai": {
    "id": "dahuchun-shanghai",
    "name": "Dahuchun (大壶春)",
    "type": "cesar Tips",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2344,
      "lon": 121.4854
    },
    "description": "Time-honored brand established in 1932, serving traditional thick-skinned, yeast-leavened pan-fried pork buns.",
    "url": "https://www.google.com/maps/search/?api=1&query=Dahuchun+Shanghai",
    "tags": [
      "Chinese Restaurant",
      "Pan-fried Buns"
    ]
  },
  "quanjude-shanghai": {
    "id": "quanjude-shanghai",
    "name": "Quanjude (全聚德)",
    "type": "cesar Tips",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2347,
      "lon": 121.4746
    },
    "description": "Branch of the historic Beijing institution founded in 1864, renowned for authentic charcoal-roasted Peking Duck.",
    "tags": [
      "Peking Duck",
      "Historic"
    ]
  },
  "shen-shen-bakery-shanghai": {
    "id": "shen-shen-bakery-shanghai",
    "name": "Shen Shen Bakery (申申面包店)",
    "type": "cesar Tips",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2011,
      "lon": 121.4564
    },
    "description": "Local bakery specialising in retro-style Shanghainese pastries and fresh cream breads.",
    "tags": [
      "Bakery",
      "Pastries"
    ]
  },
  "long-time-ago-mutton-chuan-changli-rd-shanghai": {
    "id": "long-time-ago-mutton-chuan-changli-rd-shanghai",
    "name": "Long Time Ago Mutton Chuan (很久以前羊肉串)",
    "type": "cesar Tips",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.1734,
      "lon": 121.4914
    },
    "description": "Barbecue specialist featuring automated charcoal grills and mutton sourced from Inner Mongolia.",
    "url": "https://www.dianping.com/shop/G92045542",
    "tags": [
      "BBQ",
      "Late Night"
    ]
  },
  "long-time-ago-mutton-chuan-dapu-rd-shanghai": {
    "id": "long-time-ago-mutton-chuan-dapu-rd-shanghai",
    "name": "Long Time Ago Mutton Chuan (很久以前羊肉串)",
    "type": "cesar Tips",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.201521,
      "lon": 121.474512
    },
    "description": "Automated charcoal barbecue chain known for Inner Mongolian mutton skewers and immersive interior design.",
    "tags": [
      "Barbecue",
      "Chinese Cuisine"
    ]
  },
  "yuxing-ji-shanghai": {
    "id": "yuxing-ji-shanghai",
    "name": "Yuxing Ji (裕兴记)",
    "type": "cesar Tips",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2285,
      "lon": 121.4585
    },
    "description": "Suzhou-style noodle house specialising in high-end seasonal toppings, including crab fat and shrimp roe.",
    "tags": [
      "Noodles",
      "Suzhou Cuisine"
    ]
  },
  "yuxing-ji-noodle-restaurant-shanghai": {
    "id": "yuxing-ji-noodle-restaurant-shanghai",
    "name": "Yuxing Ji Noodle Restaurant (裕兴记面馆)",
    "type": "cesar Tips",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.234512,
      "lon": 121.479543
    },
    "description": "Renowned destination for authentic Suzhou 'Sanxia' noodles and traditional hand-stripped crab meat toppings.",
    "tags": [
      "Noodle Shop",
      "Suzhou Cuisine"
    ]
  },
  "lailai-snack-dumpling-shanghai": {
    "id": "lailai-snack-dumpling-shanghai",
    "name": "Lailai Snack Dumpling (莱莱小吃汤包馆)",
    "type": "cesar Tips",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2385,
      "lon": 121.4782
    },
    "description": "Bib Gourmand eatery specialising in premium crab-meat xiaolongbao and seasonal Shanghainese snacks.",
    "tags": [
      "Dumplings",
      "Local Eats"
    ]
  },
  "harmay-shanghai": {
    "id": "harmay-shanghai",
    "name": "Harmay (话梅)",
    "type": "cesar Tips",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2105,
      "lon": 121.4425
    },
    "description": "Industrial-aesthetic retail warehouse offering a curated selection of international beauty brands and samples.",
    "url": "https://www.harmay.com/",
    "tags": [
      "Cosmetics",
      "Retail"
    ]
  },
  "jia-jia-tang-bao-shanghai": {
    "id": "jia-jia-tang-bao-shanghai",
    "name": "Jia Jia Tang Bao (佳家汤包)",
    "type": "cesar Tips",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.234544,
      "lon": 121.471518
    },
    "description": "Celebrated xiaolongbao specialist known for thin-skinned soup dumplings made to order.",
    "tags": [
      "Soup Dumplings",
      "Local Favorite"
    ]
  },
  "yuyuan-public-market-shanghai": {
    "id": "yuyuan-public-market-shanghai",
    "name": "Yuyuan Public Market (愚园公共市集)",
    "type": "sight",
    "city": "Shanghai",
    "coordinates": {
      "lat": 31.2195,
      "lon": 121.4255
    },
    "description": "A revitalized community space featuring local food stalls, art galleries, and daily services in a historic neighborhood.",
    "tags": [
      "Market",
      "Community"
    ]
  }
};
