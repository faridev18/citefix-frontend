"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  AlertTriangle,
  Lightbulb,
  Trash2,
  Shield,
  MapPin,
  Plus,
} from "lucide-react"
import Link from "next/link"

const getCategoryIcon = (category) => {
  switch ((category || "").toLowerCase()) {
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

const getStatusColor = (status) => {
  switch (status) {
    case "Signalé": case "reported":
      return "bg-yellow-500"
    case "Validé": case "validated":
      return "bg-blue-500"
    case "Assigné": case "assigned":
      return "bg-purple-500"
    case "Intervention en cours": case "in_progress":
      return "bg-orange-500"
    case "Terminé": case "completed":
      return "bg-green-500"
    case "Résolu": case "resolved":
      return "bg-green-600"
    case "Rejeté": case "rejected":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case "Haute": case "high":
      return "destructive"
    case "Moyenne": case "medium":
      return "default"
    case "Basse": case "low":
      return "secondary"
    default:
      return "outline"
  }
}

// Helper pour afficher location
const displayLocation = (loc) => {
  if (!loc) return "Non renseigné"
  if (typeof loc === "string") return loc
  if (loc.address) return loc.address
  if (loc.coordinates) {
    return `Lat: ${loc.coordinates[0]}, Lng: ${loc.coordinates[1]}`
  }
  return JSON.stringify(loc)
}

export default function MyReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    fetch("http://localhost:3001/api/reports?mine=true", {
      headers: token ? { "Authorization": "Bearer " + token } : {}
    })
      .then(res => res.json())
      .then(data => {
        setReports(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  // Filtrer les signalements
  const filteredReports = reports.filter((report) => {
    const matchesSearch = (report.title || "").toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" ? true : report.category === selectedCategory
    const matchesStatus = selectedStatus === "all" ? true : report.status === selectedStatus
    const matchesTab =
      activeTab === "all"
        ? true
        : activeTab === "active"
          ? !["Résolu", "resolved", "Rejeté", "rejected"].includes(report.status)
          : activeTab === "resolved"
            ? ["Résolu", "resolved"].includes(report.status)
            : activeTab === "rejected"
              ? ["Rejeté", "rejected"].includes(report.status)
              : true

    return matchesSearch && matchesCategory && matchesStatus && matchesTab
  })

  // Statistiques
  const stats = {
    total: reports.length,
    active: reports.filter((r) => !["Résolu", "resolved", "Rejeté", "rejected"].includes(r.status)).length,
    resolved: reports.filter((r) => ["Résolu", "resolved"].includes(r.status)).length,
    rejected: reports.filter((r) => ["Rejeté", "rejected"].includes(r.status)).length,
  }

  return (
    <div className="container m-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Mes signalements</h1>
          <p className="text-muted-foreground">Gérez et suivez tous vos signalements</p>
        </div>
        <Button asChild>
          <Link href="/signaler">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau signalement
          </Link>
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.active}</div>
            <p className="text-sm text-muted-foreground">En cours</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{stats.resolved}</div>
            <p className="text-sm text-muted-foreground">Résolus</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{stats.rejected}</div>
            <p className="text-sm text-muted-foreground">Rejetés</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filtres */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Filtres</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
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
                Réinitialiser
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Liste des signalements */}
        <div className="lg:col-span-3 ">
          <Card>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Signalements ({filteredReports.length})</CardTitle>
                  <TabsList>
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="active">En cours</TabsTrigger>
                    <TabsTrigger value="resolved">Résolus</TabsTrigger>
                    <TabsTrigger value="rejected">Rejetés</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>

              <TabsContent value={activeTab} className="mt-0">
                <CardContent>
                  <div className="space-y-4">
                    {filteredReports.length > 0 ? (
                      filteredReports.map((report) => (
                        <Link href={`/signalements/${report._id || report.id}`} key={report._id || report.id}>
                          <div className="p-4 mt-5 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="flex items-center gap-1">
                                  {getCategoryIcon(report.category)}
                                  {report.category?.charAt(0).toUpperCase() + report.category?.slice(1)}
                                </Badge>
                                <Badge variant={getPriorityColor(report.priority)}>{report.priority}</Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${getStatusColor(report.status)}`} />
                                <Badge variant="secondary">{report.status}</Badge>
                              </div>
                            </div>

                            <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                            <p className="text-muted-foreground mb-3 line-clamp-2">{report.description}</p>

                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="truncate">{displayLocation(report.location)}</span>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <div className="rounded-full bg-muted w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <MapPin className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-medium mb-2">Aucun signalement trouvé</h3>
                        <p className="text-muted-foreground mb-4">
                          {activeTab === "all"
                            ? "Vous n'avez pas encore créé de signalement."
                            : "Aucun signalement ne correspond à vos critères."}
                        </p>
                        <Button asChild>
                          <Link href="/signaler">
                            <Plus className="mr-2 h-4 w-4" />
                            Créer un signalement
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}
