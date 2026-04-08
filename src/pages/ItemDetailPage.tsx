import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { menuItems, formatPrice, getCategoryGradient, getCategoryEmoji } from '../data/menu'
import { useCartStore } from '../stores/cartStore'
import { useApp } from '../context/AppContext'

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const addItem = useCartStore(s => s.addItem)
  const { isDark } = useApp()

  const item = menuItems.find(m => m.id === Number(id))

  if (!item) {
    return (
      <div className={`min-h-screen bg-bg flex flex-col items-center justify-center${isDark ? '' : ' light'}`}>
        <p className="text-gray-400 mb-4">Блюдо не найдено</p>
        <button onClick={() => navigate('/')} className="text-white underline text-sm">
          В меню
        </button>
      </div>
    )
  }

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(item)
    }
    setAdded(true)
    setTimeout(() => navigate(-1), 800)
  }

  return (
    <div className={`min-h-screen bg-bg flex flex-col${isDark ? '' : ' light'}`}>
      {/* ── Hero image ── */}
      <div
        className="relative w-full flex-shrink-0"
        style={{ height: 320, background: getCategoryGradient(item.category) }}
      >
        {item.image ? (
          <img
            src={`/images/${item.image}`}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-8xl select-none">{getCategoryEmoji(item.category)}</span>
          </div>
        )}

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {item.badge && (
          <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded leading-tight">
            {item.badge}
          </div>
        )}
      </div>

      {/* ── Details ── */}
      <div className="flex-1 px-4 py-5">
        <div className="flex items-start gap-2 mb-2">
          <h1 className="text-white text-2xl font-black flex-1 leading-tight">{item.name}</h1>
          <span className="text-gray-500 text-xs bg-white/10 px-2.5 py-1 rounded-full flex-shrink-0 mt-1">
            {item.category}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-gray-400 text-sm">{item.weight}</span>
          {item.count !== null && (
            <span className="text-gray-400 text-sm">{item.count} шт</span>
          )}
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-6">{item.ingredients}</p>

        <p className="text-3xl font-black text-white">{formatPrice(item.price * quantity)}</p>
      </div>

      {/* ── Bottom: quantity + add to cart ── */}
      <div className="px-4 pb-8 pt-2 flex gap-3 flex-shrink-0">
        {/* Quantity stepper */}
        <div className="bg-card rounded-2xl flex items-center gap-3 px-4 flex-shrink-0">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-9 h-9 flex items-center justify-center text-white text-xl font-bold active:scale-90 transition-transform"
          >
            −
          </button>
          <span className="text-white font-black text-base w-6 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="w-9 h-9 flex items-center justify-center text-white text-xl font-bold active:scale-90 transition-transform"
          >
            +
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          className="flex-1 py-4 rounded-2xl font-black text-base transition-colors duration-300 active:scale-[0.98]"
          style={{
            background: added ? '#22c55e' : '#ffffff',
            color: added ? '#fff' : '#000',
          }}
        >
          {added ? '✓ Добавлено!' : 'В корзину'}
        </button>
      </div>
    </div>
  )
}
