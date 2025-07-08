"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, LogIn, UserPlus, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("connexion")
  const router = useRouter()

  // Connexion
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Inscription
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerConfirm, setRegisterConfirm] = useState("")


  // Gérer la connexion
  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem("token", data.token)
        window.dispatchEvent(new Event("auth"))
        toast.success("Connexion réussie !")
        router.push("/mes-signalements")
      } else {
        toast.error(data.error || "Erreur de connexion")
      }
    } catch (err) {
      toast.error("Erreur réseau")
    } finally {
      setIsLoading(false)
    }
  }


  // Gérer l'inscription
  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (registerPassword !== registerConfirm) {
      toast.error("Les mots de passe ne correspondent pas")
      setIsLoading(false)
      return
    }
    try {
      const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword
        })
      })
      const data = await res.json()
      if (res.ok) {
        toast("Votre compte a été créé !")

        setActiveTab("connexion")
      } else {
        toast.error(data.error || "Erreur à l'inscription")
      }
    } catch (err) {
      toast.error("Erreur réseau")
    } finally {
      setIsLoading(false)
    }
  }


  // Gérer la réinitialisation du mot de passe
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler l'envoi d'un email
    setTimeout(() => {
      setIsLoading(false)
      alert("Un email de réinitialisation a été envoyé à votre adresse email.")
      setActiveTab("connexion")
    }, 1500)
  }

  return (
    <div className="container m-auto py-12">
      <div className="flex flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Bienvenue sur CitéFix</h1>
            <p className="text-sm text-muted-foreground">
              Connectez-vous pour accéder à votre compte ou créez-en un nouveau
            </p>
          </div>

          <Card>
            <Tabs defaultValue="connexion" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="connexion">Connexion</TabsTrigger>
                <TabsTrigger value="inscription">Inscription</TabsTrigger>
                <TabsTrigger value="reset">Mot de passe</TabsTrigger>
              </TabsList>

              {/* Onglet Connexion */}
              <TabsContent value="connexion">
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="exemple@email.com"
                        required
                        value={loginEmail}
                        onChange={e => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Button
                          variant="link"
                          className="px-0 text-xs"
                          type="button"
                          onClick={() => setActiveTab("reset")}
                        >
                          Mot de passe oublié ?
                        </Button>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                      />
                    </div>
                    
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                          Connexion en cours...
                        </div>
                      ) : (
                        <>
                          <LogIn className="mr-2 h-4 w-4" />
                          Se connecter
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>

              {/* Onglet Inscription */}
              <TabsContent value="inscription">
                <form onSubmit={handleRegister}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Nom complet</Label>
                      <Input
                        id="register-name"
                        placeholder="Votre nom"
                        required
                        value={registerName}
                        onChange={e => setRegisterName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="exemple@email.com"
                        required
                        value={registerEmail}
                        onChange={e => setRegisterEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Mot de passe</Label>
                      <Input
                        id="register-password"
                        type="password"
                        required
                        value={registerPassword}
                        onChange={e => setRegisterPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-confirm">Confirmer le mot de passe</Label>
                      <Input
                        id="register-confirm"
                        type="password"
                        required
                        value={registerConfirm}
                        onChange={e => setRegisterConfirm(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" required />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        J&apos;accepte les{" "}
                        <Link href="/conditions" className="text-primary hover:underline">
                          conditions d&apos;utilisation
                        </Link>
                      </label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                          Inscription en cours...
                        </div>
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" />
                          S&apos;inscrire
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>

              {/* Onglet Réinitialisation */}
              <TabsContent value="reset">
                <form onSubmit={handleResetPassword}>
                  <CardContent className="space-y-4 pt-4">
                    <CardDescription className="text-center">
                      Entrez votre adresse email pour recevoir un lien de réinitialisation de mot de passe
                    </CardDescription>
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email</Label>
                      <Input id="reset-email" type="email" placeholder="exemple@email.com" required />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                          Envoi en cours...
                        </div>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Envoyer le lien
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="ghost" className="w-full" onClick={() => setActiveTab("connexion")}>
                      Retour à la connexion
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}
