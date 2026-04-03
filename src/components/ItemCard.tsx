import type { MenuItem } from '../data/menu'
import { formatPrice, getCategoryGradient, getCategoryEmoji } from '../data/menu'
import { useApp } from '../context/AppContext'

interface Props {
  item: MenuItem
  onClick: () => void
}

export default function ItemCard({ item, onClick }: Props) {
  const { isFavorite } = useApp()
  const fav = isFavorite(item.id)

  return (
    <div
      onClick={onClick}
      className="bg-card rounded-2xl overflow-hidden cursor-pointer active:scale-95 transition-transform duration-100"
    >
      {/* Image area */}
      <div
        className="relative w-full h-32 flex items-center justify-center overflow-hidden"
        style={{ background: getCategoryGradient(item.category) }}
      >
        {item.image
          ? <img src={`/images/${item.image}`} alt={item.name} className="w-full h-full object-cover" />
          : <span className="text-5xl select-none">{getCategoryEmoji(item.category)}</span>
        }

        {item.badge && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded leading-tight max-w-[70px]">
            {item.badge}
          </div>
        )}

        {fav && (
          <div className="absolute top-2 right-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-white font-bold text-sm leading-tight mb-0.5 line-clamp-2">
          {item.name}
        </p>
        {item.count !== null && (
          <p className="text-gray-500 text-xs mb-1">{item.count} шт</p>
        )}
        <p className="text-gray-500 text-xs leading-tight line-clamp-2 mb-3">
          {item.ingredients}
        </p>

        <button
          className="w-full bg-white text-black text-xs font-black py-2 rounded-xl active:scale-95 transition-transform"
          onClick={e => { e.stopPropagation(); onClick() }}
        >
          от {formatPrice(item.price)}
        </button>
      </div>
    </div>
  )
}
