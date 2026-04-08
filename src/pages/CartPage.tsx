import { useNavigate } from 'react-router-dom'
import { formatPrice, getCategoryGradient, getCategoryEmoji } from '../data/menu'
import { useCartStore } from '../stores/cartStore'
import { useApp } from '../context/AppContext'

const DELIVERY_FEE = 990
const FREE_DELIVERY_THRESHOLD = 5000

export default function CartPage() {
  const navigate = useNavigate()
  const { isDark } = useApp()
  const items = useCartStore(s => s.items)
  const updateQuantity = useCartStore(s => s.updateQuantity)
  const clearCart = useCartStore(s => s.clearCart)
  const subtotal = useCartStore(s => s.totalPrice())

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee

  if (items.length === 0) {
    return (
      <div className={`min-h-screen bg-bg flex flex-col items-center justify-center px-8 text-center${isDark ? '' : ' light'}`}>
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-5">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <p className="text-white font-bold text-base mb-2">Корзина пуста</p>
        <p className="text-gray-500 text-sm mb-6">Добавьте любимые роллы из меню</p>
        <button
          onClick={() => navigate('/')}
          className="text-gray-400 text-sm underline"
        >
          Вернуться в меню
        </button>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-bg${isDark ? '' : ' light'}`}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-5 pb-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-white text-2xl font-black flex-1">Корзина</h1>
        <button
          onClick={clearCart}
          className="text-gray-500 text-sm font-semibold"
        >
          Очистить
        </button>
      </div>

      <div className="px-4 space-y-3 pb-8">
        {/* Cart items */}
        <div className="bg-card rounded-2xl px-4">
          {items.map(({ menuItem, quantity }) => (
            <div key={menuItem.id} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
              {/* Thumbnail */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{ background: getCategoryGradient(menuItem.category) }}
              >
                {menuItem.image ? (
                  <img src={`/images/${menuItem.image}`} alt={menuItem.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl select-none">{getCategoryEmoji(menuItem.category)}</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight mb-0.5 truncate">{menuItem.name}</p>
                <p className="text-gray-500 text-xs">{formatPrice(menuItem.price)}</p>
              </div>

              {/* Quantity stepper */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => updateQuantity(menuItem.id, quantity - 1)}
                  className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white text-lg font-bold active:scale-90 transition-transform"
                >
                  −
                </button>
                <span className="text-white font-bold text-sm w-4 text-center">{quantity}</span>
                <button
                  onClick={() => updateQuantity(menuItem.id, quantity + 1)}
                  className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black text-lg font-bold active:scale-90 transition-transform"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-card rounded-2xl p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Сумма заказа</span>
            <span className="text-white">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Доставка</span>
            {deliveryFee === 0 ? (
              <span className="text-green-400 font-bold text-xs">Бесплатно</span>
            ) : (
              <span className="text-white">{formatPrice(deliveryFee)}</span>
            )}
          </div>
          {deliveryFee > 0 && (
            <p className="text-gray-600 text-xs mb-2">
              Бесплатная доставка от {formatPrice(FREE_DELIVERY_THRESHOLD)}
            </p>
          )}
          <div className="border-t border-border my-2.5" />
          <div className="flex justify-between font-black text-base">
            <span className="text-white">Итого</span>
            <span className="text-white">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Checkout CTA */}
        <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-white text-black py-4 rounded-2xl font-black text-base active:scale-[0.98] transition-transform"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  )
}
