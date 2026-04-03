import { useState } from 'react'
import type { MenuItem } from '../data/menu'
import { formatPrice, getCategoryGradient, getCategoryEmoji } from '../data/menu'
import { useApp } from '../context/AppContext'

interface Props {
  item: MenuItem
  onClose: () => void
}

export default function ItemDetailSheet({ item, onClose }: Props) {
  const { addToCart, toggleFavorite, isFavorite } = useApp()
  const [added, setAdded] = useState(false)
  const [heartAnimating, setHeartAnimating] = useState(false)
  const fav = isFavorite(item.id)

  const handleAddToCart = () => {
    addToCart(item.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 600)
  }

  const handleFavorite = () => {
    toggleFavorite(item.id)
    setHeartAnimating(true)
    setTimeout(() => setHeartAnimating(false), 350)
  }

  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} />

      <div className="bottom-sheet flex flex-col" style={{ maxHeight: '88vh' }}>
        {/* Drag handle */}
        <div className="flex justify-center pt-2 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-white/20 rounded-full" />
        </div>

        {/* Image area */}
        <div
          className="relative w-full flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{ height: 200, background: getCategoryGradient(item.category) }}
        >
          {item.image
            ? <img src={`/images/${item.image}`} alt={item.name} className="w-full h-full object-cover" />
            : <span className="text-8xl select-none">{getCategoryEmoji(item.category)}</span>
          }

          {item.badge && (
            <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded leading-tight">
              {item.badge}
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-14 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Heart button */}
          <button
            onClick={handleFavorite}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center"
          >
            <svg
              width="16" height="16" viewBox="0 0 24 24"
              fill={fav ? '#ef4444' : 'none'}
              stroke={fav ? '#ef4444' : 'white'}
              strokeWidth="2"
              className={heartAnimating ? 'heart-pop' : ''}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex items-start gap-2 mb-2">
            <h2 className="text-white text-xl font-black flex-1 leading-tight">{item.name}</h2>
            <span className="text-gray-500 text-xs bg-white/10 px-2.5 py-1 rounded-full flex-shrink-0 mt-0.5">
              {item.category}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-gray-400 text-sm">{item.weight}</span>
            {item.count !== null && (
              <span className="text-gray-400 text-sm">{item.count} шт</span>
            )}
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.ingredients}</p>

          <p className="text-2xl font-black text-white">{formatPrice(item.price)}</p>
        </div>

        {/* CTA */}
        <div className="px-4 pb-6 pt-2 flex-shrink-0">
          <button
            onClick={handleAddToCart}
            className="w-full py-4 rounded-2xl font-black text-base transition-colors duration-300"
            style={{ background: added ? '#22c55e' : '#ffffff', color: added ? '#fff' : '#000' }}
          >
            {added ? '✓ Добавлено в корзину!' : 'В корзину'}
          </button>
        </div>
      </div>
    </>
  )
}
