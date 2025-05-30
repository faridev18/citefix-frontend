"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Search, Filter, MapPin, Phone, Mail, Calendar, Edit, Trash2, UserPlus } from "lucide-react"

// Données fictives pour les techniciens
const techniciansData = [
  {
    id: "1",
    name: "Jean Kouassi",
    email: "jean.kouassi@citefix.bj",
    phone: "+229 XX XX XX XX",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "En mission",
    specialties: ["Éclairage", "Électricité"],
    zone: "Centre-ville",
    activeReports: 8,
    completedReports: 156,
    efficiency: 92,
    joinDate: "2024-01-15",
    lastActive: "2025-05-31T14:30:00Z",
    currentLocation: "Rue des Écoles, Cotonou",
  },
  {
    id: "2",
    name: "Marie Adjovi",
    email: "marie.adjovi@citefix.bj",
    phone: "+229 YY YY YY YY",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Disponible",
    specialties: ["Voirie", "Travaux publics"],
    zone: "Akpakpa",
    activeReports: 5,
    completedReports: 203,
    efficiency: 88,
    joinDate: "2023-08-20",
    lastActive: "2025-05-31T13:45:00Z",
    currentLocation: "Base technique Akpakpa",
  },
  {
    id: "3",
    name: "Paul Dossou",
    email: "paul.dossou@citefix.bj",
    phone: "+229 ZZ ZZ ZZ ZZ",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "En mission",
    specialties: ["Déchets", "Nettoyage"],
    zone: "Dantokpa",
    activeReports: 6,
    completedReports: 134,
    efficiency: 85,
    joinDate: "2024-03-10",
    lastActive: "2025-05-31T12:20:00Z",
    currentLocation: "Marché Dantokpa",
  },
  {
    id: "4",
    name: "Fatou Kone",
    email: "fatou.kone@citefix.bj",
    phone: "+229 AA AA AA AA",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "Repos",
    specialties: ["Sécurité", "Signalisation"],
    zone: "Cadjehoun",
    activeReports: 0,
    completedReports: 89,
    efficiency: 90,
    joinDate: "2024-06-01",
    lastActive: "2025-05-30T17:00:00Z",
    currentLocation: "Hors service",
  },
]

// Fonction pour obtenir la couleur du statut
const getStatusColor = (status: string) => {
  switch (status) {
    case "Disponible":
      return "bg-green-500"
    case "En mission":
      return "bg-orange-500"
    case "Repos":
      return "bg-blue-500"
    case "Indisponible":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

// Fonction pour formater la date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fr-FR")
}

export default function TechniciansPage() {
  const [technicians, setTechnicians] = useState(techniciansData)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedZone, setSelectedZone] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filtrer les techniciens
  const filteredTechnicians = technicians.filter((tech) => {
    const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesZone = selectedZone === "all" ? true : tech.zone === selectedZone
    const matchesStatus = selectedStatus === "all" ? true : tech.status === selectedStatus
    return matchesSearch && matchesZone && matchesStatus
  })

  // Statistiques
  const stats = {
    total: technicians.length,
    available: technicians.filter((t) => t.status === "Disponible").length,
    onMission: technicians.filter((t) => t.status === "En mission").length,
    resting: technicians.filter((t) => t.status === "Repos").length,
    averageEfficiency: Math.round(technicians.reduce((acc, t) => acc + t.efficiency, 0) / technicians.length),
  }

  return (
    <div className="container m-auto  py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des techniciens</h1>
          <p className="text-muted-foreground">Gérez votre équipe technique et leurs interventions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Ajouter un technicien
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau technicien</DialogTitle>
              <DialogDescription>Remplissez les informations du nouveau technicien</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input id="name" placeholder="Nom complet" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="email@citefix.bj" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Téléphone
                </Label>
                <Input id="phone" placeholder="+229 XX XX XX XX" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="zone" className="text-right">
                  Zone
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner une zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="centre-ville">Centre-ville</SelectItem>
                    <SelectItem value="akpakpa">Akpakpa</SelectItem>
                    <SelectItem value="dantokpa">Dantokpa</SelectItem>
                    <SelectItem value="cadjehoun">Cadjehoun</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="specialties" className="text-right">
                  Spécialités
                </Label>
                <Textarea id="specialties" placeholder="Éclairage, Voirie..." className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{stats.available}</div>
            <p className="text-sm text-muted-foreground">Disponibles</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">{stats.onMission}</div>
            <p className="text-sm text-muted-foreground">En mission</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.resting}</div>
            <p className="text-sm text-muted-foreground">Au repos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.averageEfficiency}%</div>
            <p className="text-sm text-muted-foreground">Efficacité moy.</p>
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
                <Label>Zone</Label>
                <Select value={selectedZone} onValueChange={setSelectedZone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les zones" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les zones</SelectItem>
                    <SelectItem value="Centre-ville">Centre-ville</SelectItem>
                    <SelectItem value="Akpakpa">Akpakpa</SelectItem>
                    <SelectItem value="Dantokpa">Dantokpa</SelectItem>
                    <SelectItem value="Cadjehoun">Cadjehoun</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Statut</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="Disponible">Disponible</SelectItem>
                    <SelectItem value="En mission">En mission</SelectItem>
                    <SelectItem value="Repos">Repos</SelectItem>
                    <SelectItem value="Indisponible">Indisponible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedZone("all")
                  setSelectedStatus("all")
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Réinitialiser
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Liste des techniciens */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Techniciens ({filteredTechnicians.length})</CardTitle>
              <CardDescription>Liste de votre équipe technique</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTechnicians.map((tech) => (
                  <Card key={tech.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={tech.avatar || "/placeholder.svg"} alt={tech.name} />
                          <AvatarFallback>{tech.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{tech.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(tech.status)}`} />
                            <Badge variant="outline">{tech.status}</Badge>
                            <Badge variant="secondary">{tech.zone}</Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span>{tech.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{tech.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold">{tech.activeReports}</div>
                        <div className="text-xs text-muted-foreground">Actifs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{tech.completedReports}</div>
                        <div className="text-xs text-muted-foreground">Terminés</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{tech.efficiency}%</div>
                        <div className="text-xs text-muted-foreground">Efficacité</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{formatDate(tech.joinDate)}</div>
                        <div className="text-xs text-muted-foreground">Embauché</div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1">
                      {tech.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    {tech.status === "En mission" && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>Position actuelle: {tech.currentLocation}</span>
                      </div>
                    )}

                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">
                        <MapPin className="mr-1 h-3 w-3" />
                        Localiser
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="mr-1 h-3 w-3" />
                        Appeler
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-1 h-3 w-3" />
                        Planning
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredTechnicians.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucun technicien trouvé</h3>
                  <p className="text-muted-foreground">Aucun technicien ne correspond à vos critères de recherche.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
