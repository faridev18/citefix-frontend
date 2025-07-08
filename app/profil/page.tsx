"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, LogOut } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Récupère les infos de l'utilisateur connecté
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (!token) return

    fetch("http://localhost:3001/api/users/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .finally(() => setLoading(false))
  }, [])

  // Déconnexion simple
  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  if (loading) return <div className="container m-auto py-12">Chargement...</div>
  if (!user) return <div className="container m-auto py-12">Aucune information utilisateur</div>

  return (
    <div className="container m-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mon profil</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Infos principales */}
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center space-y-3">
            <Avatar className="h-20 w-20 mb-3">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name?.charAt(0) || <User />}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{user.name}</h2>
            {user.phone && <div className="text-muted-foreground">{user.phone}</div>}
            <Badge variant="outline">{user.role === "authority" ? "Autorité" : "Citoyen"}</Badge>
            <Separator className="my-3" />
            <Button variant="outline" className="w-full text-red-500 hover:text-red-600" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </CardContent>
        </Card>

        {/* Si tu veux : afficher les signalements de l’utilisateur */}
        <Card>
          <CardHeader>
            <CardTitle>Mes signalements</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="secondary">
              <a href="/mes-signalements">Voir tous mes signalements</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
