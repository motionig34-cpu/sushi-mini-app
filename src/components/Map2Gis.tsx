import { useEffect, useRef } from 'react'

// Almaty center coordinates [longitude, latitude]
const ALMATY: [number, number] = [76.8512, 43.2220]

interface Props {
  height?: number | string
  borderRadius?: number
}

export default function Map2Gis({ height = 300, borderRadius = 16 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mapInstance: any

    import('@2gis/mapgl').then(({ load }) => {
      load().then((mapgl: any) => {
        if (!containerRef.current) return

        mapInstance = new mapgl.Map(containerRef.current, {
          center: ALMATY,
          zoom: 14,
          key: 'demoapikey',
        })

        mapRef.current = mapInstance

        // Place a pin at the center
        new mapgl.Marker(mapInstance, {
          coordinates: ALMATY,
        })
      })
    })

    return () => {
      mapRef.current?.destroy()
      mapRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        width: '100%',
        borderRadius,
        overflow: 'hidden',
        background: '#1a2a1a',
      }}
    />
  )
}
