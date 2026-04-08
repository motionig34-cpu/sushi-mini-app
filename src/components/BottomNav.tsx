import type { Tab } from '../App'
import { useApp } from '../context/AppContext'

interface Props {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const tabs: { id: Tab; label: string; icon: (active: boolean) => JSX.Element }[] = [
  {
    id: 'menu',
    label: 'Меню',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#666'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18M3 12h18M3 18h18" />
      </svg>
    ),
  },
  {
    id: 'favorites',
    label: 'Избранное',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#ef4444' : 'none'} stroke={active ? '#ef4444' : '#666'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    id: 'cart',
    label: 'Корзина',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#666'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'О нас',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#666'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
]

export default function BottomNav({ activeTab, onTabChange }: Props) {
  const { cartCount } = useApp()

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border z-30"
      style={{ height: 64, paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex h-full">
        {tabs.map((tab) => {
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 relative"
              onClick={() => onTabChange(tab.id)}
            >
              <div className="relative">
                {tab.icon(active)}
                {tab.id === 'cart' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center leading-none">
                    {cartCount > 99 ? '99' : cartCount}
                  </span>
                )}
              </div>
              <span
                className="text-[10px] font-semibold"
                style={{ color: active ? 'var(--color-text)' : 'var(--color-text-muted)' }}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
