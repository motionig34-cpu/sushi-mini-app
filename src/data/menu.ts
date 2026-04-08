export type Category = 'Classic' | 'RAW' | "Author's"

export interface MenuItem {
  id: number
  category: Category
  name: string
  ingredients: string
  weight: string
  count: number | null
  price: number
  badge?: string
  /** Filename of the photo in /public/images/, e.g. "salmon-roll.webp" */
  image?: string
}

export const menuItems: MenuItem[] = [
  { id: 1,  category: 'Classic',   name: 'Каппа макки',               ingredients: 'Рис, нори, огурец, кунжут',                   weight: '125 г', count: 8,    price: 990, image: "kappa.webp" },
  { id: 2,  category: 'Classic',   name: 'Кани макки',                ingredients: 'Краб, рис, нори',                              weight: '175 г', count: 8,    price: 1090, image: "kani.webp" },
  { id: 3,  category: 'RAW',       name: 'Нигири с лососем',           ingredients: 'Рис + норвежский лосось',                      weight: '30 г',  count: 1,    price: 990, image: "nigiri.webp" },
  { id: 4,  category: 'RAW',       name: 'Хэнд ролл краб',            ingredients: 'Краб, спайси соус',                            weight: '156 г', count: 2,    price: 1490, image: "handrollcrab.webp" },
  { id: 5,  category: 'Classic',   name: 'Унаги макки',               ingredients: 'Угорь, рис, нори',                             weight: '125 г', count: 8,    price: 1990, image: "unagi.webp" },
  { id: 6,  category: 'Classic',   name: 'Сяки макки',                ingredients: 'Рис, нори, лосось',                            weight: '125 г', count: 8,    price: 1990, image: "saki.webp" },
  { id: 7,  category: 'RAW',       name: 'Хэнд ролл креветка',        ingredients: 'Креветка, васаби соус',                        weight: '156 г', count: 2,    price: 2190, image: "handrollshrimp.webp" },
  { id: 8,  category: 'Classic',   name: 'Ролл Аляска',               ingredients: 'Лосось, сыр cremette, огурец',                 weight: '240 г', count: 8,    price: 2290, image: "alaska.webp" },
  { id: 9,  category: 'Classic',   name: 'Бонито макки',              ingredients: 'Жар. лосось, сыр, огурец, тунец',             weight: '200 г', count: 8,    price: 2390, image: "bonitomaki.webp" },
  { id: 10, category: 'Classic',   name: 'Калифорния с крабом',       ingredients: 'Краб, огурец, икра тобико',                    weight: '180 г', count: 8,    price: 2390, image: "calicrab.webp" },
  { id: 11, category: "Author's",  name: 'Унаги Райс ролл',           ingredients: 'Лосось, огурец, сыр, угорь, спайси',          weight: '210 г', count: 6,    price: 2490, image: "unagiriceroll.webp" },
  { id: 12, category: 'Classic',   name: 'Чука ролл',                 ingredients: 'Лосось, сыр cremette, водоросли чука',         weight: '230 г', count: 8,    price: 2790, image: "chukaroll.webp" },
  { id: 13, category: 'Classic',   name: 'Филадельфия лайт',          ingredients: 'Лосось, сыр cremette, огурец',                 weight: '260 г', count: 8,    price: 2790, badge: 'СТАЛО БОЛЬШЕ НАЧИНКИ', image: "phililite.webp" },
  { id: 14, category: 'RAW',       name: 'Хэнд ролл лосось',          ingredients: 'Лосось, цитрусовый соус',                      weight: '155 г', count: 2,    price: 2990, image: "handrollsalmon.webp" },
  { id: 15, category: 'Classic',   name: 'Филадельфия с креветкой',   ingredients: 'Креветка, сыр cremette, огурец',               weight: '230 г', count: 8,    price: 2990, badge: 'СТАЛО БОЛЬШЕ НАЧИНКИ', image: "philishrimp.webp" },
  { id: 16, category: 'Classic',   name: 'Калифорния с лососем',      ingredients: 'Лосось, тобико, сыр, огурец',                 weight: '255 г', count: 8,    price: 2990, image: "calisalmon.webp" },
  { id: 17, category: "Author's",  name: 'Ролл том ям',               ingredients: 'Лосось, тигровые креветки, том ям соус',       weight: '271 г', count: 6,    price: 3690,  image: "rolltom.webp" },
  { id: 18, category: 'Classic',   name: 'Шаурдельфия 360',           ingredients: 'Лосось, сыр креметте, рис, нори',             weight: '290 г', count: 1, price: 5390, image: "shaurma.webp" },
]

export const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0') + '\u00A0₸'
}

export const getCategoryGradient = (category: Category): string => {
  switch (category) {
    case 'Classic':   return 'linear-gradient(135deg, #1a2035 0%, #2d3a5e 100%)'
    case 'RAW':       return 'linear-gradient(135deg, #2d1b1b 0%, #4a2828 100%)'
    case "Author's":  return 'linear-gradient(135deg, #1a1535 0%, #2d1b4a 100%)'
  }
}

export const getCategoryEmoji = (category: Category): string => {
  switch (category) {
    case 'Classic':   return '🍣'
    case 'RAW':       return '🐟'
    case "Author's":  return '✨'
  }
}
