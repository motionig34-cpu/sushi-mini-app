import { useState, useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import { useApp } from '../context/AppContext'
import { menuItems, formatPrice } from '../data/menu'
import MapView from './MapView'
import PaymentSelector from './PaymentSelector'

interface Props {
  onClose: () => void
  onSuccess: () => void
}

type Step = 1 | 2 | 3

const DELIVERY_FEE = 250

export default function CheckoutSheet({ onClose, onSuccess }: Props) {
  const [step, setStep] = useState<Step>(1)

  const {
    deliveryMode, setDeliveryMode,
    address, setAddress,
    user, setUser,
    cart, cartTotal,
    chopsticks,
    deliveryTime, setDeliveryTime,
    comment, setComment,
    clearCart,
  } = useApp()

  const [localStreet,   setLocalStreet]   = useState(address.street)
  const [localApt,      setLocalApt]      = useState(address.apt)
  const [localEntrance, setLocalEntrance] = useState(address.entrance)
  const [localFloor,    setLocalFloor]    = useState(address.floor)
  const [localName,     setLocalName]     = useState(user.name)
  const [localPhone,    setLocalPhone]    = useState(user.phone)

  const fee   = deliveryMode === 'delivery' ? DELIVERY_FEE : 0
  const total = cartTotal + fee

  // Telegram back button
  useEffect(() => {
    if (step === 3) {
      try { WebApp.BackButton.hide() } catch { /* not in Telegram */ }
      return
    }
    const handleBack = () => {
      if (step === 1) { onClose() }
      else { setStep(1) }
    }
    try {
      WebApp.BackButton.show()
      WebApp.BackButton.onClick(handleBack)
    } catch { /* not in Telegram */ }
    return () => {
      try {
        WebApp.BackButton.offClick(handleBack)
        WebApp.BackButton.hide()
      } catch { /* not in Telegram */ }
    }
  }, [step, onClose])

  const goToStep2 = () => {
    setAddress({ street: localStreet, apt: localApt, entrance: localEntrance, floor: localFloor })
    setStep(2)
  }

  const placeOrder = () => {
    setUser({ name: localName, phone: localPhone })
    clearCart()
    setStep(3)
  }

  return (
    <div className="fixed top-0 bottom-0 z-50 flex flex-col bg-bg" style={{ left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430 }}>

      {/* ── Header (steps 1 & 2) ── */}
      {step < 3 && (
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border flex-shrink-0">
          <button
            onClick={() => step === 1 ? onClose() : setStep(1)}
            className="w-8 h-8 flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <h1 className="text-white font-black text-lg flex-1">
            {step === 1 ? 'Адрес доставки' : 'Оформление заказа'}
          </h1>

          {/* Step dots */}
          <div className="flex gap-1.5">
            {([1, 2] as const).map(s => (
              <div
                key={s}
                className="h-1 rounded-full transition-all duration-300"
                style={{ width: s <= step ? 24 : 14, background: s <= step ? '#fff' : '#333' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ══ STEP 1: Map + Address ══ */}
      {step === 1 && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mode toggle */}
          <div className="flex gap-2 px-4 py-3 flex-shrink-0">
            {(['delivery', 'pickup'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setDeliveryMode(mode)}
                className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors duration-200"
                style={{
                  background: deliveryMode === mode ? '#fff' : 'rgba(255,255,255,0.07)',
                  color: deliveryMode === mode ? '#000' : '#888',
                }}
              >
                {mode === 'delivery' ? 'Доставка' : 'Самовывоз'}
              </button>
            ))}
          </div>

          {/* Map (delivery only) */}
          {deliveryMode === 'delivery' && (
            <div className="flex-1 relative min-h-0" style={{ minHeight: 200 }}>
              <MapView height="100%" />
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[999] bg-black/80 backdrop-blur-sm text-white text-sm font-bold px-4 py-1.5 rounded-full pointer-events-none">
                ~60 мин.
              </div>
            </div>
          )}

          {/* Pickup: static address card — no map to avoid black screen */}
          {deliveryMode === 'pickup' && (
            <div className="flex-1 flex flex-col items-center justify-center px-4 gap-4">
              {/* Decorative map-like background */}
              <div
                className="w-full rounded-2xl overflow-hidden relative flex items-end"
                style={{ height: 220, background: '#1c2a1c' }}
              >
                <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={`${(i + 1) * 12.5}%`} x2="100%" y2={`${(i + 1) * 12.5}%`} stroke="#4ade80" strokeWidth="0.5" />
                  ))}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <line key={`v${i}`} x1={`${(i + 1) * 16.66}%`} y1="0" x2={`${(i + 1) * 16.66}%`} y2="100%" stroke="#4ade80" strokeWidth="0.5" />
                  ))}
                  <line x1="0" y1="45%" x2="100%" y2="45%" stroke="#4ade80" strokeWidth="2" />
                  <line x1="0" y1="65%" x2="100%" y2="65%" stroke="#4ade80" strokeWidth="1.5" />
                  <line x1="33%" y1="0" x2="33%" y2="100%" stroke="#4ade80" strokeWidth="2" />
                  <line x1="66%" y1="0" x2="66%" y2="100%" stroke="#4ade80" strokeWidth="1.5" />
                  <line x1="0" y1="80%" x2="50%" y2="20%" stroke="#4ade80" strokeWidth="1.5" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full bg-red-500 border-2 border-white shadow-lg shadow-red-500/50" />
                    <div className="w-0.5 h-3 bg-red-500" />
                  </div>
                </div>
                <div className="relative z-10 w-full bg-black/60 backdrop-blur-sm px-4 py-2.5">
                  <p className="text-white font-bold text-sm">Алматы, ул. Толстого, 107/1</p>
                  <p className="text-gray-400 text-xs mt-0.5">Пн–вс: 10:00–23:00</p>
                </div>
              </div>
            </div>
          )}

          {/* Address form */}
          <div className="bg-card rounded-t-2xl px-4 pt-4 pb-6 flex-shrink-0">
            {deliveryMode === 'delivery' ? (
              <>
                <input
                  type="text"
                  placeholder="Адрес доставки"
                  value={localStreet}
                  onChange={e => setLocalStreet(e.target.value)}
                  className="w-full bg-white/10 text-white placeholder-gray-600 text-sm px-4 py-3.5 rounded-xl mb-2"
                />
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { placeholder: 'Квартира', value: localApt,      set: setLocalApt      },
                    { placeholder: 'Подъезд',  value: localEntrance, set: setLocalEntrance },
                    { placeholder: 'Этаж',     value: localFloor,    set: setLocalFloor    },
                  ].map(field => (
                    <input
                      key={field.placeholder}
                      type="text"
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={e => field.set(e.target.value)}
                      className="bg-white/10 text-white placeholder-gray-600 text-sm px-3 py-3 rounded-xl text-center"
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 mb-4 p-3.5 bg-white/5 rounded-xl">
                <span className="text-2xl flex-shrink-0">📍</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">Алматы, ул. Толстого, 107/1</p>
                  <p className="text-gray-500 text-xs mt-0.5">10:00 – 23:00, ежедневно</p>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>
              </div>
            )}

            <button
              onClick={goToStep2}
              className="w-full bg-white text-black py-4 rounded-2xl font-black text-base active:scale-[0.98] transition-transform"
            >
              Продолжить →
            </button>
          </div>
        </div>
      )}

      {/* ══ STEP 2: Order details ══ */}
      {step === 2 && (
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-4 space-y-5">

            {/* Address display */}
            <div className="bg-white/5 rounded-2xl p-4">
              <p className="text-gray-500 text-xs mb-1">
                {deliveryMode === 'delivery' ? 'Адрес доставки' : 'Самовывоз'}
              </p>
              <p className="text-white font-bold text-sm">
                {deliveryMode === 'delivery'
                  ? (localStreet || 'Адрес не указан')
                  : 'Алматы, ул. Толстого, 107/1'}
              </p>
            </div>

            {/* Name */}
            <div>
              <p className="text-gray-400 text-xs mb-2">Ваше имя</p>
              <input
                type="text"
                placeholder="Как вас зовут?"
                value={localName}
                onChange={e => setLocalName(e.target.value)}
                className="w-full bg-white/5 border border-border text-white placeholder-gray-600 text-sm px-4 py-3.5 rounded-xl"
              />
            </div>

            {/* Phone */}
            <div>
              <p className="text-gray-400 text-xs mb-2">Номер телефона</p>
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={localPhone}
                onChange={e => setLocalPhone(e.target.value)}
                className="w-full bg-white/5 border border-border text-white placeholder-gray-600 text-sm px-4 py-3.5 rounded-xl"
              />
            </div>

            {/* Delivery time */}
            <div>
              <p className="text-gray-400 text-xs mb-2">Время доставки</p>
              <div className="flex gap-2">
                {([
                  { id: 'asap' as const,     label: 'В ближайшее время' },
                  { id: 'preorder' as const,  label: 'Предзаказ'        },
                ]).map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setDeliveryTime(opt.id)}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs transition-colors duration-200"
                    style={{
                      background: deliveryTime === opt.id ? '#fff' : 'rgba(255,255,255,0.07)',
                      color: deliveryTime === opt.id ? '#000' : '#888',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment */}
            <PaymentSelector />

            {/* Comment */}
            <div>
              <p className="text-gray-400 text-xs mb-2">Комментарий к заказу</p>
              <textarea
                placeholder="Пожелания к заказу..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={3}
                className="w-full bg-white/5 border border-border text-white placeholder-gray-600 text-sm px-4 py-3.5 rounded-xl resize-none"
              />
            </div>

            {/* Order summary */}
            <div className="bg-white/5 rounded-2xl p-4">
              <h3 className="text-white font-bold text-sm mb-3">Состав заказа</h3>
              {cart.map(entry => {
                const item = menuItems.find(m => m.id === entry.itemId)
                if (!item) return null
                return (
                  <div key={entry.itemId} className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400 truncate flex-1 pr-2">{item.name} × {entry.quantity}</span>
                    <span className="text-white font-bold flex-shrink-0">{formatPrice(item.price * entry.quantity)}</span>
                  </div>
                )
              })}
              {chopsticks > 0 && (
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Палочки × {chopsticks}</span>
                  <span className="text-gray-500">бесплатно</span>
                </div>
              )}
              <div className="border-t border-border my-3" />
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-400">Товары</span>
                <span className="text-white">{formatPrice(cartTotal)}</span>
              </div>
              {deliveryMode === 'delivery' && (
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-400">Доставка</span>
                  <span className="text-white">{formatPrice(DELIVERY_FEE)}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-base mt-3">
                <span className="text-white">Итого</span>
                <span className="text-white">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Place order */}
            <button
              onClick={placeOrder}
              className="w-full bg-white text-black py-4 rounded-2xl font-black text-base active:scale-[0.98] transition-transform"
            >
              Заказать
            </button>

            <div className="h-2" />
          </div>
        </div>
      )}

      {/* ══ STEP 3: Success ══ */}
      {step === 3 && (
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div
            className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-6 checkmark-appear"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="text-white text-3xl font-black mb-3">Заказ принят!</h1>
          <p className="text-gray-400 text-base leading-relaxed mb-10">
            Мы свяжемся с вами в ближайшее время
          </p>

          <button
            onClick={onSuccess}
            className="w-full bg-white text-black py-4 rounded-2xl font-black text-base active:scale-[0.98] transition-transform"
          >
            Вернуться в меню
          </button>
        </div>
      )}
    </div>
  )
}
