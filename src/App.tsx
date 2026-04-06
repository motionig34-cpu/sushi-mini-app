import { useState, useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import { AppProvider, useApp } from './context/AppContext'
import BottomNav from './components/BottomNav'
import MenuTab from './tabs/MenuTab'
import FavoritesTab from './tabs/FavoritesTab'
import CartTab from './tabs/CartTab'
import AboutTab from './tabs/AboutTab'
import CheckoutSheet from './components/CheckoutSheet'

export type Tab = 'menu' | 'favorites' | 'cart' | 'about'

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('menu')
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const { isDark } = useApp()

  useEffect(() => {
    try {
      WebApp.ready()
      WebApp.expand()
    } catch {
      // Running outside Telegram — safe to ignore
    }
  }, [])

  return (
    <div className={`min-h-screen bg-bg${isDark ? '' : ' light'}`} style={{ paddingBottom: 70 }}>
      {activeTab === 'menu'      && <MenuTab />}
      {activeTab === 'favorites' && <FavoritesTab />}
      {activeTab === 'cart'      && <CartTab onCheckout={() => setCheckoutOpen(true)} />}
      {activeTab === 'about'     && <AboutTab />}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {checkoutOpen && (
        <CheckoutSheet
          onClose={() => setCheckoutOpen(false)}
          onSuccess={() => {
            setCheckoutOpen(false)
            setActiveTab('menu')
          }}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
