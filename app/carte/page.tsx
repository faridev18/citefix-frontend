"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, AlertTriangle, Lightbulb, Trash2, Shield } from "lucide-react"
import { Label } from "@/components/ui/label"  // Ajoutez cette ligne

import toast from "react-hot-toast"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const CATEGORIES = [
  { value: "voirie", label: "Voirie" },
  { value: "éclairage", label: "Éclairage" },
  { value: "déchets", label: "Déchets" },
  { value: "sécurité", label: "Sécurité" },
]

const STATUS_LIST = [
  { value: "reported", label: "Signalé" },
  { value: "validated", label: "Validé" },
  { value: "assigned", label: "Assigné" },
  { value: "in_progress", label: "Intervention en cours" },
  { value: "completed", label: "Terminé" },
  { value: "resolved", label: "Résolu" },
  { value: "rejected", label: "Rejeté" },
]

const STATUS_LABELS = Object.fromEntries(STATUS_LIST.map(s => [s.value, s.label]))

const getCategoryIcon = (category) => {
  switch ((category || "").toLowerCase()) {
    case "voirie": return <AlertTriangle className="h-4 w-4" />
    case "éclairage": return <Lightbulb className="h-4 w-4" />
    case "déchets": return <Trash2 className="h-4 w-4" />
    case "sécurité": return <Shield className="h-4 w-4" />
    default: return <AlertTriangle className="h-4 w-4" />
  }
}

function safeArray(data) {
  if (Array.isArray(data)) return data
  if (data && typeof data === "object" && Array.isArray(data.reports)) return data.reports
  if (data && typeof data === "object" && Array.isArray(data.data)) return data.data
  return []
}

const createCustomIcon = (color) =>
  L.divIcon({
    html: `
      <div style="
        background-color:${color};
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translate(-14px, -14px);
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      ">
        <div style="
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    className: "custom-marker",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })

export default function MapPage() {
  const [reportsRaw, setReportsRaw] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [center] = useState([6.3696, 2.4204]) // Cotonou coordinates
  const [zoom] = useState(15) // Zoom plus précis initial
  const mapRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:3001/api/reports/public")
      const data = await res.json()
      setReportsRaw(data)
    } catch (err) {
      toast.error("Erreur lors du chargement des signalements")
      setReportsRaw([])
    }
    setLoading(false)
  }

  const reports = safeArray(reportsRaw)

  const filteredReports = reports.filter((report) => {
    const title = (report.title || "").toLowerCase()
    const matchesSearch = title.includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || (report.category || "").toLowerCase() === selectedCategory
    const matchesStatus = selectedStatus === "all" || (report.status || "") === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusLabel = (status) => STATUS_LABELS[status] || status || "-"

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    mapRef.current = L.map(containerRef.current, {
      zoomControl: false, // We'll add custom control
    }).setView(center, zoom)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapRef.current)

    // Add custom zoom control
    L.control.zoom({
      position: 'topright'
    }).addTo(mapRef.current)

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [center, zoom])

  // Update markers
  useEffect(() => {
    if (!mapRef.current) return

    // Clear all existing markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) mapRef.current.removeLayer(layer)
    })

    if (!Array.isArray(filteredReports)) return

    const markers = []
    let hasValidMarkers = false

    filteredReports.forEach((report) => {
      // GeoJSON format: [longitude, latitude]
      const [longitude, latitude] = report.location?.coordinates || []
      
      if (!latitude || !longitude) {
        console.warn(`Report ${report._id} has invalid coordinates`)
        return
      }

      hasValidMarkers = true
      const isResolved = ["résolu", "terminé", "resolved", "completed"].includes(report.status?.toLowerCase())
      const color = isResolved ? "#10b981" : "#ef4444"

      const marker = L.marker([latitude, longitude], {
        icon: createCustomIcon(color),
        title: report.title,
      }).addTo(mapRef.current)

      marker.bindPopup(`
        <div style="min-width: 180px">
          <h4 style="margin: 0 0 6px 0; font-weight: 600;">${report.title}</h4>
          <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
            <span style="font-size: 12px; color: #666;">Catégorie:</span>
            <span style="font-size: 12px; font-weight: 500;">${report.category || 'Non spécifiée'}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="font-size: 12px; color: #666;">Statut:</span>
            <span style="
              font-size: 12px; 
              font-weight: 500;
              color: ${isResolved ? "#059669" : "#dc2626"}
            ">
              ${getStatusLabel(report.status)}
            </span>
          </div>
        </div>
      `)

      markers.push(marker)
    })

    if (hasValidMarkers) {
      const group = new L.FeatureGroup(markers)
      mapRef.current.fitBounds(group.getBounds().pad(0.1), {
        maxZoom: 17 // Prevent over-zooming
      })
    } else {
      mapRef.current.setView(center, zoom)
    }
  }, [filteredReports, center, zoom])

  return (
    <div className="container m-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Carte des signalements</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar with filters */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Filtres</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Catégorie</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes catégories</SelectItem>
                    {CATEGORIES.map(c => (
                      <SelectItem key={c.value} value={c.value}>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(c.value)}
                          {c.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Statut</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous statuts</SelectItem>
                    {STATUS_LIST.map(s => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setSelectedStatus("all")
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Réinitialiser
              </Button>
            </CardContent>
          </Card>

          {/* Reports list */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>
                Signalements <span className="text-muted-foreground">({filteredReports.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                    <p className="text-muted-foreground">Chargement...</p>
                  </div>
                ) : filteredReports.length > 0 ? (
                  filteredReports.map((report) => {
                    const [longitude, latitude] = report.location?.coordinates || []
                    return (
                      <div 
                        key={report._id} 
                        className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => {
                          if (mapRef.current && latitude && longitude) {
                            mapRef.current.setView([latitude, longitude], 17)
                          }
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getCategoryIcon(report.category)}
                            {report.category?.charAt(0).toUpperCase() + report.category?.slice(1)}
                          </Badge>
                          <Badge variant={report.status === "resolved" ? "default" : "secondary"}>
                            {getStatusLabel(report.status)}
                          </Badge>
                        </div>
                        <h3 className="font-medium">{report.title}</h3>
                        {latitude && longitude && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {latitude.toFixed(5)}, {longitude.toFixed(5)}
                          </p>
                        )}
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    Aucun signalement trouvé
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map container */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-0 h-[700px] relative">
              <div
                ref={containerRef}
                className="absolute inset-0 z-0 rounded-lg overflow-hidden"
              />
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs shadow-md z-[1000] border">
                <div className="font-medium mb-2">Légende</div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span>Signalements actifs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>Signalements résolus</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}