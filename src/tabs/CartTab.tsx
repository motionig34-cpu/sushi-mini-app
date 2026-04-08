import { menuItems, formatPrice } from '../data/menu'
import { useApp } from '../context/AppContext'

interface Props {
  onCheckout: () => void
}

export default function CartTab({ onCheckout }: Props) {
  const { cart, updateQuantity, removeFromCart, cartTotal, chopsticks, setChopsticks } = useApp()

  const cartWithItems = cart.map(entry => ({
    entry,
    item: menuItems.find(m => m.id === entry.itemId),
  })).filter(x => x.item !== undefined)

  return (
    <div className="flex flex-col min-h-screen pb-4">
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-white text-2xl font-black tracking-tight">Корзина</h1>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-20 gap-3">
          <span className="text-5xl">🛒</span>
          <p className="text-gray-500 text-sm">Корзина пуста</p>
          <p className="text-gray-500 text-xs">Добавьте блюда из меню</p>
        </div>
      ) : (
        <>
          {/* Cart items */}
          <div className="flex flex-col gap-2 px-4">
            {cartWithItems.map(({ entry, item }) => (
              <div key={entry.itemId} className="bg-card rounded-2xl p-3 flex items-center gap-3">
                {/* Thumbnail */}
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 flex items-center justify-center" style={{ background: '#1a2035' }}>
                  {item!.image
                    ? <img src={`/images/${item!.image}`} alt={item!.name} className="w-full h-full object-cover" />
                    : <span className="text-2xl">🍣</span>
                  }
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-bold leading-tight line-clamp-2">{item!.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{formatPrice(item!.price)}</p>
                </div>

                {/* Qty controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: 'var(--color-pill-bg)' }}
                    onClick={() => entry.quantity === 1 ? removeFromCart(entry.itemId) : updateQuantity(entry.itemId, entry.quantity - 1)}
                  >
                    {entry.quantity === 1 ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                      </svg>
                    ) : '−'}
                  </button>
                  <span className="text-white font-bold text-sm w-4 text-center">{entry.quantity}</span>
                  <button
                    className="w-7 h-7 rounded-full flex items-center justify-center text-black font-bold bg-white text-lg"
                    onClick={() => updateQuantity(entry.itemId, entry.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Chopsticks */}
          <div className="mx-4 mt-3 bg-card rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-bold">Палочки</p>
              <p className="text-gray-500 text-xs">Количество наборов</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ background: 'var(--color-pill-bg)' }}
                onClick={() => setChopsticks(Math.max(0, chopsticks - 1))}
              >
                −
              </button>
              <span className="text-white font-bold text-base w-5 text-center">{chopsticks}</span>
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold bg-white text-lg"
                onClick={() => setChopsticks(Math.min(10, chopsticks + 1))}
              >
                +
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mx-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">Итого</span>
              <span className="text-white font-black text-lg">{formatPrice(cartTotal)}</span>
            </div>
            <button
              className="w-full bg-white text-black font-black py-4 rounded-2xl text-base active:scale-95 transition-transform"
              onClick={onCheckout}
            >
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  )
}
