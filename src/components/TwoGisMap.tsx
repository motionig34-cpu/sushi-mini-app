import { useEffect, useRef } from 'react'
import type { Map as MapGLMap, Marker as MapGLMarker } from '@2gis/mapgl/types'

const LON = 76.8512
const LAT = 43.2220

interface Props {
  height?: number
}

export default function TwoGisMap({ height = 220 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let map: MapGLMap | null = null
    let marker: MapGLMarker | null = null

    import('@2gis/mapgl').then(({ load }) => {
      load().then((mapgl) => {
        if (!containerRef.current) return

        map = new mapgl.Map(containerRef.current, {
          center: [LON, LAT],
          zoom: 16,
          key: 'demo',
        })

        marker = new mapgl.Marker(map, {
          coordinates: [LON, LAT],
        })

        void marker
      })
    })

    return () => {
      map?.destroy()
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height }} />
}
