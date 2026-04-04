import type { Tab } from '../App'
import { useApp } from '../context/AppContext'

interface Props {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

function MenuIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#fff' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function HeartIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24"
      fill={active ? '#fff' : 'none'}
      stroke={active ? '#fff' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function CartIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#fff' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function InfoIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#fff' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2.5" />
    </svg>
  )
}

const TABS: { id: Tab; label: string }[] = [
  { id: 'menu',      label: 'Меню'     },
  { id: 'favorites', label: 'Любимые'  },
  { id: 'cart',      label: 'Корзина'  },
  { id: 'about',     label: 'О нас'    },
]

export default function BottomNav({ activeTab, onTabChange }: Props) {
  const { cartCount } = useApp()

  const renderIcon = (id: Tab, active: boolean) => {
    switch (id) {
      case 'menu':      return <MenuIcon active={active} />
      case 'favorites': return <HeartIcon active={active} />
      case 'cart':      return <CartIcon active={active} />
      case 'about':     return <InfoIcon active={active} />
    }
  }

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border z-30 flex"
      style={{ height: 70 }}
    >
      {TABS.map(tab => {
        const active = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex-1 flex flex-col items-center justify-center gap-1 relative"
          >
            <div className="relative">
              {renderIcon(tab.id, active)}
              {tab.id === 'cart' && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-black rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-bold ${active ? 'text-white' : 'text-gray-600'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
