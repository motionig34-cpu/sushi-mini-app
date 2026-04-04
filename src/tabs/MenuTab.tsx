import { useState } from 'react'
import { menuItems } from '../data/menu'
import type { MenuItem, Category } from '../data/menu'
import ItemCard from '../components/ItemCard'
import ItemDetailSheet from '../components/ItemDetailSheet'

type FilterCategory = 'Все' | Category

const CATEGORIES: FilterCategory[] = ['Все', 'Classic', 'RAW', "Author's"]

export default function MenuTab() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('Все')
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery')

  const filtered = activeCategory === 'Все'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-bg">
      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-20 bg-bg px-4 pt-5 pb-3">
        {/* Top row: city | MAGURO | search */}
        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center gap-1 text-gray-500 text-xs font-semibold">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Алматы ▾
          </button>

          <h1 className="text-white text-xl font-black tracking-[0.2em]">MAGURO</h1>

          <button className="w-8 h-8 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        {/* Delivery/Pickup toggle */}
        <div className="flex gap-2 mb-3">
          {(['delivery', 'pickup'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setDeliveryMode(mode)}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors duration-200"
              style={{
                background: deliveryMode === mode ? '#fff' : 'rgba(255,255,255,0.07)',
                color: deliveryMode === mode ? '#000' : '#666',
              }}
            >
              {mode === 'delivery' ? 'Доставка' : 'Самовывоз'}
            </button>
          ))}
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-colors duration-200"
              style={{
                background: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.07)',
                color: activeCategory === cat ? '#000' : '#666',
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
