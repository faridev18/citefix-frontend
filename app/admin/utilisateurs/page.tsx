"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Edit,
  Trash2,
  Ban,
  CheckCircle2,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  Crown,
  User,
} from "lucide-react"

// Données fictives pour les utilisateurs
const usersData = [
  {
    id: "1",
    name: "Fatou Diarra",
    email: "fatou.diarra@email.com",
    phone: "+229 XX XX XX XX",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "citizen",
    status: "active",
    location: "Cotonou, Bénin",
    joinDate: "2024-01-15",
    lastActive: "2025-05-31T14:30:00Z",
    reportsCount: 12,
    confirmationsCount: 25,
    rating: 4.2,
    verified: true,
  },
  {
    id: "2",
    name: "Jean Kouassi",
    email: "jean.kouassi@citefix.bj",
    phone: "+229 YY YY YY YY",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "technician",
    status: "active",
    location: "Cotonou, Bénin",
    joinDate: "2024-01-15",
    lastActive: "2025-05-31T13:45:00Z",
    reportsCount: 0,
    confirmationsCount: 0,
    rating: 4.8,
    verified: true,
    specialties: ["Éclairage", "Électricité"],
    interventions: 156,
  },
  {
    id: "3",
    name: "Marie Adjovi",
    email: "marie.adjovi@citefix.bj",
    phone: "+229 ZZ ZZ ZZ ZZ",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "admin",
    status: "active",
    location: "Cotonou, Bénin",
    joinDate: "2023-08-20",
    lastActive: "2025-05-31T15:00:00Z",
    reportsCount: 5,
    confirmationsCount: 8,
    rating: 4.9,
    verified: true,
  },
  {
    id: "4",
    name: "Kofi Mensah",
    email: "kofi.mensah@email.com",
    phone: "+229 AA AA AA AA",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "citizen",
    status: "suspended",
    location: "Cotonou, Bénin",
    joinDate: "2024-03-10",
    lastActive: "2025-05-25T10:20:00Z",
    reportsCount: 8,
    confirmationsCount: 3,
    rating: 3.1,
    verified: false,
  },
  {
    id: "5",
    name: "Ama Koffi",
    email: "ama.koffi@email.com",
    phone: "+229 BB BB BB BB",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "citizen",
    status: "inactive",
    location: "Cotonou, Bénin",
    joinDate: "2024-06-01",
    lastActive: "2025-04-15T08:30:00Z",
    reportsCount: 3,
    confirmationsCount: 1,
    rating: 3.8,
    verified: true,
  },
]

// Fonction pour obtenir l'icône du rôle
const getRoleIcon = (role: string) => {
  switch (role) {
    case "admin":
      return <Crown className="h-4 w-4 text-yellow-600" />
    case "technician":
      return <Shield className="h-4 w-4 text-blue-600" />
    case "citizen":
      return <User className="h-4 w-4 text-gray-600" />
    default:
      return <User className="h-4 w-4 text-gray-600" />
  }
}

// Fonction pour obtenir la couleur du statut
const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500"
    case "inactive":
      return "bg-gray-500"
    case "suspended":
      return "bg-red-500"
    case "pending":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}

// Fonction pour formater la date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fr-FR")
}

export default function UtilisateursPage() {
  const [users, setUsers] = useState(usersData)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<(typeof usersData)[0] | null>(null)

  // Filtrer les utilisateurs
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === "all" ? true : user.role === selectedRole
    const matchesStatus = selectedStatus === "all" ? true : user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  // Statistiques
  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    citizens: users.filter((u) => u.role === "citizen").length,
    technicians: users.filter((u) => u.role === "technician").length,
    admins: users.filter((u) => u.role === "admin").length,
    suspended: users.filter((u) => u.status === "suspended").length,
  }

  const handleSuspendUser = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "suspended" ? "active" : "suspended" } : user,
      ),
    )
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  return (
    <div className="container m-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
          <p className="text-muted-foreground">Gérez tous les utilisateurs de la plateforme CitéFix</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Ajouter un utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
              <DialogDescription>Créez un nouveau compte utilisateur</DialogDescription>
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
                <Input id="email" type="email" placeholder="email@example.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Rôle
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citizen">Citoyen</SelectItem>
                    <SelectItem value="technician">Technicien</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                Créer l'utilisateur
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{stats.active}</div>
            <p className="text-sm text-muted-foreground">Actifs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.citizens}</div>
            <p className="text-sm text-muted-foreground">Citoyens</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">{stats.technicians}</div>
            <p className="text-sm text-muted-foreground">Techniciens</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">{stats.admins}</div>
            <p className="text-sm text-muted-foreground">Admins</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{stats.suspended}</div>
            <p className="text-sm text-muted-foreground">Suspendus</p>
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
                <Label>Rôle</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les rôles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les rôles</SelectItem>
                    <SelectItem value="citizen">Citoyens</SelectItem>
                    <SelectItem value="technician">Techniciens</SelectItem>
                    <SelectItem value="admin">Administrateurs</SelectItem>
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
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                    <SelectItem value="suspended">Suspendu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedRole("all")
                  setSelectedStatus("all")
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                Réinitialiser
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Liste des utilisateurs */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Utilisateurs ({filteredUsers.length})</CardTitle>
              <CardDescription>Liste de tous les utilisateurs de la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <Card key={user.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{user.name}</h3>
                            {user.verified && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`} />
                            <Badge variant="outline" className="flex items-center gap-1">
                              {getRoleIcon(user.role)}
                              {user.role === "citizen"
                                ? "Citoyen"
                                : user.role === "technician"
                                  ? "Technicien"
                                  : "Admin"}
                            </Badge>
                            <Badge variant="secondary">
                              {user.status === "active" ? "Actif" : user.status === "inactive" ? "Inactif" : "Suspendu"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{user.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleSuspendUser(user.id)}>
                          <Ban className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Supprimer l'utilisateur</AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer {user.name} ? Cette action est irréversible.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteUser(user.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold">{user.reportsCount}</div>
                        <div className="text-xs text-muted-foreground">Signalements</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{user.confirmationsCount}</div>
                        <div className="text-xs text-muted-foreground">Confirmations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{user.rating}/5</div>
                        <div className="text-xs text-muted-foreground">Note</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{formatDate(user.joinDate)}</div>
                        <div className="text-xs text-muted-foreground">Inscription</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{user.location}</span>
                      <span className="mx-2">•</span>
                      <Calendar className="h-3 w-3" />
                      <span>Dernière activité: {formatDate(user.lastActive)}</span>
                    </div>

                    {user.role === "technician" && user.specialties && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {user.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}

                {filteredUsers.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Aucun utilisateur trouvé</h3>
                    <p className="text-muted-foreground">
                      Aucun utilisateur ne correspond à vos critères de recherche.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog de détails utilisateur */}
      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Détails de l'utilisateur</DialogTitle>
              <DialogDescription>Informations complètes sur {selectedUser.name}</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="activity">Activité</TabsTrigger>
                <TabsTrigger value="settings">Paramètres</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                    <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                    <p className="text-muted-foreground">{selectedUser.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{selectedUser.role}</Badge>
                      <Badge variant="secondary">{selectedUser.status}</Badge>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Téléphone</Label>
                    <p className="text-sm">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <Label>Localisation</Label>
                    <p className="text-sm">{selectedUser.location}</p>
                  </div>
                  <div>
                    <Label>Date d'inscription</Label>
                    <p className="text-sm">{formatDate(selectedUser.joinDate)}</p>
                  </div>
                  <div>
                    <Label>Dernière activité</Label>
                    <p className="text-sm">{formatDate(selectedUser.lastActive)}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="activity" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{selectedUser.reportsCount}</div>
                    <div className="text-sm text-muted-foreground">Signalements</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{selectedUser.confirmationsCount}</div>
                    <div className="text-sm text-muted-foreground">Confirmations</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{selectedUser.rating}/5</div>
                    <div className="text-sm text-muted-foreground">Note moyenne</div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Compte vérifié</Label>
                    <Badge variant={selectedUser.verified ? "default" : "secondary"}>
                      {selectedUser.verified ? "Vérifié" : "Non vérifié"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Statut du compte</Label>
                    <Badge variant="outline">{selectedUser.status}</Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
