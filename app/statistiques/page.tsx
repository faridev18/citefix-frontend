"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { TrendingUp, MapPin, Clock, CheckCircle2, Users, Download, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Données fictives pour les statistiques publiques
const publicStats = {
  overview: {
    totalReports: 1248,
    resolvedReports: 876,
    averageResolutionTime: 3.2,
    activeUsers: 2847,
    resolutionRate: 70,
    userSatisfaction: 4.2,
  },
  monthlyData: [
    { month: "Jan", signalements: 65, resolus: 58, nouveaux_utilisateurs: 120 },
    { month: "Fév", signalements: 78, resolus: 72, nouveaux_utilisateurs: 145 },
    { month: "Mar", signalements: 92, resolus: 85, nouveaux_utilisateurs: 167 },
    { month: "Avr", signalements: 88, resolus: 81, nouveaux_utilisateurs: 134 },
    { month: "Mai", signalements: 95, resolus: 89, nouveaux_utilisateurs: 189 },
  ],
  categoryData: [
    { name: "Voirie", value: 35, count: 437, color: "#ef4444" },
    { name: "Éclairage", value: 25, count: 312, color: "#f59e0b" },
    { name: "Déchets", value: 20, count: 250, color: "#10b981" },
    { name: "Sécurité", value: 15, count: 187, color: "#3b82f6" },
    { name: "Autres", value: 5, count: 62, color: "#8b5cf6" },
  ],
  zoneData: [
    { zone: "Centre-ville", signalements: 245, resolus: 228, taux: 93 },
    { zone: "Akpakpa", signalements: 198, resolus: 176, taux: 89 },
    { zone: "Dantokpa", signalements: 167, resolus: 148, taux: 89 },
    { zone: "Cadjehoun", signalements: 134, resolus: 119, taux: 89 },
    { zone: "Zogbo", signalements: 98, resolus: 80, taux: 82 },
  ],
  timeData: [
    { periode: "0-24h", pourcentage: 15 },
    { periode: "1-3j", pourcentage: 35 },
    { periode: "4-7j", pourcentage: 30 },
    { periode: "1-2sem", pourcentage: 15 },
    { periode: "+2sem", pourcentage: 5 },
  ],
  satisfactionTrend: [
    { mois: "Jan", satisfaction: 4.0 },
    { mois: "Fév", satisfaction: 4.1 },
    { mois: "Mar", satisfaction: 4.2 },
    { mois: "Avr", satisfaction: 4.1 },
    { mois: "Mai", satisfaction: 4.2 },
  ],
}

export default function StatistiquesPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [selectedZone, setSelectedZone] = useState("all")

  const exportData = () => {
    alert("Export des données en cours...")
  }

  const shareStats = () => {
    alert("Lien de partage copié dans le presse-papier !")
  }

  return (
    <div className="container m-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Statistiques publiques</h1>
          <p className="text-muted-foreground">Transparence et suivi de l'activité CitéFix</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Dernier mois</SelectItem>
              <SelectItem value="3months">3 derniers mois</SelectItem>
              <SelectItem value="6months">6 derniers mois</SelectItem>
              <SelectItem value="1year">Dernière année</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={shareStats}>
            <Share2 className="mr-2 h-4 w-4" />
            Partager
          </Button>
          <Button variant="outline" onClick={exportData}>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Indicateurs clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total signalements</p>
                <p className="text-3xl font-bold">{publicStats.overview.totalReports.toLocaleString()}</p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% ce mois
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
                <p className="text-3xl font-bold">{publicStats.overview.resolutionRate}%</p>
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
                <p className="text-3xl font-bold">{publicStats.overview.averageResolutionTime}j</p>
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
                <p className="text-sm font-medium text-muted-foreground">Utilisateurs actifs</p>
                <p className="text-3xl font-bold">{publicStats.overview.activeUsers.toLocaleString()}</p>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% ce mois
                </div>
              </div>
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
          <TabsTrigger value="zones">Zones</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Évolution mensuelle */}
          <Card>
            <CardHeader>
              <CardTitle>Évolution des signalements</CardTitle>
              <CardDescription>Signalements et résolutions par mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <div className="grid grid-cols-5 gap-4 h-full">
                  {publicStats.monthlyData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center justify-end space-y-2">
                      <div className="flex flex-col items-center space-y-1">
                        <div
                          className="w-8 bg-primary rounded-t"
                          style={{ height: `${(data.signalements / 100) * 120}px` }}
                        />
                        <div
                          className="w-8 bg-green-500 rounded-t"
                          style={{ height: `${(data.resolus / 100) * 120}px` }}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">{data.month}</p>
                        <p className="text-xs text-muted-foreground">{data.signalements}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded" />
                    <span className="text-sm">Signalements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded" />
                    <span className="text-sm">Résolus</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Satisfaction utilisateurs */}
          <Card>
            <CardHeader>
              <CardTitle>Satisfaction des utilisateurs</CardTitle>
              <CardDescription>Note moyenne de satisfaction (sur 5)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary mb-2">{publicStats.overview.userSatisfaction}/5</div>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${
                        i < Math.floor(publicStats.overview.userSatisfaction) ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {publicStats.satisfactionTrend.map((data, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-medium">{data.satisfaction}</div>
                    <div className="text-xs text-muted-foreground">{data.mois}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Répartition par catégorie</CardTitle>
              <CardDescription>Distribution des signalements par type de problème</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publicStats.categoryData.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }} />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">{category.count}</span>
                        <span className="text-sm text-muted-foreground ml-1">({category.value}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ width: `${category.value}%`, backgroundColor: category.color }}
                      />
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
              <CardDescription>Statistiques par secteur géographique</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publicStats.zoneData.map((zone, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{zone.zone}</h3>
                      <Badge variant={zone.taux >= 90 ? "default" : zone.taux >= 85 ? "secondary" : "destructive"}>
                        {zone.taux}% résolus
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-lg">{zone.signalements}</div>
                        <div className="text-muted-foreground">Signalements</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-lg text-green-600">{zone.resolus}</div>
                        <div className="text-muted-foreground">Résolus</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-lg">{zone.signalements - zone.resolus}</div>
                        <div className="text-muted-foreground">En cours</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${zone.taux}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Temps de résolution</CardTitle>
              <CardDescription>Répartition des délais de traitement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publicStats.timeData.map((time, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{time.periode}</span>
                    <div className="flex items-center gap-2 flex-1 mx-4">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${time.pourcentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12">{time.pourcentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Objectifs de performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Résolution sous 24h</span>
                    <span className="font-medium">15% (Objectif: 20%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "75%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Résolution sous 7j</span>
                    <span className="font-medium">80% (Objectif: 85%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Satisfaction {String.fromCharCode(62)} 4/5</span>
                    <span className="font-medium">4.2/5 (Objectif: 4.0/5)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impact CitéFix</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">876</div>
                  <div className="text-sm text-green-600">Problèmes résolus</div>
                </div>
                <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">2,847</div>
                  <div className="text-sm text-blue-600">Citoyens engagés</div>
                </div>
                <div className="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">12</div>
                  <div className="text-sm text-purple-600">Techniciens actifs</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Note de transparence */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Transparence et engagement</h3>
            <p className="text-muted-foreground text-sm">
              Ces statistiques sont mises à jour en temps réel pour assurer une transparence totale sur l'efficacité de
              CitéFix. Notre engagement est d'améliorer continuellement la qualité de vie urbaine grâce à votre
              participation active.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button variant="outline" size="sm" asChild>
                <a href="/a-propos">En savoir plus</a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="/signaler">Signaler un problème</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
