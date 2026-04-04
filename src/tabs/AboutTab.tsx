import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet icon paths
;(L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl = undefined
L.Icon.Default.mergeOptions({
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const RESTAURANT: [number, number] = [43.2566, 76.9286]

export default function AboutTab() {
  return (
    <div className="min-h-screen bg-bg pb-6">
      {/* Header */}
      <div className="px-4 pt-8 pb-4 text-center">
        <h1 className="text-white text-3xl font-black tracking-[0.2em] mb-1">MAGURO</h1>
        <p className="text-gray-500 text-xs">Свежие суши и роллы с доставкой по Алматы</p>
      </div>

      {/* Map */}
      <div className="mx-4 rounded-2xl overflow-hidden mb-4" style={{ height: 240 }}>
        <MapContainer
          key="about-map"
          center={RESTAURANT}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={RESTAURANT} />
        </MapContainer>
      </div>

      {/* Address & hours */}
      <div className="mx-4 mb-4">
        <p className="text-white font-bold text-base">Алматы, ул. Толстого, 107/1</p>
        <p className="text-gray-500 text-sm mt-0.5">Пн–вс: 10:00–23:00</p>
      </div>

      {/* Payment methods */}
      <div className="mx-4 mb-4">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Форма оплаты</p>
        <div className="flex gap-4">
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
