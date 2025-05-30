"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Clock, MapPin, Save, AlertTriangle, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

// Données fictives
const availableReports = [
  {
    id: "1",
    title: "Lampadaire cassé devant l'école",
    category: "éclairage",
    location: "Rue des Écoles, Cotonou",
    priority: "Haute",
    status: "Validé",
    estimatedDuration: "2h",
  },
  {
    id: "2",
    title: "Nid de poule dangereux",
    category: "voirie",
    location: "Avenue de la Liberté, Cotonou",
    priority: "Haute",
    status: "Validé",
    estimatedDuration: "4h",
  },
  {
    id: "3",
    title: "Dépôt sauvage de déchets",
    category: "déchets",
    location: "Marché Dantokpa, Cotonou",
    priority: "Moyenne",
    status: "Validé",
    estimatedDuration: "1h",
  },
]

const availableTechnicians = [
  {
    id: "1",
    name: "Jean Kouassi",
    avatar: "/placeholder.svg?height=40&width=40",
    specialties: ["Éclairage", "Électricité"],
    availability: "Disponible",
    zone: "Centre-ville",
  },
  {
    id: "2",
    name: "Marie Adjovi",
    avatar: "/placeholder.svg?height=40&width=40",
    specialties: ["Voirie", "Travaux publics"],
    availability: "Disponible",
    zone: "Akpakpa",
  },
  {
    id: "3",
    name: "Paul Dossou",
    avatar: "/placeholder.svg?height=40&width=40",
    specialties: ["Déchets", "Nettoyage"],
    availability: "Occupé",
    zone: "Dantokpa",
  },
]

export default function PlanifierInterventionPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [selectedTechnician, setSelectedTechnician] = useState("")
  const [interventionType, setInterventionType] = useState("")
  const [priority, setPriority] = useState("")
  const [description, setDescription] = useState("")
  const [estimatedDuration, setEstimatedDuration] = useState("")
  const [materials, setMaterials] = useState("")
  const [notes, setNotes] = useState("")

  const handleReportSelection = (reportId: string, checked: boolean) => {
    if (checked) {
      setSelectedReports([...selectedReports, reportId])
    } else {
      setSelectedReports(selectedReports.filter((id) => id !== reportId))
    }
  }

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !selectedTechnician || selectedReports.length === 0) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    alert("Intervention planifiée avec succès !")
  }

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

  return (
    <div className="container m-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Planifier une intervention</h1>
          <p className="text-muted-foreground">Organisez et assignez les interventions techniques</p>
        </div>
        <Button onClick={handleSubmit}>
          <Save className="mr-2 h-4 w-4" />
          Planifier l'intervention
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulaire principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sélection des signalements */}
          <Card>
            <CardHeader>
              <CardTitle>Signalements à traiter</CardTitle>
              <CardDescription>Sélectionnez les signalements pour cette intervention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableReports.map((report) => (
                  <div key={report.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={report.id}
                      checked={selectedReports.includes(report.id)}
                      onCheckedChange={(checked) => handleReportSelection(report.id, checked as boolean)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{report.category}</Badge>
                        <Badge variant={getPriorityColor(report.priority)}>{report.priority}</Badge>
                        <Badge variant="secondary">{report.status}</Badge>
                      </div>
                      <h3 className="font-medium">{report.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{report.location}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>~{report.estimatedDuration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Détails de l'intervention */}
          <Card>
            <CardHeader>
              <CardTitle>Détails de l'intervention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type d'intervention</Label>
                  <Select value={interventionType} onValueChange={setInterventionType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="reparation">Réparation</SelectItem>
                      <SelectItem value="installation">Installation</SelectItem>
                      <SelectItem value="nettoyage">Nettoyage</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Priorité</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la priorité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgente">Urgente</SelectItem>
                      <SelectItem value="haute">Haute</SelectItem>
                      <SelectItem value="moyenne">Moyenne</SelectItem>
                      <SelectItem value="basse">Basse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description de l'intervention</Label>
                <Textarea
                  placeholder="Décrivez les travaux à effectuer..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Durée estimée</Label>
                  <Input
                    placeholder="ex: 2h30"
                    value={estimatedDuration}
                    onChange={(e) => setEstimatedDuration(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Matériel requis</Label>
                  <Input
                    placeholder="Liste du matériel nécessaire"
                    value={materials}
                    onChange={(e) => setMaterials(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes additionnelles</Label>
                <Textarea
                  placeholder="Instructions spéciales, précautions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Planification et assignation */}
        <div className="space-y-6">
          {/* Date et heure */}
          <Card>
            <CardHeader>
              <CardTitle>Planification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Date d'intervention</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "dd MMMM yyyy", { locale: fr }) : "Sélectionner une date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Heure de début</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner l'heure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="07:00">07:00</SelectItem>
                    <SelectItem value="08:00">08:00</SelectItem>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="13:00">13:00</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Assignation du technicien */}
          <Card>
            <CardHeader>
              <CardTitle>Assignation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableTechnicians.map((tech) => (
                  <div
                    key={tech.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedTechnician === tech.id
                        ? "border-primary bg-primary/5"
                        : tech.availability === "Occupé"
                          ? "border-muted bg-muted/50 cursor-not-allowed"
                          : "hover:bg-muted/50"
                    }`}
                    onClick={() => tech.availability === "Disponible" && setSelectedTechnician(tech.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={tech.avatar || "/placeholder.svg"} alt={tech.name} />
                        <AvatarFallback>{tech.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-medium">{tech.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={tech.availability === "Disponible" ? "secondary" : "outline"}
                            className={tech.availability === "Disponible" ? "bg-green-100 text-green-800" : ""}
                          >
                            {tech.availability}
                          </Badge>
                          <Badge variant="outline">{tech.zone}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tech.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {selectedTechnician === tech.id && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Résumé */}
          <Card>
            <CardHeader>
              <CardTitle>Résumé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <span className="font-medium">Signalements sélectionnés:</span>
                <span className="ml-2">{selectedReports.length}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Date:</span>
                <span className="ml-2">
                  {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: fr }) : "Non définie"}
                </span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Heure:</span>
                <span className="ml-2">{selectedTime || "Non définie"}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Technicien:</span>
                <span className="ml-2">
                  {selectedTechnician
                    ? availableTechnicians.find((t) => t.id === selectedTechnician)?.name
                    : "Non assigné"}
                </span>
              </div>

              {(!selectedDate || !selectedTime || !selectedTechnician || selectedReports.length === 0) && (
                <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Veuillez compléter tous les champs obligatoires</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
