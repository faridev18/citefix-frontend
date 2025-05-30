"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home, Mail } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log l'erreur pour le monitoring
    console.error("Erreur de l'application:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-background">
      <div className="container max-w-2xl mx-auto px-4">
        <Card className="text-center border-red-200">
          <CardContent className="p-12">
            <div className="mb-8">
              <div className="rounded-full bg-red-100 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="h-12 w-12 text-red-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2 text-red-900">Une erreur s'est produite</h1>
              <p className="text-muted-foreground text-lg">
                Nous sommes désolés, quelque chose s'est mal passé. Notre équipe a été automatiquement notifiée.
              </p>
            </div>

            {process.env.NODE_ENV === "development" && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <h3 className="font-semibold text-red-800 mb-2">Détails de l'erreur (mode développement)</h3>
                <code className="text-sm text-red-700 break-all">{error.message}</code>
                {error.digest && <p className="text-xs text-red-600 mt-2">ID d'erreur: {error.digest}</p>}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={reset} size="lg">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Réessayer
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Retour à l'accueil
                  </Link>
                </Button>
              </div>

              <Button variant="ghost" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Signaler le problème
                </Link>
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t">
              <h3 className="font-semibold mb-4">Que faire maintenant ?</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>• Essayez de rafraîchir la page en cliquant sur "Réessayer"</p>
                <p>• Vérifiez votre connexion internet</p>
                <p>• Si le problème persiste, contactez notre support</p>
                <p>• Revenez plus tard, nous travaillons à résoudre le problème</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Besoin d'aide immédiate ?</strong>
                <br />
                Contactez-nous au +229 XX XX XX XX ou par email à support@citefix.bj
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
