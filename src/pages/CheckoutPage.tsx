import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WebApp from '@twa-dev/sdk'
import { formatPrice } from '../data/menu'
import { useApp } from '../context/AppContext'
import { useCartStore } from '../stores/cartStore'
import Map2Gis from '../components/Map2Gis'

const DELIVERY_FEE = 990
const FREE_DELIVERY_THRESHOLD = 5000

type PaymentMethod = 'cash' | 'kaspi'

const PAYMENT_METHODS: { id: PaymentMethod; icon: string; label: string; desc: string }[] = [
  { id: 'cash',  icon: '💵', label: 'Наличными',  desc: 'Оплата при получении' },
  { id: 'kaspi', icon: '📱', label: 'Kaspi QR',   desc: 'Сканируйте QR при получении' },
]

export default function CheckoutPage() {
  const navigate = useNavigate()
  const {
    isDark,
    deliveryMode, setDeliveryMode,
    address, setAddress,
    user, setUser,
    comment, setComment,
  } = useApp()

  const items = useCartStore(s => s.items)
  const subtotal = useCartStore(s => s.totalPrice())
  const clearCart = useCartStore(s => s.clearCart)

  const [localStreet, setLocalStreet] = useState(address.street)
  const [localApt, setLocalApt] = useState(address.apt)
  const [localEntrance, setLocalEntrance] = useState(address.entrance)
  const [localFloor, setLocalFloor] = useState(address.floor)
  const [localName, setLocalName] = useState(user.name)
  const [localPhone, setLocalPhone] = useState(user.phone)
  const [localComment, setLocalComment] = useState(comment)
  const [payment, setPayment] = useState<PaymentMethod>('cash')
  const [success, setSuccess] = useState(false)

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee

  const placeOrder = () => {
    setAddress({ street: localStreet, apt: localApt, entrance: localEntrance, floor: localFloor })
    setUser({ name: localName, phone: localPhone })
    setComment(localComment)

    const orderData = {
      items: items.map(({ menuItem, quantity }) => ({
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity,
        lineTotal: menuItem.price * quantity,
      })),
      deliveryMode,
      address: deliveryMode === 'delivery'
        ? [localStreet, localApt && `кв. ${localApt}`, localEntrance && `подъезд ${localEntrance}`, localFloor && `этаж ${localFloor}`]
            .filter(Boolean).join(', ')
        : 'Самовывоз — Алматы, ул. Толстого, 107/1',
      phone: localPhone,
      name: localName,
      payment,
      comment: localComment,
      subtotal,
      deliveryFee,
      total,
    }

    try {
      WebApp.sendData(JSON.stringify(orderData))
    } catch {
      // Not running inside Telegram
    }

    clearCart()
    setSuccess(true)
  }

  if (success) {
    return (
      <div className={`min-h-screen bg-bg flex flex-col items-center justify-center px-8 text-center${isDark ? '' : ' light'}`}>
        <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-6 checkmark-appear">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-white text-3xl font-black mb-3">Заказ принят!</h1>
        <p className="text-gray-400 text-base leading-relaxed mb-10">
          Мы свяжемся с вами в ближайшее время
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-white text-black py-4 rounded-2xl font-black text-base active:scale-[0.98] transition-transform"
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
        <h1 className="text-white text-xl font-black">Оформление заказа</h1>
      </div>

      <div className="px-4 space-y-4 pb-10">
        {/* Delivery / Pickup toggle */}
        <div className="flex gap-2">
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

        {/* 2GIS map (delivery mode only) */}
        {deliveryMode === 'delivery' && (
          <Map2Gis height={200} />
        )}

        {/* Pickup address card */}
        {deliveryMode === 'pickup' && (
          <div className="bg-card rounded-2xl p-4 flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <p className="text-white font-bold text-sm">Алматы, ул. Толстого, 107/1</p>
              <p className="text-gray-500 text-xs mt-0.5">Пн–вс: 10:00–23:00</p>
            </div>
          </div>
        )}

        {/* Address fields (delivery only) */}
        {deliveryMode === 'delivery' && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Улица и дом"
              value={localStreet}
              onChange={e => setLocalStreet(e.target.value)}
              className="w-full bg-card text-white placeholder-gray-600 text-sm px-4 py-3.5 rounded-xl border border-border"
            />
            <div className="grid grid-cols-3 gap-2">
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
                  className="bg-card text-white placeholder-gray-600 text-sm px-3 py-3 rounded-xl text-center border border-border"
                />
              ))}
            </div>
          </div>
        )}

        {/* Name */}
        <div>
          <p className="text-gray-400 text-xs mb-1.5">Ваше имя</p>
          <input
            type="text"
            placeholder="Как вас зовут?"
            value={localName}
            onChange={e => setLocalName(e.target.value)}
            className="w-full bg-card text-white placeholder-gray-600 text-sm px-4 py-3.5 rounded-xl border border-border"
          />
        </div>

        {/* Phone */}
        <div>
          <p className="text-gray-400 text-xs mb-1.5">Номер телефона</p>
          <input
            type="tel"
            placeholder="+7 (___) ___-__-__"
            value={localPhone}
            onChange={e => setLocalPhone(e.target.value)}
            className="w-full bg-card text-white placeholder-gray-600 text-sm px-4 py-3.5 rounded-xl border border-border"
          />
        </div>

        {/* Payment method */}
        <div>
          <p className="text-gray-400 text-xs mb-1.5">Способ оплаты</p>
          <div className="flex gap-2">
            {PAYMENT_METHODS.map(m => (
              <button
                key={m.id}
                onClick={() => setPayment(m.id)}
                className="flex-1 flex items-center gap-2 p-3 rounded-xl border transition-colors duration-200"
                style={{
                  background: payment === m.id ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                  borderColor: payment === m.id ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.08)',
                }}
              >
                <span className="text-xl">{m.icon}</span>
                <div className="text-left">
                  <p className="text-white font-bold text-xs">{m.label}</p>
                  <p className="text-gray-500 text-[10px]">{m.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <p className="text-gray-400 text-xs mb-1.5">Комментарий</p>
          <textarea
            placeholder="Пожелания к заказу..."
            value={localComment}
            onChange={e => setLocalComment(e.target.value)}
            rows={3}
            className="w-full bg-card text-white placeholder-gray-600 text-sm px-4 py-3.5 rounded-xl border border-border resize-none"
          />
        </div>

        {/* Order summary (read-only) */}
        <div className="bg-card rounded-2xl p-4">
          <h3 className="text-white font-bold text-sm mb-3">Состав заказа</h3>
          {items.map(({ menuItem, quantity }) => (
            <div key={menuItem.id} className="flex justify-between text-sm mb-2">
              <span className="text-gray-400 truncate flex-1 pr-2">
                {menuItem.name} × {quantity}
              </span>
              <span className="text-white font-bold flex-shrink-0">
                {formatPrice(menuItem.price * quantity)}
              </span>
            </div>
          ))}
          <div className="border-t border-border my-3" />
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-gray-400">Товары</span>
            <span className="text-white">{formatPrice(subtotal)}</span>
          </div>
          {deliveryMode === 'delivery' && (
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-400">Доставка</span>
              {deliveryFee === 0 ? (
                <span className="text-green-400 font-bold text-xs">Бесплатно</span>
              ) : (
                <span className="text-white">{formatPrice(deliveryFee)}</span>
              )}
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
          Заказать — {formatPrice(total)}
        </button>
      </div>
    </div>
  )
}
