import { useState } from 'react'
import { menuItems } from '../data/menu'
import type { MenuItem } from '../data/menu'
import ItemCard from '../components/ItemCard'
import ItemDetailSheet from '../components/ItemDetailSheet'
import { useApp } from '../context/AppContext'

export default function FavoritesTab() {
  const { favorites } = useApp()
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  const favoriteItems = menuItems.filter(item => favorites.includes(item.id))

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="px-4 pt-5 pb-4">
        <h1 className="text-white text-2xl font-black">Любимые</h1>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-5">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <p className="text-white font-bold text-base mb-2">Пока здесь пусто</p>
          <p className="text-gray-500 text-sm leading-relaxed">
            Здесь будут ваши любимые роллы.{'\n'}Нажмите ♥ на карточке, чтобы добавить.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4 pb-6">
          {favoriteItems.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      )}

      {selectedItem && (
        <ItemDetailSheet
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}
