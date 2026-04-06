import TwoGisMap from '../components/TwoGisMap'

export default function AboutTab() {
  return (
    <div className="min-h-screen bg-bg pb-6">
      {/* Header */}
      <div className="px-4 pt-8 pb-4 text-center">
        <h1 className="text-white text-3xl font-black tracking-[0.2em] mb-1">MAGURO</h1>
        <p className="text-gray-500 text-xs">Свежие суши и роллы с доставкой по Алматы</p>
      </div>

      {/* 2GIS Map */}
      <div className="mx-4 rounded-2xl overflow-hidden mb-4 relative" style={{ height: 220 }}>
        <TwoGisMap height={220} />
        {/* Address badge at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/70 backdrop-blur-sm px-4 py-2.5">
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
