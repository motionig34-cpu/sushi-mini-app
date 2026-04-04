import { useState } from 'react'
import type { MenuItem } from '../data/menu'
import { formatPrice, getCategoryGradient, getCategoryEmoji } from '../data/menu'
import { useApp } from '../context/AppContext'

interface Props {
  item: MenuItem
  quantity: number
}

export default function CartItem({ item, quantity }: Props) {
  const { updateQuantity } = useApp()
  const [pressing, setPressing] = useState<'minus' | 'plus' | null>(null)

  const press = (type: 'minus' | 'plus') => {
    setPressing(type)
    setTimeout(() => setPressing(null), 150)
    updateQuantity(item.id, type === 'minus' ? quantity - 1 : quantity + 1)
  }

  return (
    <div className="flex items-center gap-3 py-3 border-b border-border last:border-0">
      {/* Image */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: getCategoryGradient(item.category) }}
      >
        <span className="text-2xl select-none">{getCategoryEmoji(item.category)}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white font-bold text-sm leading-tight mb-0.5 truncate">{item.name}</p>
        <p className="text-gray-500 text-xs">{formatPrice(item.price)}</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => press('minus')}
          className={`w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white text-lg font-bold transition-transform duration-100 ${pressing === 'minus' ? 'scale-90' : ''}`}
        >
          −
        </button>
        <span className="text-white font-bold text-sm w-4 text-center">{quantity}</span>
        <button
          onClick={() => press('plus')}
          className={`w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black text-lg font-bold transition-transform duration-100 ${pressing === 'plus' ? 'scale-90' : ''}`}
        >
          +
        </button>
      </div>
    </div>
  )
}
