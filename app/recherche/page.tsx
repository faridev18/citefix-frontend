"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import {
  Search,
  Filter,
  MapPin,
  CalendarIcon,
  Clock,
  User,
  Tag,
  SlidersHorizontal,
  X,
  AlertTriangle,
  Lightbulb,
  Trash2,
  Shield,
} from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import Link from "next/link"

// Données fictives pour la recherche
const searchResults = [
  {
    id: "1",
    title: "Lampadaire cassé devant l'école primaire",
    category: "éclairage",
    description: "Le lampadaire ne fonctionne plus depuis 3 jours, créant une zone d'ombre dangereuse",
    location: "Rue des Écoles, Cotonou",
    status: "Validé",
    priority: "Haute",
    date: "2025-05-31T10:12:00Z",
    author: "Fatou D.",
    comments: 3,
    confirmations: 5,
    distance: 0.8,
  },
  {
    id: "2",
    title: "Nid de poule dangereux sur l'avenue principale",
    category: "voirie",
    description: "Un nid de poule profond qui cause des accidents de moto",
    location: "Avenue de la Liberté, Cotonou",
    status: "Intervention en cours",
    priority: "Haute",
    date: "2025-05-30T14:30:00Z",
    author: "Kofi A.",
    comments: 7,
    confirmations: 12,
    distance: 1.2,
  },
  {
    id: "3",
    title: "Dépôt sauvage de déchets près du marché",
    category: "déchets",
    description: "Accumulation de déchets qui attire les mouches et dégage une mauvaise odeur",
    location: "Marché Dantokpa, Cotonou",
    status: "Résolu",
    priority: "Moyenne",
    date: "2025-05-25T08:45:00Z",
    author: "Ama K.",
    comments: 2,
    confirmations: 4,
    distance: 2.1,
  },
  {
    id: "4",
    title: "Panneau de signalisation endommagé",
    category: "sécurité",
    description: "Le panneau stop est tombé après la tempête de la semaine dernière",
    location: "Carrefour Ganhi, Cotonou",
    status: "Signalé",
    priority: "Moyenne",
    date: "2025-05-29T16:20:00Z",
    author: "Sékou T.",
    comments: 1,
    confirmations: 3,
    distance: 3.5,
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

// Fonction pour obtenir la couleur du statut
const getStatusColor = (status: string) => {
  switch (status) {
    case "Signalé":
      return "bg-yellow-500"
    case "Validé":
      return "bg-blue-500"
    case "Assigné":
      return "bg-purple-500"
    case "Intervention en cours":
      return "bg-orange-500"
    case "Terminé":
      return "bg-green-500"
    case "Résolu":
      return "bg-green-600"
    case "Rejeté":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

// Fonction pour obtenir la couleur de la priorité
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Haute":
      return "destructive"
    case "Moyenne":
      return "default"
    case "Basse":
      return "secondary"
    default:
      return "outline"
  }
}

// Fonction pour formater la date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 24) {
    return `Il y a ${diffInHours}h`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? "s" : ""}`
  }
}

export default function RecherchePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedZone, setSelectedZone] = useState("all")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()
  const [maxDistance, setMaxDistance] = useState([10])
  const [sortBy, setSortBy] = useState("date")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Filtrer les résultats
  const filteredResults = searchResults.filter((result) => {
    const matchesSearch =
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" ? true : result.category === selectedCategory
    const matchesStatus = selectedStatus === "all" ? true : result.status === selectedStatus
    const matchesPriority = selectedPriority === "all" ? true : result.priority === selectedPriority
    const matchesDistance = result.distance <= maxDistance[0]

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority && matchesDistance
  })

  // Trier les résultats
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "distance":
        return a.distance - b.distance
      case "priority":
        const priorityOrder = { Haute: 3, Moyenne: 2, Basse: 1 }
        return (
          priorityOrder[b.priority as keyof typeof priorityOrder] -
          priorityOrder[a.priority as keyof typeof priorityOrder]
        )
      case "confirmations":
        return b.confirmations - a.confirmations
      default:
        return 0
    }
  })

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedStatus("all")
    setSelectedPriority("all")
    setSelectedZone("all")
    setDateRange(undefined)
    setMaxDistance([10])
    setSelectedStatuses([])
    setSelectedCategories([])
  }

  const activeFiltersCount = [
    searchQuery,
    selectedCategory !== "all" ? selectedCategory : null,
    selectedStatus !== "all" ? selectedStatus : null,
    selectedPriority !== "all" ? selectedPriority : null,
    selectedZone !== "all" ? selectedZone : null,
    dateRange,
    maxDistance[0] !== 10 ? maxDistance[0] : null,
  ].filter(Boolean).length

  return (
    <div className="container m-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Recherche avancée</h1>
          <p className="text-muted-foreground">Trouvez des signalements spécifiques avec des filtres détaillés</p>
        </div>
        <Button variant="outline" onClick={() => setShowAdvanced(!showAdvanced)}>
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {showAdvanced ? "Masquer" : "Afficher"} les filtres avancés
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filtres */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Filtres</CardTitle>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="mr-1 h-3 w-3" />
                    Effacer ({activeFiltersCount})
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Recherche textuelle */}
              <div className="space-y-2">
                <Label>Recherche</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Mots-clés..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Catégorie */}
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
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

              {/* Statut */}
              <div className="space-y-2">
                <Label>Statut</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue />
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

              {/* Priorité */}
              <div className="space-y-2">
                <Label>Priorité</Label>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les priorités</SelectItem>
                    <SelectItem value="Haute">Haute</SelectItem>
                    <SelectItem value="Moyenne">Moyenne</SelectItem>
                    <SelectItem value="Basse">Basse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Distance */}
              <div className="space-y-2">
                <Label>Distance maximum: {maxDistance[0]} km</Label>
                <Slider
                  value={maxDistance}
                  onValueChange={setMaxDistance}
                  max={20}
                  min={1}
                  step={0.5}
                  className="w-full"
                />
              </div>

              {/* Filtres avancés */}
              {showAdvanced && (
                <>
                  <div className="space-y-2">
                    <Label>Zone</Label>
                    <Select value={selectedZone} onValueChange={setSelectedZone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les zones</SelectItem>
                        <SelectItem value="centre-ville">Centre-ville</SelectItem>
                        <SelectItem value="akpakpa">Akpakpa</SelectItem>
                        <SelectItem value="dantokpa">Dantokpa</SelectItem>
                        <SelectItem value="cadjehoun">Cadjehoun</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Période</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange?.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "dd MMM", { locale: fr })} -{" "}
                                {format(dateRange.to, "dd MMM yyyy", { locale: fr })}
                              </>
                            ) : (
                              format(dateRange.from, "dd MMM yyyy", { locale: fr })
                            )
                          ) : (
                            <span>Sélectionner une période</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={dateRange?.from}
                          selected={dateRange}
                          onSelect={setDateRange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </>
              )}

              <Button variant="outline" className="w-full" onClick={clearFilters}>
                <Filter className="mr-2 h-4 w-4" />
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Résultats */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Résultats de recherche</CardTitle>
                  <CardDescription>{sortedResults.length} signalement(s) trouvé(s)</CardDescription>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Plus récent</SelectItem>
                    <SelectItem value="distance">Plus proche</SelectItem>
                    <SelectItem value="priority">Priorité</SelectItem>
                    <SelectItem value="confirmations">Plus confirmé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedResults.length > 0 ? (
                  sortedResults.map((result) => (
                    <Link href={`/signalements/${result.id}`} key={result.id}>
                      <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="flex items-center gap-1">
                              {getCategoryIcon(result.category)}
                              {result.category.charAt(0).toUpperCase() + result.category.slice(1)}
                            </Badge>
                            <Badge variant={getPriorityColor(result.priority)}>{result.priority}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(result.status)}`} />
                            <Badge variant="secondary">{result.status}</Badge>
                          </div>
                        </div>

                        <h3 className="font-semibold text-lg mb-2">{result.title}</h3>
                        <p className="text-muted-foreground mb-3 line-clamp-2">{result.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="truncate">{result.location}</span>
                            <span className="mx-2">•</span>
                            <span>{result.distance} km</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatDate(result.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{result.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              <span>{result.confirmations} confirmations</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="rounded-full bg-muted w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-2">Aucun résultat trouvé</h3>
                    <p className="text-muted-foreground mb-4">
                      Essayez de modifier vos critères de recherche ou d'élargir les filtres.
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Effacer tous les filtres
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
