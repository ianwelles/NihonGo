import { ShoppingCategory } from './types';

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