import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet default icon paths broken by Vite bundling
;(L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl = undefined
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Алматы, ул. Толстого, 107/1
const LAT = 43.2388
const LON = 76.9077

interface Props {
  height?: number
}

export default function TwoGisMap({ height = 220 }: Props) {
  return (
    <MapContainer
      center={[LAT, LON]}
      zoom={16}
      style={{ width: '100%', height }}
      zoomControl={false}
      dragging={true}
      scrollWheelZoom={false}
      doubleClickZoom={true}
      touchZoom={true}
      attributionControl={false}
    >
      <TileLayer url="https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1" />
      <Marker position={[LAT, LON]} />
    </MapContainer>
  )
}
