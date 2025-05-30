"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, ArrowLeft, MapPin } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background">
      <div className="container max-w-2xl mx-auto px-4">
        <Card className="text-center">
          <CardContent className="p-12">
            <div className="mb-8">
              <div className="text-8xl font-bold text-primary mb-4">404</div>
              <h1 className="text-3xl font-bold mb-2">Page non trouvée</h1>
              <p className="text-muted-foreground text-lg">
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
              </p>
            </div>

            <div className="mb-8">
              <div className="rounded-full bg-muted w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Il semble que vous vous soyez perdu dans CitéFix. Pas de panique, nous allons vous aider à retrouver
                votre chemin !
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Retour à l'accueil
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/recherche">
                    <Search className="mr-2 h-4 w-4" />
                    Rechercher
                  </Link>
                </Button>
              </div>

              <Button variant="ghost" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Page précédente
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t">
              <h3 className="font-semibold mb-4">Pages populaires</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/carte">Carte interactive</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/signaler">Signaler un problème</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/mes-signalements">Mes signalements</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/aide">Centre d'aide</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
