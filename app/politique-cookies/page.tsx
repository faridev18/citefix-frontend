"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Cookie, Shield, BarChart3, Target } from "lucide-react"
import { useState } from "react"

export default function PolitiqueCookiesPage() {
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false,
  })

  const handleSavePreferences = () => {
    // Save cookie preferences
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences))
    alert("Vos préférences ont été sauvegardées")
  }

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setPreferences(newPreferences)
    localStorage.setItem("cookiePreferences", JSON.stringify(newPreferences))
    alert("Tous les cookies ont été acceptés")
  }

  const handleRejectAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    setPreferences(newPreferences)
    localStorage.setItem("cookiePreferences", JSON.stringify(newPreferences))
    alert("Seuls les cookies nécessaires ont été conservés")
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Politique des cookies</h1>
          <p className="text-muted-foreground">
            Découvrez comment CitéFix utilise les cookies et gérez vos préférences
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5" />
                Qu'est-ce qu'un cookie ?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors
                de la visite d'un site web. Il permet au site de reconnaître votre terminal et de stocker certaines
                informations sur vos préférences ou actions passées.
              </p>
              <p className="text-muted-foreground">
                Les cookies que nous utilisons ne contiennent aucune information personnelle permettant de vous
                identifier directement. Ils améliorent votre expérience de navigation et nous aident à améliorer notre
                site.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Types de cookies utilisés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Cookies nécessaires</h3>
                      <p className="text-sm text-muted-foreground">
                        Indispensables au fonctionnement du site. Ils permettent l'utilisation des principales
                        fonctionnalités comme la connexion et la navigation sécurisée.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Durée : Session ou 30 jours maximum</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={preferences.necessary} disabled />
                    <Label className="text-sm text-muted-foreground">Toujours actif</Label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Cookies analytiques</h3>
                      <p className="text-sm text-muted-foreground">
                        Nous aident à comprendre comment vous utilisez notre site en collectant des informations
                        anonymes sur votre navigation.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Durée : 2 ans maximum</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.analytics}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Cookies marketing</h3>
                      <p className="text-sm text-muted-foreground">
                        Utilisés pour vous proposer des contenus et publicités adaptés à vos centres d'intérêt sur notre
                        site et d'autres sites web.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Durée : 1 an maximum</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.marketing}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <Cookie className="h-5 w-5 text-orange-600 mt-1" />
                    <div>
                      <h3 className="font-semibold">Cookies fonctionnels</h3>
                      <p className="text-sm text-muted-foreground">
                        Permettent d'améliorer votre expérience en mémorisant vos préférences comme la langue, le thème
                        ou votre localisation.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Durée : 1 an maximum</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.functional}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, functional: checked })}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleAcceptAll} className="flex-1">
                  Accepter tous les cookies
                </Button>
                <Button onClick={handleRejectAll} variant="outline" className="flex-1">
                  Rejeter les cookies optionnels
                </Button>
                <Button onClick={handleSavePreferences} variant="secondary" className="flex-1">
                  Sauvegarder mes préférences
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies tiers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Notre site peut contenir des cookies provenant de services tiers que nous utilisons :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <strong>Google Analytics :</strong> Pour analyser l'audience et l'utilisation du site
                </li>
                <li>
                  <strong>Vercel Analytics :</strong> Pour surveiller les performances du site
                </li>
                <li>
                  <strong>OpenStreetMap :</strong> Pour afficher les cartes interactives
                </li>
              </ul>
              <p className="text-muted-foreground">
                Ces services ont leurs propres politiques de cookies que nous vous encourageons à consulter.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestion des cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Vous pouvez à tout moment modifier vos préférences de cookies en :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Utilisant les paramètres ci-dessus sur cette page</li>
                <li>Configurant votre navigateur pour refuser les cookies</li>
                <li>Supprimant les cookies déjà stockés sur votre appareil</li>
              </ul>
              <p className="text-muted-foreground">
                <strong>Attention :</strong> La désactivation de certains cookies peut affecter le fonctionnement du
                site et votre expérience utilisateur.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pour toute question concernant notre politique des cookies, vous pouvez nous contacter à :
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Email :</strong> privacy@citefix.bj
                <br />
                <strong>Adresse :</strong> Avenue de la République, Cotonou, Bénin
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Dernière mise à jour :</strong> 31 mai 2025
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
