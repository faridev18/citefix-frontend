import { useEffect, useRef } from "react"
import L from 'leaflet'

interface Report {
  id: string
  title: string
  category: string
  status: string
  location: number[]
}

const createCustomIcon = (color: string) => {
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translate(-12px, -12px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      ">
        <div style="
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  })
}

export default function MapComponent({ 
  reports = [], 
  center = [48.8566, 2.3522],
  zoom = 13,
  onLocationChange
}: {
  reports: Report[]
  center?: [number, number]
  zoom?: number
  onLocationChange?: (coords: [number, number]) => void
}) {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)
  const tempMarkerRef = useRef<L.Marker | null>(null)

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return
    
    initializedRef.current = true

    const map = L.map(containerRef.current, {
      preferCanvas: true
    }).setView(center, zoom)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    mapRef.current = map

    // Ecoute le click sur la carte
    map.on("click", function (e: L.LeafletMouseEvent) {
      if (!onLocationChange) return

      // Ajoute/maj marker temporaire
      if (tempMarkerRef.current) {
        tempMarkerRef.current.setLatLng(e.latlng)
      } else {
        tempMarkerRef.current = L.marker(e.latlng, {
          icon: createCustomIcon("#6366f1"),
          title: "Emplacement sélectionné"
        }).addTo(map)
      }

      // Remonte les coordonnées
      onLocationChange([e.latlng.lat, e.latlng.lng])
    })

    const handleResize = () => {
      map.invalidateSize()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      map.remove()
      mapRef.current = null
      initializedRef.current = false
      tempMarkerRef.current = null
    }
  }, [center, zoom, onLocationChange])

  // Add markers to map
  useEffect(() => {
    if (!mapRef.current) return

    const markers: L.Marker[] = []

    reports.forEach(report => {
      const [lng, lat] = report.location
      const isResolved = ['Résolu', 'Terminé', 'resolved', 'completed'].includes(report.status)
      const color = isResolved ? '#10b981' : '#ef4444'
      
      const marker = L.marker([lat, lng], {
        icon: createCustomIcon(color),
        title: report.title
      })
        .addTo(mapRef.current!)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold">${report.title}</h3>
            <p class="text-sm">Catégorie: ${report.category}</p>
            <p class="text-sm ${isResolved ? 'text-green-600' : 'text-red-600'}">
              Statut: ${report.status}
            </p>
          </div>
        `)

      markers.push(marker)
    })

    // Fit bounds to show all markers
    if (markers.length > 0) {
      const group = new L.FeatureGroup(markers)
      mapRef.current.fitBounds(group.getBounds().pad(0.2))
    }

    return () => {
      markers.forEach(marker => mapRef.current?.removeLayer(marker))
    }
  }, [reports])

  return (
    <div className="w-full h-full relative">
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs shadow-md z-[1000]">
        <div className="font-medium mb-2">Légende</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span>Signalements actifs</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span>Signalements résolus</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-3 h-3 bg-indigo-500 rounded-full" />
          <span>Position choisie</span>
        </div>
      </div>
    </div>
  )
}
