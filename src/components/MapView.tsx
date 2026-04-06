import { MapContainer, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet default icon paths broken by Vite bundling
;(L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl = undefined
L.Icon.Default.mergeOptions({
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Delivery map centered on Almaty
const ALMATY: [number, number] = [43.2220, 76.8512]

interface Props {
  height?: string | number
}

export default function MapView({ height = 300 }: Props) {
  return (
    <MapContainer
      center={ALMATY}
      zoom={13}
      style={{ height: typeof height === 'number' ? `${height}px` : height, width: '100%' }}
      zoomControl={true}
      dragging={true}
      scrollWheelZoom={false}
      doubleClickZoom={true}
      touchZoom={true}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  )
}
