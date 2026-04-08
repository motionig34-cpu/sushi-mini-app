import { useApp } from '../context/AppContext'

export default function AboutTab() {
  const { isDark, toggleTheme } = useApp()

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <h1 className="text-white text-2xl font-black tracking-tight">О нас</h1>
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

      {/* Brand card */}
      <div className="mx-4 mb-3 bg-card rounded-2xl p-5 text-center">
        <p className="text-white text-3xl font-black tracking-widest mb-1">🍣 MAGURO</p>
        <p className="text-gray-500 text-sm">Японская кухня в Алматы</p>
      </div>

      {/* Map placeholder */}
      <div className="mx-4 mb-3 bg-card rounded-2xl overflow-hidden" style={{ height: 160 }}>
        <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #1a2035 0%, #2d3a5e 100%)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" fill="#ef4444" stroke="none" />
          </svg>
          <p className="text-white text-sm font-semibold">г. Алматы</p>
          <p className="text-gray-500 text-xs">ул. Примерная, 1</p>
        </div>
      </div>

      {/* Info cards */}
      <div className="flex flex-col gap-2 mx-4">
        <InfoRow icon="📍" label="Адрес" value="г. Алматы, ул. Примерная, 1" />
        <InfoRow icon="🕐" label="Режим работы" value="Пн–Вс: 10:00 – 23:00" />
        <InfoRow icon="📞" label="Телефон" value="+7 (700) 000-00-00" />
        <InfoRow icon="🛵" label="Доставка" value="По городу от 30 мин" />
      </div>

      {/* Social links */}
      <div className="mx-4 mt-3 bg-card rounded-2xl p-4">
        <p className="text-gray-500 text-xs font-semibold uppercase mb-3">Мы в соцсетях</p>
        <div className="flex gap-3">
          <SocialButton label="Instagram" color="#e1306c" />
          <SocialButton label="2GIS" color="#00be7b" />
        </div>
      </div>
    </div>
  )
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-card rounded-2xl px-4 py-3 flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-gray-500 text-xs">{label}</p>
        <p className="text-white text-sm font-semibold">{value}</p>
      </div>
    </div>
  )
}

function SocialButton({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="flex-1 py-2.5 rounded-xl flex items-center justify-center text-white text-sm font-bold"
      style={{ background: color + '22', border: `1px solid ${color}44`, color }}
    >
      {label}
    </div>
  )
}
