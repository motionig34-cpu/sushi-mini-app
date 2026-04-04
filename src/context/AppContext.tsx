import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { menuItems } from '../data/menu'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface CartEntry {
  itemId: number
  quantity: number
}

export interface Address {
  street: string
  apt: string
  entrance: string
  floor: string
}

export interface UserInfo {
  name: string
  phone: string
}

export type PaymentMethod = 'cash' | 'card' | 'kaspi'
export type DeliveryMode = 'delivery' | 'pickup'

interface AppContextType {
  // Cart
  cart: CartEntry[]
  addToCart: (itemId: number) => void
  removeFromCart: (itemId: number) => void
  updateQuantity: (itemId: number, qty: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number

  // Favorites
  favorites: number[]
  toggleFavorite: (itemId: number) => void
  isFavorite: (itemId: number) => boolean

  // Chopsticks
  chopsticks: number
  setChopsticks: (n: number) => void

  // Delivery mode
  deliveryMode: DeliveryMode
  setDeliveryMode: (mode: DeliveryMode) => void

  // Address
  address: Address
  setAddress: (addr: Address) => void

  // User info
  user: UserInfo
  setUser: (u: UserInfo) => void

  // Payment
  payment: PaymentMethod
  setPayment: (p: PaymentMethod) => void

  // Cash change
  changeAmount: string
  setChangeAmount: (s: string) => void
  noChange: boolean
  setNoChange: (b: boolean) => void

  // Promo code
  promoCode: string
  setPromoCode: (s: string) => void

  // Order comment
  comment: string
  setComment: (s: string) => void

  // Delivery time
  deliveryTime: 'asap' | 'preorder'
  setDeliveryTime: (t: 'asap' | 'preorder') => void
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

// ── Context ────────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextType | null>(null)

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

// ── Provider ───────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Persisted state
  const [cart, setCart] = useState<CartEntry[]>(() => readLS('maguro_cart', []))
  const [favorites, setFavorites] = useState<number[]>(() => readLS('maguro_favorites', []))
  const [address, setAddressState] = useState<Address>(() =>
    readLS('maguro_address', { street: '', apt: '', entrance: '', floor: '' })
  )
  const [user, setUserState] = useState<UserInfo>(() =>
    readLS('maguro_user', { name: '', phone: '' })
  )
  const [payment, setPaymentState] = useState<PaymentMethod>(() =>
    readLS('maguro_payment', 'cash')
  )

  // Session-only state
  const [chopsticks, setChopsticks] = useState(0)
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('delivery')
  const [changeAmount, setChangeAmount] = useState('')
  const [noChange, setNoChange] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [comment, setComment] = useState('')
  const [deliveryTime, setDeliveryTime] = useState<'asap' | 'preorder'>('asap')

  // Sync persisted state to localStorage
  useEffect(() => { localStorage.setItem('maguro_cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('maguro_favorites', JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { localStorage.setItem('maguro_address', JSON.stringify(address)) }, [address])
  useEffect(() => { localStorage.setItem('maguro_user', JSON.stringify(user)) }, [user])
  useEffect(() => { localStorage.setItem('maguro_payment', JSON.stringify(payment)) }, [payment])

  // Cart actions
  const addToCart = useCallback((itemId: number) => {
    setCart(prev => {
      const existing = prev.find(e => e.itemId === itemId)
      if (existing) {
        return prev.map(e => e.itemId === itemId ? { ...e, quantity: e.quantity + 1 } : e)
      }
      return [...prev, { itemId, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((itemId: number) => {
    setCart(prev => prev.filter(e => e.itemId !== itemId))
  }, [])

  const updateQuantity = useCallback((itemId: number, qty: number) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(e => e.itemId !== itemId))
      return
    }
    setCart(prev => prev.map(e => e.itemId === itemId ? { ...e, quantity: qty } : e))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  // Favorite actions
  const toggleFavorite = useCallback((itemId: number) => {
    setFavorites(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    )
  }, [])

  const isFavorite = useCallback((itemId: number) => favorites.includes(itemId), [favorites])

  // Derived values
  const cartTotal = cart.reduce((sum, e) => {
    const item = menuItems.find(m => m.id === e.itemId)
    return sum + (item ? item.price * e.quantity : 0)
  }, 0)

  const cartCount = cart.reduce((sum, e) => sum + e.quantity, 0)

  return (
    <AppContext.Provider
      value={{
        cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount,
        favorites, toggleFavorite, isFavorite,
        chopsticks, setChopsticks,
        deliveryMode, setDeliveryMode,
        address, setAddress: setAddressState,
        user, setUser: setUserState,
        payment, setPayment: setPaymentState,
        changeAmount, setChangeAmount,
        noChange, setNoChange,
        promoCode, setPromoCode,
        comment, setComment,
        deliveryTime, setDeliveryTime,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
