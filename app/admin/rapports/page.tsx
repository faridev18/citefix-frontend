"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"
import { FileText, Download, CalendarIcon, TrendingUp, Users, MapPin, Clock, CheckCircle2, Filter } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

// Données fictives pour les rapports
const reportData = {
  monthlyReports: [
    { month: "Jan", signalements: 65, resolus: 58, temps_moyen: 3.2 },
    { month: "Fév", signalements: 78, resolus: 72, temps_moyen: 2.8 },
    { month: "Mar", signalements: 92, resolus: 85, temps_moyen: 4.1 },
    { month: "Avr", signalements: 88, resolus: 81, temps_moyen: 3.5 },
    { month: "Mai", signalements: 95, resolus: 89, temps_moyen: 2.9 },
  ],
  categoryData: [
    { name: "Voirie", value: 35, color: "#ef4444" },
    { name: "Éclairage", value: 25, color: "#f59e0b" },
    { name: "Déchets", value: 20, color: "#10b981" },
    { name: "Sécurité", value: 15, color: "#3b82f6" },
    { name: "Autres", value: 5, color: "#8b5cf6" },
  ],
  zoneData: [
    { zone: "Centre-ville", signalements: 45, resolus: 42, taux: 93 },
    { zone: "Akpakpa", signalements: 38, resolus: 34, taux: 89 },
    { zone: "Dantokpa", signalements: 32, resolus: 28, taux: 88 },
    { zone: "Cadjehoun", signalements: 28, resolus: 25, taux: 89 },
    { zone: "Zogbo", signalements: 22, resolus: 18, taux: 82 },
  ],
  satisfactionData: [
    { periode: "S1", satisfaction: 4.1 },
    { periode: "S2", satisfaction: 4.3 },
    { periode: "S3", satisfaction: 4.2 },
    { periode: "S4", satisfaction: 4.4 },
    { periode: "S5", satisfaction: 4.2 },
  ],
  technicianPerformance: [
    { name: "Jean K.", interventions: 45, taux_reussite: 95, temps_moyen: 2.1 },
    { name: "Marie A.", interventions: 52, taux_reussite: 92, temps_moyen: 2.3 },
    { name: "Paul D.", interventions: 38, taux_reussite: 88, temps_moyen: 2.8 },
    { name: "Fatou K.", interventions: 29, taux_reussite: 94, temps_moyen: 2.0 },
  ],
}

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedZone, setSelectedZone] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2025, 4, 1), // 1er mai 2025
    to: new Date(2025, 4, 31), // 31 mai 2025
  })

  const generateReport = () => {
    alert("Génération du rapport en cours...")
  }

  const exportData = (format: string) => {
    alert(`Export en ${format} en cours...`)
  }

  return (
    <div className="container m-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Rapports et analyses</h1>
          <p className="text-muted-foreground">Analysez les performances et générez des rapports détaillés</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportData("PDF")}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => exportData("Excel")}>
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
          <Button onClick={generateReport}>
            <FileText className="mr-2 h-4 w-4" />
            Générer rapport
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres de rapport
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Période</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Quotidien</SelectItem>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  <SelectItem value="monthly">Mensuel</SelectItem>
                  <SelectItem value="quarterly">Trimestriel</SelectItem>
                  <SelectItem value="yearly">Annuel</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
              <Label>Catégorie</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="voirie">Voirie</SelectItem>
                  <SelectItem value="eclairage">Éclairage</SelectItem>
                  <SelectItem value="dechets">Déchets</SelectItem>
                  <SelectItem value="securite">Sécurité</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Plage de dates</Label>
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
                    onSelect={setDateRange as any}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="zones">Zones</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPIs principaux */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total signalements</p>
                    <p className="text-3xl font-bold">1,248</p>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12% vs mois dernier
                    </div>
                  </div>
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Taux de résolution</p>
                    <p className="text-3xl font-bold">87%</p>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +3% vs mois dernier
                    </div>
                  </div>
                  <div className="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Temps moyen</p>
                    <p className="text-3xl font-bold">3.2j</p>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      -0.3j vs mois dernier
                    </div>
                  </div>
                  <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Satisfaction</p>
                    <p className="text-3xl font-bold">4.2/5</p>
                    <div className="flex items-center text-xs text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +0.1 vs mois dernier
                    </div>
                  </div>
                  <div className="rounded-full bg-yellow-100 w-12 h-12 flex items-center justify-center">
                    <Users className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Graphiques principaux */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Évolution mensuelle</CardTitle>
                <CardDescription>Signalements et résolutions par mois</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={reportData.monthlyReports}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="signalements" fill="#3b82f6" name="Signalements" />
                    <Bar dataKey="resolus" fill="#10b981" name="Résolus" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition par catégorie</CardTitle>
                <CardDescription>Distribution des signalements par type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={reportData.categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {reportData.categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Temps de résolution moyen</CardTitle>
              <CardDescription>Évolution du temps de traitement par mois</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={reportData.monthlyReports}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temps_moyen" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance des techniciens</CardTitle>
              <CardDescription>Statistiques individuelles de performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.technicianPerformance.map((tech, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-medium">{tech.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-medium">{tech.name}</h3>
                        <p className="text-sm text-muted-foreground">{tech.interventions} interventions</p>
                      </div>
                    </div>
                    <div className="flex gap-6 text-center">
                      <div>
                        <div className="text-lg font-semibold text-green-600">{tech.taux_reussite}%</div>
                        <div className="text-xs text-muted-foreground">Taux de réussite</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{tech.temps_moyen}j</div>
                        <div className="text-xs text-muted-foreground">Temps moyen</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance par zone</CardTitle>
              <CardDescription>Analyse des signalements par secteur géographique</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={reportData.zoneData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="zone" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="signalements" fill="#3b82f6" name="Signalements" />
                  <Bar dataKey="resolus" fill="#10b981" name="Résolus" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Taux de résolution par zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.zoneData.map((zone, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{zone.zone}</span>
                      <span>
                        {zone.taux}% ({zone.resolus}/{zone.signalements})
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${zone.taux}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution de la satisfaction</CardTitle>
              <CardDescription>Note moyenne de satisfaction des citoyens</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={reportData.satisfactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="periode" />
                  <YAxis domain={[3.5, 5]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="satisfaction" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Commentaires récents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { rating: 5, comment: "Intervention très rapide, merci !", date: "Il y a 2h" },
                    { rating: 4, comment: "Bon travail, mais un peu de retard", date: "Il y a 5h" },
                    { rating: 5, comment: "Parfait, problème résolu rapidement", date: "Il y a 1j" },
                  ].map((feedback, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${i < feedback.rating ? "text-yellow-500" : "text-gray-300"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{feedback.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition des notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-sm w-4">{rating}★</span>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{
                            width: `${rating === 5 ? 60 : rating === 4 ? 25 : rating === 3 ? 10 : rating === 2 ? 3 : 2}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">
                        {rating === 5
                          ? "60%"
                          : rating === 4
                            ? "25%"
                            : rating === 3
                              ? "10%"
                              : rating === 2
                                ? "3%"
                                : "2%"}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
