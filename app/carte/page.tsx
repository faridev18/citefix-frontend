"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, AlertTriangle, Lightbulb, Trash2, Shield } from "lucide-react"
import dynamic from "next/dynamic"
// import MapComponent from "@/components/map-component"

// Import dynamique de la carte pour éviter les erreurs SSR
const MapComponent = dynamic(
  () => import('@/components/map-component'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Chargement de la carte...</div>
      </div>
    )
  }
)

// Données fictives pour les signalements
const reportsData = [
  {
    id: "1",
    title: "Lampadaire cassé devant l'école",
    category: "éclairage",
    status: "Validé",
    location: [2.4204, 6.3696], // [longitude, latitude]
  },
  {
    id: "2",
    title: "Nid de poule dangereux",
    category: "voirie",
    status: "Intervention en cours",
    location: [2.4254, 6.3746],
  },
  {
    id: "3",
    title: "Dépôt sauvage de déchets",
    category: "déchets",
    status: "Signalé",
    location: [2.4154, 6.3646],
  },
  {
    id: "4",
    title: "Éclairage public défaillant",
    category: "éclairage",
    status: "Assigné",
    location: [2.4304, 6.3596],
  },
  {
    id: "5",
    title: "Graffiti sur bâtiment public",
    category: "sécurité",
    status: "Signalé",
    location: [2.4354, 6.3796],
  },
]

// Fonction pour obtenir l'icône de la catégorie
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "voirie":
      return <AlertTriangle className="h-4 w-4" />
    case "éclairage":
      return <Lightbulb className="h-4 w-4" />
    case "déchets":
      return <Trash2 className="h-4 w-4" />
    case "sécurité":
      return <Shield className="h-4 w-4" />
    default:
      return <AlertTriangle className="h-4 w-4" />
  }
}

export default function MapPage() {
  const [reports] = useState(reportsData)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Filtrer les signalements
  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" ? true : report.category === selectedCategory
    const matchesStatus = selectedStatus === "all" ? true : report.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="container m-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Carte des signalements</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Filtres</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Rechercher un signalement..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Catégorie</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    <SelectItem value="voirie">Voirie</SelectItem>
                    <SelectItem value="éclairage">Éclairage</SelectItem>
                    <SelectItem value="déchets">Déchets</SelectItem>
                    <SelectItem value="sécurité">Sécurité</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Statut</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="Signalé">Signalé</SelectItem>
                    <SelectItem value="Validé">Validé</SelectItem>
                    <SelectItem value="Assigné">Assigné</SelectItem>
                    <SelectItem value="Intervention en cours">Intervention en cours</SelectItem>
                    <SelectItem value="Terminé">Terminé</SelectItem>
                    <SelectItem value="Résolu">Résolu</SelectItem>
                    <SelectItem value="Rejeté">Rejeté</SelectItem>
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
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Signalements ({filteredReports.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <div key={report.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getCategoryIcon(report.category)}
                          {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
                        </Badge>
                        <Badge variant="secondary">{report.status}</Badge>
                      </div>
                      <h3 className="font-medium">{report.title}</h3>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    Aucun signalement ne correspond à vos critères
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-0 h-[700px] relative"> {/* p-0 important */}
              <div className="absolute inset-0"> {/* Conteneur absolu */}
                <MapComponent
                  reports={filteredReports}
                  center={[45.764043, 4.835659]}
                  zoom={14}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
