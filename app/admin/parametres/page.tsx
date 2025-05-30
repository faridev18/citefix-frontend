"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Save, RefreshCw, Shield, Bell, Database, Globe, MapPin, Clock, AlertTriangle } from "lucide-react"

export default function ParametresPage() {
  const [settings, setSettings] = useState({
    // Paramètres généraux
    siteName: "CitéFix",
    siteDescription: "Plateforme citoyenne pour signaler les problèmes urbains",
    contactEmail: "contact@citefix.bj",
    supportPhone: "+229 XX XX XX XX",

    // Paramètres de notification
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    notificationDelay: "immediate",

    // Paramètres de modération
    autoValidation: false,
    moderationRequired: true,
    maxPhotosPerReport: 5,
    maxReportLength: 1000,

    // Paramètres techniques
    maintenanceMode: false,
    debugMode: false,
    cacheEnabled: true,
    backupFrequency: "daily",

    // Paramètres de géolocalisation
    defaultCity: "Cotonou",
    mapProvider: "openstreetmap",
    geolocRequired: true,
    radiusLimit: 50,

    // Paramètres de performance
    maxConcurrentUsers: 1000,
    sessionTimeout: 30,
    fileUploadLimit: 10,
    apiRateLimit: 100,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simuler la sauvegarde
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
    alert("Paramètres sauvegardés avec succès !")
  }

  const handleReset = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?")) {
      // Réinitialiser aux valeurs par défaut
      alert("Paramètres réinitialisés")
    }
  }

  return (
    <div className="container m-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Paramètres système</h1>
          <p className="text-muted-foreground">Configurez les paramètres de la plateforme CitéFix</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Réinitialiser
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Sauvegarde...
              </div>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="moderation">Modération</TabsTrigger>
          <TabsTrigger value="technical">Technique</TabsTrigger>
          <TabsTrigger value="geolocation">Géolocalisation</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Informations générales
              </CardTitle>
              <CardDescription>Paramètres de base de la plateforme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nom du site</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de contact</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Description du site</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportPhone">Téléphone de support</Label>
                <Input
                  id="supportPhone"
                  value={settings.supportPhone}
                  onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statut du système</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Base de données</p>
                    <p className="text-sm text-muted-foreground">Connectée</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Opérationnelle
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Service email</p>
                    <p className="text-sm text-muted-foreground">SMTP actif</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Opérationnel
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Stockage</p>
                    <p className="text-sm text-muted-foreground">75% utilisé</p>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Attention
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Paramètres de notification
              </CardTitle>
              <CardDescription>Configurez les notifications système</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications par email</Label>
                    <p className="text-sm text-muted-foreground">Envoyer des emails pour les événements importants</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications SMS</Label>
                    <p className="text-sm text-muted-foreground">Envoyer des SMS pour les urgences</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications push</Label>
                    <p className="text-sm text-muted-foreground">Notifications push pour les applications mobiles</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Délai de notification</Label>
                <Select
                  value={settings.notificationDelay}
                  onValueChange={(value) => setSettings({ ...settings, notificationDelay: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immédiat</SelectItem>
                    <SelectItem value="5min">5 minutes</SelectItem>
                    <SelectItem value="15min">15 minutes</SelectItem>
                    <SelectItem value="1hour">1 heure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Paramètres de modération
              </CardTitle>
              <CardDescription>Configurez les règles de modération du contenu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Validation automatique</Label>
                    <p className="text-sm text-muted-foreground">Valider automatiquement les signalements</p>
                  </div>
                  <Switch
                    checked={settings.autoValidation}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoValidation: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Modération requise</Label>
                    <p className="text-sm text-muted-foreground">Tous les signalements doivent être modérés</p>
                  </div>
                  <Switch
                    checked={settings.moderationRequired}
                    onCheckedChange={(checked) => setSettings({ ...settings, moderationRequired: checked })}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Photos maximum par signalement</Label>
                  <Input
                    type="number"
                    value={settings.maxPhotosPerReport}
                    onChange={(e) => setSettings({ ...settings, maxPhotosPerReport: Number.parseInt(e.target.value) })}
                    min="1"
                    max="10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Longueur maximum du signalement</Label>
                  <Input
                    type="number"
                    value={settings.maxReportLength}
                    onChange={(e) => setSettings({ ...settings, maxReportLength: Number.parseInt(e.target.value) })}
                    min="100"
                    max="5000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Paramètres techniques
              </CardTitle>
              <CardDescription>Configuration technique de la plateforme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mode maintenance</Label>
                    <p className="text-sm text-muted-foreground">Activer le mode maintenance</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mode debug</Label>
                    <p className="text-sm text-muted-foreground">Activer les logs de débogage</p>
                  </div>
                  <Switch
                    checked={settings.debugMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, debugMode: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cache activé</Label>
                    <p className="text-sm text-muted-foreground">Utiliser le cache pour améliorer les performances</p>
                  </div>
                  <Switch
                    checked={settings.cacheEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, cacheEnabled: checked })}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Fréquence de sauvegarde</Label>
                <Select
                  value={settings.backupFrequency}
                  onValueChange={(value) => setSettings({ ...settings, backupFrequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Toutes les heures</SelectItem>
                    <SelectItem value="daily">Quotidienne</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geolocation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Paramètres de géolocalisation
              </CardTitle>
              <CardDescription>Configuration de la géolocalisation et des cartes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ville par défaut</Label>
                  <Input
                    value={settings.defaultCity}
                    onChange={(e) => setSettings({ ...settings, defaultCity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fournisseur de cartes</Label>
                  <Select
                    value={settings.mapProvider}
                    onValueChange={(value) => setSettings({ ...settings, mapProvider: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openstreetmap">OpenStreetMap</SelectItem>
                      <SelectItem value="google">Google Maps</SelectItem>
                      <SelectItem value="mapbox">Mapbox</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Géolocalisation requise</Label>
                  <p className="text-sm text-muted-foreground">Exiger la géolocalisation pour les signalements</p>
                </div>
                <Switch
                  checked={settings.geolocRequired}
                  onCheckedChange={(checked) => setSettings({ ...settings, geolocRequired: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label>Rayon limite (km)</Label>
                <Input
                  type="number"
                  value={settings.radiusLimit}
                  onChange={(e) => setSettings({ ...settings, radiusLimit: Number.parseInt(e.target.value) })}
                  min="1"
                  max="100"
                />
                <p className="text-sm text-muted-foreground">Distance maximum autorisée pour les signalements</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Paramètres de performance
              </CardTitle>
              <CardDescription>Configuration des limites et performances</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Utilisateurs simultanés maximum</Label>
                  <Input
                    type="number"
                    value={settings.maxConcurrentUsers}
                    onChange={(e) => setSettings({ ...settings, maxConcurrentUsers: Number.parseInt(e.target.value) })}
                    min="100"
                    max="10000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Timeout de session (minutes)</Label>
                  <Input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({ ...settings, sessionTimeout: Number.parseInt(e.target.value) })}
                    min="5"
                    max="120"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Limite upload fichier (MB)</Label>
                  <Input
                    type="number"
                    value={settings.fileUploadLimit}
                    onChange={(e) => setSettings({ ...settings, fileUploadLimit: Number.parseInt(e.target.value) })}
                    min="1"
                    max="50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Limite API (req/min)</Label>
                  <Input
                    type="number"
                    value={settings.apiRateLimit}
                    onChange={(e) => setSettings({ ...settings, apiRateLimit: Number.parseInt(e.target.value) })}
                    min="10"
                    max="1000"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Attention</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Modifier ces paramètres peut affecter les performances de la plateforme. Testez soigneusement avant de
                  déployer en production.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
