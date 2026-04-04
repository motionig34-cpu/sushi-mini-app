import { useState } from 'react'
import { menuItems, formatPrice } from '../data/menu'
import { useApp } from '../context/AppContext'
import CartItem from '../components/CartItem'
import UpsellRow from '../components/UpsellRow'

interface Props {
  onCheckout: () => void
}

export default function CartTab({ onCheckout }: Props) {
  const {
    cart, cartTotal,
    chopsticks, setChopsticks,
    deliveryMode,
    promoCode, setPromoCode,
  } = useApp()

  const [promoOpen, setPromoOpen] = useState(false)
  const [chopPress, setChopPress] = useState<'minus' | 'plus' | null>(null)

  const DELIVERY_FEE = deliveryMode === 'delivery' ? 250 : 0
  const total         = cartTotal + DELIVERY_FEE
  const cartItemCount = cart.reduce((s, e) => s + e.quantity, 0)

  const pressChop = (type: 'minus' | 'plus') => {
    setChopPress(type)
    setTimeout(() => setChopPress(null), 150)
    if (type === 'minus' && chopsticks > 0) setChopsticks(chopsticks - 1)
    if (type === 'plus') setChopsticks(chopsticks + 1)
  }

  // Empty state
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-8 text-center">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-5">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <p className="text-white font-bold text-base mb-2">Корзина пуста</p>
        <p className="text-gray-500 text-sm">Добавьте любимые роллы из меню</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-white text-2xl font-black">Корзина</h1>
      </div>

      <div className="px-4 space-y-3 pb-6">
        {/* Cart items */}
        <div className="bg-card rounded-2xl px-4">
          {cart.map(entry => {
            const item = menuItems.find(m => m.id === entry.itemId)
            if (!item) return null
            return <CartItem key={entry.itemId} item={item} quantity={entry.quantity} />
          })}
        </div>

        {/* Upsells */}
        <UpsellRow />

        {/* Chopsticks stepper */}
        <div className="bg-card rounded-2xl px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🥢</span>
            <div>
              <p className="text-white text-sm font-bold">Укажите количество палочек</p>
              <p className="text-gray-600 text-xs">Бесплатно</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => pressChop('minus')}
              className={`w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white text-lg font-bold transition-transform duration-100 ${chopPress === 'minus' ? 'scale-90' : ''}`}
            >
              −
            </button>
            <span className="text-white font-bold text-sm w-4 text-center">{chopsticks}</span>
            <button
              onClick={() => pressChop('plus')}
              className={`w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black text-lg font-bold transition-transform duration-100 ${chopPress === 'plus' ? 'scale-90' : ''}`}
            >
              +
            </button>
          </div>
        </div>

        {/* Promo code */}
        <div className="bg-card rounded-2xl overflow-hidden">
          <button
            onClick={() => setPromoOpen(v => !v)}
            className="w-full flex items-center gap-3 px-4 py-3.5"
          >
            <span className="text-lg">🏷️</span>
            <span className="text-white text-sm font-bold flex-1 text-left">Промокод</span>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#555" strokeWidth="2" strokeLinecap="round"
              style={{ transition: 'transform 0.2s', transform: promoOpen ? 'rotate(180deg)' : 'none' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {promoOpen && (
            <div className="px-4 pb-4 flex gap-2">
              <input
                type="text"
                placeholder="Введите промокод"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                className="flex-1 bg-white/10 text-white placeholder-gray-600 text-sm px-3 py-2.5 rounded-xl"
              />
              <button className="bg-white text-black text-sm font-black px-4 py-2.5 rounded-xl active:scale-95 transition-transform">
                OK
              </button>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="bg-card rounded-2xl p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Товары в заказе: {cartItemCount} шт.</span>
            <span className="text-white">{formatPrice(cartTotal)}</span>
          </div>
          {deliveryMode === 'delivery' && (
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Доставка</span>
              <span className="text-white">{formatPrice(DELIVERY_FEE)}</span>
            </div>
          )}
          <div className="border-t border-border my-2.5" />
          <div className="flex justify-between font-black text-base">
            <span className="text-white">Итого</span>
            <span className="text-white">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Checkout CTA */}
        <button
          onClick={onCheckout}
          className="w-full bg-white text-black py-4 rounded-2xl font-black text-base active:scale-[0.98] transition-transform"
        >
          Продолжить оформление
        </button>
      </div>
    </div>
  )
}
