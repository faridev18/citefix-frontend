"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { MapPin, Clock, CheckCircle2, Camera, Navigation, Phone, MessageSquare, Calendar, User } from "lucide-react"
import Link from "next/link"

// Données fictives pour les interventions
const interventionsData = [
  {
    id: "1",
    reportId: "1",
    title: "Lampadaire cassé devant l'école",
    category: "éclairage",
    location: "Rue des Écoles, Cotonou",
    coordinates: [6.3696, 2.4204],
    status: "Assigné",
    priority: "Haute",
    assignedDate: "2025-05-31T09:00:00Z",
    estimatedDuration: "2 heures",
    description: "Remplacement du lampadaire défectueux",
    citizen: {
      name: "Fatou Diarra",
      phone: "+229 XX XX XX XX",
    },
    technician: {
      name: "Jean Kouassi",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+229 YY YY YY YY",
    },
    materials: ["Lampadaire LED", "Câbles électriques", "Outils de base"],
    notes: "Vérifier l'alimentation électrique avant le remplacement",
  },
  {
    id: "2",
    reportId: "2",
    title: "Nid de poule dangereux",
    category: "voirie",
    location: "Avenue de la Liberté, Cotonou",
    coordinates: [6.3746, 2.4254],
    status: "En cours",
    priority: "Haute",
    assignedDate: "2025-05-31T08:00:00Z",
    startedDate: "2025-05-31T10:30:00Z",
    estimatedDuration: "4 heures",
    description: "Réparation du nid de poule et resurfaçage",
    citizen: {
      name: "Kofi Mensah",
      phone: "+229 XX XX XX XX",
    },
    technician: {
      name: "Marie Adjovi",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+229 YY YY YY YY",
    },
    materials: ["Asphalte", "Outils de terrassement", "Signalisation temporaire"],
    notes: "Intervention en cours, 60% terminé",
    progress: 60,
  },
  {
    id: "3",
    reportId: "3",
    title: "Dépôt sauvage de déchets",
    category: "déchets",
    location: "Marché Dantokpa, Cotonou",
    coordinates: [6.3646, 2.4154],
    status: "Planifié",
    priority: "Moyenne",
    scheduledDate: "2025-06-01T07:00:00Z",
    estimatedDuration: "1 heure",
    description: "Nettoyage et enlèvement des déchets",
    citizen: {
      name: "Ama Koffi",
      phone: "+229 XX XX XX XX",
    },
    technician: {
      name: "Paul Dossou",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+229 YY YY YY YY",
    },
    materials: ["Camion de collecte", "Équipement de nettoyage"],
    notes: "Prévoir une équipe de 3 personnes",
  },
]

// Fonction pour obtenir la couleur du statut
const getStatusColor = (status: string) => {
  switch (status) {
    case "Planifié":
      return "bg-blue-500"
    case "Assigné":
      return "bg-purple-500"
    case "En cours":
      return "bg-orange-500"
    case "Terminé":
      return "bg-green-500"
    case "Suspendu":
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
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export default function InterventionsPage() {
  const [interventions] = useState(interventionsData)
  const [selectedIntervention, setSelectedIntervention] = useState(interventions[0])
  const [activeTab, setActiveTab] = useState("assigned")

  // Filtrer les interventions selon l'onglet actif
  const filteredInterventions = interventions.filter((intervention) => {
    if (activeTab === "assigned") return intervention.status === "Assigné"
    if (activeTab === "inprogress") return intervention.status === "En cours"
    if (activeTab === "scheduled") return intervention.status === "Planifié"
    if (activeTab === "completed") return intervention.status === "Terminé"
    return true
  })

  // Démarrer une intervention
  const startIntervention = (id: string) => {
    alert(`Intervention ${id} démarrée !`)
  }

  // Terminer une intervention
  const completeIntervention = (id: string) => {
    alert(`Intervention ${id} terminée !`)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Interventions</h1>
          <p className="text-muted-foreground">Gérez vos interventions techniques</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/carte">
              <MapPin className="mr-2 h-4 w-4" />
              Voir sur la carte
            </Link>
          </Button>
          <Button asChild>
            <Link href="/interventions/planifier">
              <Calendar className="mr-2 h-4 w-4" />
              Planifier
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des interventions */}
        <div className="lg:col-span-1">
          <Card>
            <Tabs defaultValue="assigned" value={activeTab} onValueChange={setActiveTab}>
              <CardHeader className="pb-3">
                <CardTitle>Interventions</CardTitle>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="assigned">Assignées</TabsTrigger>
                  <TabsTrigger value="inprogress">En cours</TabsTrigger>
                </TabsList>
              </CardHeader>

              <TabsContent value={activeTab} className="mt-0">
                <CardContent>
                  <div className="space-y-3">
                    {filteredInterventions.map((intervention) => (
                      <div
                        key={intervention.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedIntervention.id === intervention.id
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedIntervention(intervention)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline">{intervention.category}</Badge>
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(intervention.status)}`} />
                            <Badge variant={getPriorityColor(intervention.priority)} className="text-xs">
                              {intervention.priority}
                            </Badge>
                          </div>
                        </div>
                        <h3 className="font-medium text-sm mb-1">{intervention.title}</h3>
                        <div className="flex items-center text-xs text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{intervention.location}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {intervention.assignedDate && formatDate(intervention.assignedDate)}
                          </span>
                          <span className="text-muted-foreground">{intervention.estimatedDuration}</span>
                        </div>
                        {intervention.progress && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progression</span>
                              <span>{intervention.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1">
                              <div
                                className="bg-primary h-1 rounded-full transition-all"
                                style={{ width: `${intervention.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Détails de l'intervention sélectionnée */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedIntervention.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{selectedIntervention.category}</Badge>
                    <Badge variant={getPriorityColor(selectedIntervention.priority)}>
                      {selectedIntervention.priority}
                    </Badge>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedIntervention.status)}`} />
                    <span className="text-sm text-muted-foreground">{selectedIntervention.status}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {selectedIntervention.status === "Assigné" && (
                    <Button onClick={() => startIntervention(selectedIntervention.id)}>
                      <Clock className="mr-2 h-4 w-4" />
                      Démarrer
                    </Button>
                  )}
                  {selectedIntervention.status === "En cours" && (
                    <Button onClick={() => completeIntervention(selectedIntervention.id)}>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Terminer
                    </Button>
                  )}
                  <Button variant="outline" asChild>
                    <Link href={`/signalements/${selectedIntervention.reportId}`}>Voir le signalement</Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Détails</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="materials">Matériel</TabsTrigger>
                  <TabsTrigger value="progress">Progression</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground">{selectedIntervention.description}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Localisation</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedIntervention.location}</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Navigation className="mr-2 h-4 w-4" />
                      Itinéraire
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Date d'assignation</h3>
                      <p className="text-muted-foreground">
                        {selectedIntervention.assignedDate && formatDate(selectedIntervention.assignedDate)}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Durée estimée</h3>
                      <p className="text-muted-foreground">{selectedIntervention.estimatedDuration}</p>
                    </div>
                  </div>

                  {selectedIntervention.notes && (
                    <div>
                      <h3 className="font-medium mb-2">Notes</h3>
                      <p className="text-muted-foreground">{selectedIntervention.notes}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-3">Citoyen</h3>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedIntervention.citizen.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedIntervention.citizen.phone}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Phone className="mr-2 h-4 w-4" />
                        Appeler
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Technicien assigné</h3>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={selectedIntervention.technician.avatar || "/placeholder.svg"}
                            alt={selectedIntervention.technician.name}
                          />
                          <AvatarFallback>{selectedIntervention.technician.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedIntervention.technician.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedIntervention.technician.phone}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="materials" className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-3">Matériel requis</h3>
                    <div className="space-y-2">
                      {selectedIntervention.materials.map((material, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 border rounded">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Ajouter du matériel</h3>
                    <div className="flex gap-2">
                      <Input placeholder="Nom du matériel" className="flex-1" />
                      <Button>Ajouter</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="progress" className="space-y-4">
                  {selectedIntervention.status === "En cours" && (
                    <div>
                      <h3 className="font-medium mb-3">Mise à jour de la progression</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="progress">Pourcentage d'avancement</Label>
                          <Input
                            id="progress"
                            type="number"
                            min="0"
                            max="100"
                            defaultValue={selectedIntervention.progress || 0}
                          />
                        </div>
                        <div>
                          <Label htmlFor="update">Commentaire de progression</Label>
                          <Textarea id="update" placeholder="Décrivez l'avancement des travaux..." rows={3} />
                        </div>
                        <div>
                          <Label htmlFor="photos">Photos de progression</Label>
                          <div className="flex items-center gap-2 mt-2">
                            <Input id="photos" type="file" accept="image/*" multiple />
                            <Button variant="outline" size="icon">
                              <Camera className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Button className="w-full">Mettre à jour la progression</Button>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-medium mb-3">Historique</h3>
                    <div className="space-y-3">
                      {[
                        { action: "Intervention assignée", time: "Il y a 2h", status: "assigned" },
                        { action: "Matériel préparé", time: "Il y a 1h", status: "prepared" },
                        { action: "Intervention démarrée", time: "Il y a 30min", status: "started" },
                      ].map((event, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 border-l-2 border-primary/20 pl-4">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              event.status === "assigned"
                                ? "bg-blue-500"
                                : event.status === "prepared"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{event.action}</p>
                            <p className="text-xs text-muted-foreground">{event.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
