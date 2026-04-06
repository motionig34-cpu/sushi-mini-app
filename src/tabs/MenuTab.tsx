import { useState } from 'react'
import { menuItems } from '../data/menu'
import type { MenuItem, Category } from '../data/menu'
import ItemCard from '../components/ItemCard'
import ItemDetailSheet from '../components/ItemDetailSheet'
import { useApp } from '../context/AppContext'

type FilterCategory = 'Все' | Category

const CATEGORIES: FilterCategory[] = ['Все', 'Classic', 'RAW', "Author's"]

export default function MenuTab() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('Все')
  const { isDark, toggleTheme } = useApp()

  const filtered = activeCategory === 'Все'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory)

  const iconColor = isDark ? 'white' : '#0D0D0D'

  return (
    <div className="min-h-screen bg-bg">
      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-20 bg-bg px-4 pt-5 pb-3">
        {/* Top row: city | MAGURO | theme toggle */}
        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center gap-1 text-gray-500 text-xs font-semibold">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Алматы ▾
          </button>

          <h1 className="text-white text-xl font-black tracking-[0.2em]">MAGURO</h1>

          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center transition-transform active:scale-90"
            aria-label="Toggle theme"
          >
            {isDark ? (
              /* Sun icon */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              /* Moon icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-colors duration-200"
              style={{
                background: activeCategory === cat ? 'var(--color-pill-active-bg)' : 'var(--color-pill-bg)',
                color: activeCategory === cat ? 'var(--color-pill-active-text)' : 'var(--color-text-muted)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Product grid ── */}
      <div className="grid grid-cols-2 gap-3 px-4 pt-3 pb-6">
        {filtered.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            onClick={() => setSelectedItem(item)}
          />
        ))}
      </div>

      {/* ── Item detail bottom sheet ── */}
      {selectedItem && (
        <ItemDetailSheet
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}
