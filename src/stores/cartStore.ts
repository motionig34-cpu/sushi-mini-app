import { create } from 'zustand'
import type { MenuItem } from '../data/menu'

export interface CartItem {
  menuItem: MenuItem
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem(item: MenuItem): void
  removeItem(itemId: number): void
  updateQuantity(itemId: number, qty: number): void
  clearCart(): void
  totalItems(): number
  totalPrice(): number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem(item) {
    set(state => {
      const existing = state.items.find(i => i.menuItem.id === item.id)
      if (existing) {
        return {
          items: state.items.map(i =>
            i.menuItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return { items: [...state.items, { menuItem: item, quantity: 1 }] }
    })
  },

  removeItem(itemId) {
    set(state => ({ items: state.items.filter(i => i.menuItem.id !== itemId) }))
  },

  updateQuantity(itemId, qty) {
    if (qty <= 0) {
      get().removeItem(itemId)
      return
    }
    set(state => ({
      items: state.items.map(i =>
        i.menuItem.id === itemId ? { ...i, quantity: qty } : i
      ),
    }))
  },

  clearCart() {
    set({ items: [] })
  },

  totalItems() {
    return get().items.reduce((sum, i) => sum + i.quantity, 0)
  },

  totalPrice() {
    return get().items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0)
  },
}))
