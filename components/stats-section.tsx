"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Clock, Users, Activity } from "lucide-react"
import { useState } from "react"

// Données fictives pour les statistiques
const statsData = {
  totalReports: 1248,
  resolvedReports: 876,
  averageResolutionTime: "3.5 jours",
  activeUsers: 532,
}

export default function StatsSection() {
  const [stats] = useState(statsData)

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">CitéFix en chiffres</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Découvrez l&apos;impact de notre plateforme sur l&apos;amélioration de l&apos;environnement urbain.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-background">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div className="text-4xl font-bold mb-2">{stats.totalReports}</div>
            <p className="text-muted-foreground">Signalements créés</p>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <div className="text-4xl font-bold mb-2">{stats.resolvedReports}</div>
            <p className="text-muted-foreground">Problèmes résolus</p>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="text-4xl font-bold mb-2">{stats.averageResolutionTime}</div>
            <p className="text-muted-foreground">Temps moyen de résolution</p>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-4xl font-bold mb-2">{stats.activeUsers}</div>
            <p className="text-muted-foreground">Utilisateurs actifs</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
