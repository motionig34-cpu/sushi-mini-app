import TwoGisMap from '../components/TwoGisMap'

export default function AboutTab() {
  return (
    <div className="min-h-screen bg-bg pb-6">
      {/* Header */}
      <div className="px-4 pt-8 pb-4 text-center">
        <h1 className="text-white text-3xl font-black tracking-[0.2em] mb-1">MAGURO</h1>
        <p className="text-gray-500 text-xs">Свежие суши и роллы с доставкой по Алматы</p>
      </div>

      {/* Map placeholder — styled like a map card */}
      <div
        className="mx-4 rounded-2xl overflow-hidden mb-4 relative flex items-end"
        style={{ height: 220, background: '#1c2a1c' }}
      >
        {/* Grid lines to give a map feel */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={`${(i + 1) * 12.5}%`} x2="100%" y2={`${(i + 1) * 12.5}%`} stroke="#4ade80" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`v${i}`} x1={`${(i + 1) * 16.66}%`} y1="0" x2={`${(i + 1) * 16.66}%`} y2="100%" stroke="#4ade80" strokeWidth="0.5" />
          ))}
          {/* "Streets" */}
          <line x1="0" y1="45%" x2="100%" y2="45%" stroke="#4ade80" strokeWidth="2" />
          <line x1="0" y1="65%" x2="100%" y2="65%" stroke="#4ade80" strokeWidth="1.5" />
          <line x1="33%" y1="0" x2="33%" y2="100%" stroke="#4ade80" strokeWidth="2" />
          <line x1="66%" y1="0" x2="66%" y2="100%" stroke="#4ade80" strokeWidth="1.5" />
          {/* Diagonal road */}
          <line x1="0" y1="80%" x2="50%" y2="20%" stroke="#4ade80" strokeWidth="1.5" />
        </svg>

        {/* Pin */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-red-500 border-2 border-white shadow-lg shadow-red-500/50" />
            <div className="w-0.5 h-3 bg-red-500" />
          </div>
        </div>

        {/* Address badge at bottom */}
        <div className="relative z-10 w-full bg-black/60 backdrop-blur-sm px-4 py-2.5">
          <p className="text-white font-bold text-sm">Алматы, ул. Толстого, 107/1</p>
          <p className="text-gray-400 text-xs mt-0.5">Пн–вс: 10:00–23:00</p>
        </div>
      </div>

      {/* Payment methods */}
      <div className="mx-4 mb-4">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Форма оплаты</p>
        <div className="flex gap-3">
          <div className="flex-1 bg-card rounded-2xl p-4 flex flex-col items-center gap-2">
            <span className="text-3xl">👛</span>
            <p className="text-white font-bold text-xs text-center">Наличными</p>
          </div>
          <div className="flex-1 bg-card rounded-2xl p-4 flex flex-col items-center gap-2">
            <span className="text-3xl">💳</span>
            <p className="text-white font-bold text-xs text-center">Картой при получении</p>
          </div>
          <div className="flex-1 bg-card rounded-2xl p-4 flex flex-col items-center gap-2">
            <span className="text-3xl">📱</span>
            <p className="text-white font-bold text-xs text-center">Kaspi QR</p>
          </div>
        </div>
      </div>

      {/* Contacts */}
      <div className="mx-4 bg-card rounded-2xl p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg">📞</span>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Телефон</p>
            <p className="text-white text-sm font-bold mt-0.5">+7 (727) 000-00-00</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg">📸</span>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Instagram</p>
            <p className="text-white text-sm font-bold mt-0.5">@maguro.almaty</p>
          </div>
        </div>
      </div>
    </div>
  )
}
