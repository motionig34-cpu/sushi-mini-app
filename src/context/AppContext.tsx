import { createContext, useContext, useState, useCallback } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────

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
  // Theme
  isDark: boolean
  toggleTheme(): void

  // Favorites (in-memory)
  favorites: number[]
  toggleFavorite(itemId: number): void
  isFavorite(itemId: number): boolean

  // Chopsticks
  chopsticks: number
  setChopsticks(n: number): void

  // Delivery
  deliveryMode: DeliveryMode
  setDeliveryMode(mode: DeliveryMode): void
  address: Address
  setAddress(addr: Address): void

  // User
  user: UserInfo
  setUser(u: UserInfo): void

  // Payment
  payment: PaymentMethod
  setPayment(p: PaymentMethod): void

  // Comment
  comment: string
  setComment(s: string): void

  // Cash change
  changeAmount: string
  setChangeAmount(s: string): void
  noChange: boolean
  setNoChange(b: boolean): void

  // Promo
  promoCode: string
  setPromoCode(s: string): void

  // Delivery time
  deliveryTime: 'asap' | 'preorder'
  setDeliveryTime(t: 'asap' | 'preorder'): void
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
  // Detect initial theme from Telegram color scheme
  const tgColorScheme = (window as any).Telegram?.WebApp?.colorScheme
  const [isDark, setIsDark] = useState(tgColorScheme !== 'light')
  const toggleTheme = useCallback(() => setIsDark(prev => !prev), [])

  // Favorites — in memory only
  const [favorites, setFavorites] = useState<number[]>([])
  const toggleFavorite = useCallback((itemId: number) => {
    setFavorites(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    )
  }, [])
  const isFavorite = useCallback((itemId: number) => favorites.includes(itemId), [favorites])

  // Chopsticks
  const [chopsticks, setChopsticks] = useState(0)

  // Delivery
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('delivery')
  const [address, setAddress] = useState<Address>({ street: '', apt: '', entrance: '', floor: '' })

  // User — pre-fill name from Telegram if available
  const tgUser = (window as any).Telegram?.WebApp?.initDataUnsafe?.user
  const [user, setUser] = useState<UserInfo>({
    name: tgUser?.first_name ?? '',
    phone: '',
  })

  // Payment & extras
  const [payment, setPayment] = useState<PaymentMethod>('cash')
  const [comment, setComment] = useState('')
  const [changeAmount, setChangeAmount] = useState('')
  const [noChange, setNoChange] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [deliveryTime, setDeliveryTime] = useState<'asap' | 'preorder'>('asap')

  return (
    <AppContext.Provider
      value={{
        isDark, toggleTheme,
        favorites, toggleFavorite, isFavorite,
        chopsticks, setChopsticks,
        deliveryMode, setDeliveryMode,
        address, setAddress,
        user, setUser,
        payment, setPayment,
        comment, setComment,
        changeAmount, setChangeAmount,
        noChange, setNoChange,
        promoCode, setPromoCode,
        deliveryTime, setDeliveryTime,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
