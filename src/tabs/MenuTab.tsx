import { useState } from 'react'
import { menuItems, type Category } from '../data/menu'
import { useApp } from '../context/AppContext'
import ItemCard from '../components/ItemCard'

type Filter = 'all' | Category

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'Classic', label: 'Classic' },
  { id: 'RAW', label: 'RAW' },
  { id: "Author's", label: "Author's" },
]

export default function MenuTab() {
  const [filter, setFilter] = useState<Filter>('all')
  const { addToCart, isDark, toggleTheme } = useApp()

  const visible = filter === 'all' ? menuItems : menuItems.filter(m => m.category === filter)

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div>
          <h1 className="text-white text-2xl font-black tracking-tight">MAGURO</h1>
          <p className="text-gray-500 text-xs">Sushi & Rolls</p>
        </div>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-pill-bg)' }}
        >
          {isDark ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
        {filters.map(f => {
          const active = filter === f.id
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
              style={{
                background: active ? 'var(--color-pill-active-bg)' : 'var(--color-pill-bg)',
                color: active ? 'var(--color-pill-active-text)' : 'var(--color-text-muted)',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 px-4">
        {visible.map(item => (
          <ItemCard key={item.id} item={item} onClick={() => addToCart(item.id)} />
        ))}
      </div>
    </div>
  )
}
