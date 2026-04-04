import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet default icon paths broken by Vite bundling
;(L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl = undefined
L.Icon.Default.mergeOptions({
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const RESTAURANT: [number, number] = [43.2566, 76.9286]
const ALMATY:     [number, number] = [43.2220, 76.8512]

interface Props {
  mode: 'delivery' | 'pickup' | 'static'
  height?: string | number
  interactive?: boolean
}

function MapFocus({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom, { animate: false })
  }, [center, zoom, map])
  return null
}

export default function MapView({ mode, height = 300, interactive = true }: Props) {
  const center = mode === 'delivery' ? ALMATY : RESTAURANT
  const zoom   = mode === 'delivery' ? 13 : 15

  return (
    <MapContainer
      key={mode}
      center={center}
      zoom={zoom}
      style={{ height: typeof height === 'number' ? `${height}px` : height, width: '100%' }}
      zoomControl={interactive}
      dragging={interactive}
      scrollWheelZoom={false}
      doubleClickZoom={interactive}
      touchZoom={interactive}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapFocus center={center} zoom={zoom} />

      {(mode === 'pickup' || mode === 'static') && (
        <Marker position={RESTAURANT}>
          <Popup>
            <strong>MAGURO Sushi</strong><br />
            ул. Толстого, 107/1, Алматы<br />
            10:00 – 23:00
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}
