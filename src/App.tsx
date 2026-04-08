import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import WebApp from '@twa-dev/sdk'
import { AppProvider } from './context/AppContext'
import MenuPage from './pages/MenuPage'
import ItemDetailPage from './pages/ItemDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'

function TelegramInit() {
  useEffect(() => {
    try {
      // Initialize Telegram Mini App
      WebApp.ready()
      WebApp.expand()

      // Apply Telegram theme params as CSS variables
      const tp = WebApp.themeParams
      if (tp) {
        const root = document.documentElement
        if (tp.bg_color)            root.style.setProperty('--tg-bg-color', tp.bg_color)
        if (tp.secondary_bg_color)  root.style.setProperty('--tg-secondary-bg-color', tp.secondary_bg_color)
        if (tp.text_color)          root.style.setProperty('--tg-text-color', tp.text_color)
        if (tp.hint_color)          root.style.setProperty('--tg-hint-color', tp.hint_color)
        if (tp.link_color)          root.style.setProperty('--tg-link-color', tp.link_color)
        if (tp.button_color)        root.style.setProperty('--tg-button-color', tp.button_color)
        if (tp.button_text_color)   root.style.setProperty('--tg-button-text-color', tp.button_text_color)
      }
    } catch {
      // Running outside Telegram — safe to ignore
    }
  }, [])

  return null
}

export default function App() {
  return (
    <AppProvider>
      <TelegramInit />
      <HashRouter>
        <Routes>
          <Route path="/"           element={<MenuPage />} />
          <Route path="/item/:id"   element={<ItemDetailPage />} />
          <Route path="/cart"       element={<CartPage />} />
          <Route path="/checkout"   element={<CheckoutPage />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  )
}
