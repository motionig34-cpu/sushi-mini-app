import { useState } from 'react'
import { useApp } from '../context/AppContext'
import type { PaymentMethod } from '../context/AppContext'

const METHODS: { id: PaymentMethod; icon: string; label: string; desc: string }[] = [
  { id: 'cash',  icon: '💵', label: 'Наличными',           desc: 'Оплата при получении'        },
  { id: 'card',  icon: '💳', label: 'Картой при получении', desc: 'Банковская карта'             },
  { id: 'kaspi', icon: '📱', label: 'Kaspi QR',             desc: 'Сканируйте QR при получении' },
]

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#666" strokeWidth="2" strokeLinecap="round"
      style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export default function PaymentSelector() {
  const { payment, setPayment, changeAmount, setChangeAmount, noChange, setNoChange } = useApp()
  const [open, setOpen] = useState(false)

  const current = METHODS.find(m => m.id === payment)!

  return (
    <div>
      <p className="text-gray-400 text-xs mb-2">Способ оплаты</p>
      <div className="bg-white/5 rounded-2xl overflow-hidden">
        {/* Selected — always visible */}
        <button
          onClick={() => setOpen(v => !v)}
          className="w-full flex items-center gap-3 p-4"
        >
          <span className="text-2xl">{current.icon}</span>
          <div className="flex-1 text-left">
            <p className="text-white font-bold text-sm">{current.label}</p>
            <p className="text-gray-500 text-xs">{current.desc}</p>
          </div>
          <ChevronIcon open={open} />
        </button>

        {/* Options dropdown */}
        {open && (
          <div className="border-t border-border">
            {METHODS.map(method => (
              <button
                key={method.id}
                onClick={() => { setPayment(method.id); setOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 ${payment === method.id ? 'bg-white/10' : ''}`}
              >
                <span className="text-xl">{method.icon}</span>
                <div className="flex-1 text-left">
                  <p className={`font-bold text-sm ${payment === method.id ? 'text-white' : 'text-gray-300'}`}>
                    {method.label}
                  </p>
                  <p className="text-gray-600 text-xs">{method.desc}</p>
                </div>
                {payment === method.id && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Cash extras */}
        {payment === 'cash' && (
          <div className="px-4 pb-4 space-y-3 border-t border-border">
            {!noChange && (
              <div className="flex items-center gap-2 pt-3">
                <input
                  type="number"
                  placeholder="Сдача с..."
                  value={changeAmount}
                  onChange={e => setChangeAmount(e.target.value)}
                  className="flex-1 bg-white/10 text-white placeholder-gray-600 text-sm px-3 py-2.5 rounded-xl"
                />
                <span className="text-gray-400 text-sm font-bold">₸</span>
              </div>
            )}
            <button
              onClick={() => setNoChange(!noChange)}
              className="flex items-center gap-2"
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${noChange ? 'bg-white border-white' : 'border-gray-600'}`}>
                {noChange && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="text-gray-300 text-sm">Сдача не нужна</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
