import { useApp } from '../context/AppContext'
import { formatPrice } from '../data/menu'

interface Props {
  onClose: () => void
  onSuccess: () => void
}

export default function CheckoutSheet({ onClose, onSuccess }: Props) {
  const {
    cartTotal, clearCart,
    deliveryMode, setDeliveryMode,
    address, setAddress,
    user, setUser,
    payment, setPayment,
    changeAmount, setChangeAmount,
    noChange, setNoChange,
    promoCode, setPromoCode,
    comment, setComment,
    deliveryTime, setDeliveryTime,
  } = useApp()

  function handleConfirm() {
    clearCart()
    onSuccess()
  }

  return (
    <>
      {/* Backdrop */}
      <div className="sheet-backdrop" onClick={onClose} />

      {/* Sheet */}
      <div className="bottom-sheet" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: 'var(--color-border)' }} />
        </div>

        <div className="px-4 pb-8">
          {/* Title + close */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white text-xl font-black">Оформление заказа</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'var(--color-pill-bg)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-white">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Delivery / pickup toggle */}
          <Section title="Способ получения">
            <div className="flex gap-2">
              {(['delivery', 'pickup'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setDeliveryMode(mode)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors"
                  style={{
                    background: deliveryMode === mode ? 'var(--color-pill-active-bg)' : 'var(--color-pill-bg)',
                    color: deliveryMode === mode ? 'var(--color-pill-active-text)' : 'var(--color-text-muted)',
                  }}
                >
                  {mode === 'delivery' ? '🛵 Доставка' : '🏠 Самовывоз'}
                </button>
              ))}
            </div>
          </Section>

          {/* Address (delivery only) */}
          {deliveryMode === 'delivery' && (
            <Section title="Адрес доставки">
              <TextInput
                placeholder="Улица и дом"
                value={address.street}
                onChange={v => setAddress({ ...address, street: v })}
              />
              <div className="grid grid-cols-3 gap-2 mt-2">
                <TextInput placeholder="Кв." value={address.apt} onChange={v => setAddress({ ...address, apt: v })} />
                <TextInput placeholder="Подъезд" value={address.entrance} onChange={v => setAddress({ ...address, entrance: v })} />
                <TextInput placeholder="Этаж" value={address.floor} onChange={v => setAddress({ ...address, floor: v })} />
              </div>
            </Section>
          )}

          {/* User info */}
          <Section title="Ваши данные">
            <TextInput placeholder="Имя" value={user.name} onChange={v => setUser({ ...user, name: v })} />
            <div className="mt-2">
              <TextInput placeholder="Телефон" value={user.phone} onChange={v => setUser({ ...user, phone: v })} type="tel" />
            </div>
          </Section>

          {/* Delivery time */}
          <Section title="Время">
            <div className="flex gap-2">
              {(['asap', 'preorder'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setDeliveryTime(t)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                  style={{
                    background: deliveryTime === t ? 'var(--color-pill-active-bg)' : 'var(--color-pill-bg)',
                    color: deliveryTime === t ? 'var(--color-pill-active-text)' : 'var(--color-text-muted)',
                  }}
                >
                  {t === 'asap' ? '⚡ Как можно скорее' : '🕐 Предзаказ'}
                </button>
              ))}
            </div>
          </Section>

          {/* Payment */}
          <Section title="Оплата">
            <div className="flex gap-2">
              {(['cash', 'card', 'kaspi'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPayment(p)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold"
                  style={{
                    background: payment === p ? 'var(--color-pill-active-bg)' : 'var(--color-pill-bg)',
                    color: payment === p ? 'var(--color-pill-active-text)' : 'var(--color-text-muted)',
                  }}
                >
                  {p === 'cash' ? '💵 Наличные' : p === 'card' ? '💳 Картой' : '📱 Kaspi'}
                </button>
              ))}
            </div>

            {payment === 'cash' && (
              <div className="mt-3">
                <label className="flex items-center gap-2 mb-2 cursor-pointer">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center"
                    style={{ background: noChange ? 'var(--color-pill-active-bg)' : 'var(--color-pill-bg)' }}
                    onClick={() => setNoChange(!noChange)}
                  >
                    {noChange && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-pill-active-text)' }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-white text-sm">Без сдачи</span>
                </label>
                {!noChange && (
                  <TextInput
                    placeholder="Сдача с суммы (₸)"
                    value={changeAmount}
                    onChange={setChangeAmount}
                    type="number"
                  />
                )}
              </div>
            )}
          </Section>

          {/* Comment */}
          <Section title="Комментарий к заказу">
            <textarea
              className="w-full rounded-xl px-3 py-2.5 text-sm text-white resize-none"
              style={{ background: 'var(--color-pill-bg)', border: 'none', outline: 'none', minHeight: 72 }}
              placeholder="Дополнительные пожелания..."
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </Section>

          {/* Promo code */}
          <Section title="Промокод">
            <TextInput placeholder="Введите промокод" value={promoCode} onChange={setPromoCode} />
          </Section>

          {/* Total + confirm */}
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">Итого к оплате</span>
              <span className="text-white font-black text-xl">{formatPrice(cartTotal)}</span>
            </div>
            <button
              className="w-full bg-white text-black font-black py-4 rounded-2xl text-base active:scale-95 transition-transform"
              onClick={handleConfirm}
            >
              Подтвердить заказ
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="text-gray-500 text-xs font-semibold uppercase mb-2">{title}</p>
      {children}
    </div>
  )
}

function TextInput({
  placeholder, value, onChange, type = 'text',
}: {
  placeholder: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500"
      style={{ background: 'var(--color-pill-bg)', border: 'none', outline: 'none' }}
    />
  )
}
