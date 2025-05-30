"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, MapPin, Bell, Shield, Settings, LogOut } from "lucide-react"

// Données fictives pour l'utilisateur
const userData = {
  name: "Fatou Diarra",
  email: "fatou@example.com",
  phone: "+229 XX XX XX XX",
  address: "Cotonou, Bénin",
  avatar: "/placeholder.svg?height=100&width=100",
  role: "citizen",
  created_at: "2025-01-15T10:12:00Z",
  reports: {
    total: 12,
    resolved: 8,
    pending: 4,
  },
}

export default function ProfilePage() {
  const [user] = useState(userData)
  const [isLoading, setIsLoading] = useState(false)

  // Gérer la mise à jour du profil
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler une mise à jour
    setTimeout(() => {
      setIsLoading(false)
      alert("Profil mis à jour avec succès !")
    }, 1500)
  }

  // Gérer la mise à jour du mot de passe
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler une mise à jour
    setTimeout(() => {
      setIsLoading(false)
      alert("Mot de passe mis à jour avec succès !")
    }, 1500)
  }

  return (
    <div className="container m-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mon profil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <Badge variant="outline" className="mt-2">
                {user.role === "citizen" ? "Citoyen" : "Autorité"}
              </Badge>
              <div className="w-full mt-6 pt-6 border-t flex justify-around">
                <div className="text-center">
                  <p className="text-2xl font-bold">{user.reports.total}</p>
                  <p className="text-xs text-muted-foreground">Signalements</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">{user.reports.resolved}</p>
                  <p className="text-xs text-muted-foreground">Résolus</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-500">{user.reports.pending}</p>
                  <p className="text-xs text-muted-foreground">En attente</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/profil">
                  <User className="mr-2 h-4 w-4" />
                  Mon profil
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/mes-signalements">
                  <MapPin className="mr-2 h-4 w-4" />
                  Mes signalements
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/notifications">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/confidentialite">
                  <Shield className="mr-2 h-4 w-4" />
                  Confidentialité
                </a>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="/parametres">
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres
                </a>
              </Button>
              <Separator className="my-2" />
              <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <Tabs defaultValue="informations">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Paramètres du compte</CardTitle>
                  <TabsList>
                    <TabsTrigger value="informations">Informations</TabsTrigger>
                    <TabsTrigger value="securite">Sécurité</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  </TabsList>
                </div>
                <CardDescription>Gérez vos informations personnelles et vos préférences</CardDescription>
              </CardHeader>

              <TabsContent value="informations">
                <form onSubmit={handleProfileUpdate}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input id="name" defaultValue={user.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user.email} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input id="phone" defaultValue={user.phone} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input id="address" defaultValue={user.address} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avatar">Photo de profil</Label>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Input id="avatar" type="file" accept="image/*" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                          Mise à jour...
                        </div>
                      ) : (
                        "Enregistrer les modifications"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>

              <TabsContent value="securite">
                <form onSubmit={handlePasswordUpdate}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mot de passe actuel</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nouveau mot de passe</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Authentification à deux facteurs</h3>
                      <div className="flex items-center space-x-2">
                        <Switch id="two-factor" />
                        <Label htmlFor="two-factor">Activer l&apos;authentification à deux facteurs</Label>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Recevez un code de vérification par SMS à chaque connexion
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                          Mise à jour...
                        </div>
                      ) : (
                        "Mettre à jour le mot de passe"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>

              <TabsContent value="notifications">
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Préférences de notification</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notif">Notifications par email</Label>
                          <p className="text-xs text-muted-foreground">
                            Recevez des emails pour les mises à jour de vos signalements
                          </p>
                        </div>
                        <Switch id="email-notif" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-notif">Notifications push</Label>
                          <p className="text-xs text-muted-foreground">
                            Recevez des notifications push sur votre appareil
                          </p>
                        </div>
                        <Switch id="push-notif" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sms-notif">Notifications SMS</Label>
                          <p className="text-xs text-muted-foreground">
                            Recevez des SMS pour les mises à jour importantes
                          </p>
                        </div>
                        <Switch id="sms-notif" />
                      </div>
                    </div>
                    <Separator />
                    <h3 className="text-sm font-medium">Types de notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="status-notif">Changements de statut</Label>
                        <Switch id="status-notif" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="comment-notif">Nouveaux commentaires</Label>
                        <Switch id="comment-notif" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="nearby-notif">Signalements à proximité</Label>
                        <Switch id="nearby-notif" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Enregistrer les préférences</Button>
                </CardFooter>
              </TabsContent>
            </Tabs>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className={`w-2 h-2 mt-2 rounded-full ${i === 1 ? "bg-green-500" : "bg-blue-500"}`} />
                    <div>
                      <p className="text-sm">
                        {i === 1
                          ? 'Votre signalement "Nid de poule dangereux" a été marqué comme résolu'
                          : i === 2
                            ? 'Vous avez créé un nouveau signalement "Lampadaire cassé"'
                            : "Vous avez commenté sur un signalement"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Il y a {i} jour{i > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href="/activite">Voir toute l&apos;activité</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
