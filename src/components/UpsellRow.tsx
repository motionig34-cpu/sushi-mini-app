import { menuItems, formatPrice, getCategoryGradient, getCategoryEmoji } from '../data/menu'
import { useApp } from '../context/AppContext'

export default function UpsellRow() {
  const { cart, addToCart } = useApp()
  const inCartIds = new Set(cart.map(e => e.itemId))

  const suggestions = menuItems.filter(item => !inCartIds.has(item.id)).slice(0, 5)
  if (suggestions.length === 0) return null

  return (
    <div>
      <p className="text-white font-bold text-sm mb-3">Дополни свой заказ</p>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
        {suggestions.map(item => (
          <div
            key={item.id}
            className="flex-shrink-0 w-28 bg-card rounded-xl overflow-hidden"
          >
            <div
              className="h-20 flex items-center justify-center"
              style={{ background: getCategoryGradient(item.category) }}
            >
              <span className="text-3xl select-none">{getCategoryEmoji(item.category)}</span>
            </div>
            <div className="p-2">
              <p className="text-white text-xs font-bold leading-tight line-clamp-2 mb-1">
                {item.name}
              </p>
              <p className="text-gray-400 text-[11px] mb-2">{formatPrice(item.price)}</p>
              <button
                onClick={() => addToCart(item.id)}
                className="w-full bg-white text-black text-xs font-black py-1.5 rounded-lg active:scale-95 transition-transform"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
