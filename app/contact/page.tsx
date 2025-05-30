"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)

  // Gérer l'envoi du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler l'envoi
    setTimeout(() => {
      setIsLoading(false)
      alert("Votre message a été envoyé avec succès !")
      // Réinitialiser le formulaire
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1500)
  }

  return (
    <div className="container m-auto py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Contactez-nous</h1>
        <p className="text-muted-foreground">
          Vous avez des questions, des suggestions ou besoin d&apos;assistance ? N&apos;hésitez pas à nous contacter.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-muted-foreground">contact@citefix.bj</p>
            <p className="text-muted-foreground">support@citefix.bj</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Téléphone</h3>
            <p className="text-muted-foreground">+229 XX XX XX XX</p>
            <p className="text-muted-foreground">Lun-Ven, 8h-18h</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Adresse</h3>
            <p className="text-muted-foreground">123 Rue de l&apos;Innovation</p>
            <p className="text-muted-foreground">Cotonou, Bénin</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Envoyez-nous un message</CardTitle>
            <CardDescription>
              Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" placeholder="Votre nom" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="votre@email.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Select required>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Sélectionnez un sujet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="question">Question générale</SelectItem>
                    <SelectItem value="support">Support technique</SelectItem>
                    <SelectItem value="partnership">Partenariat</SelectItem>
                    <SelectItem value="feedback">Commentaires et suggestions</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Écrivez votre message ici..." rows={5} required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    Envoi en cours...
                  </div>
                ) : (
                  "Envoyer le message"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>FAQ</CardTitle>
            <CardDescription>Consultez les questions fréquemment posées</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Comment signaler un problème ?</h3>
              <p className="text-sm text-muted-foreground">
                Cliquez sur "Signaler un problème", remplissez le formulaire avec une description, ajoutez des photos et
                localisez le problème sur la carte.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Combien de temps pour une résolution ?</h3>
              <p className="text-sm text-muted-foreground">
                Le délai varie selon le type de problème et la municipalité. En moyenne, les problèmes sont traités en
                3-7 jours.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Puis-je suivre mon signalement ?</h3>
              <p className="text-sm text-muted-foreground">
                Oui, vous recevez des notifications à chaque changement de statut et pouvez consulter l'historique
                complet.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">CitéFix est-il gratuit ?</h3>
              <p className="text-sm text-muted-foreground">
                Oui, CitéFix est entièrement gratuit pour tous les citoyens. Notre mission est d'améliorer la vie
                urbaine pour tous.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href="/faq">Voir toutes les FAQ</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
