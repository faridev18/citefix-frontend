import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, AlertTriangle, Lightbulb, Trash2, Shield, ArrowRight, CheckCircle2, Clock, Users } from "lucide-react"
import Image from "next/image"
import RecentReports from "@/components/recent-reports"
import StatsSection from "@/components/stats-section"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 to-background py-16 md:py-24">
        <div className="container m-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 space-y-6">
            <Badge variant="outline" className="px-3 py-1 text-sm">
              Plateforme citoyenne
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Signalez, suivez, améliorez votre quartier
            </h1>
            <p className="text-xl text-muted-foreground">
              CitéFix vous permet de signaler facilement les problèmes urbains et de suivre leur résolution en temps
              réel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/signaler">
                  <MapPin className="mr-2 h-5 w-5" />
                  Signaler un problème
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/carte">Voir la carte des signalements</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative h-[400px] w-full animate-float">
              <Image
                src="/header.png"
                alt="CitéFix illustration"
                fill
                className="object-contain rounded"
                priority
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* How it works */}
      <section className="py-16 container m-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            CitéFix simplifie le processus de signalement et de suivi des problèmes urbains en quelques étapes simples.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-2 border-primary/20 bg-background">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Signalez</h3>
              <p className="text-muted-foreground">
                Prenez une photo du problème, ajoutez une description et localisez-le sur la carte.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 border-primary/20 bg-background">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Suivez</h3>
              <p className="text-muted-foreground">
                Recevez des notifications en temps réel sur l&apos;avancement de votre signalement.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 border-primary/20 bg-background">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Confirmez</h3>
              <p className="text-muted-foreground">
                Vérifiez que le problème a bien été résolu et confirmez la résolution.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/50">
        <div className="container m-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Catégories de signalements</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              CitéFix vous permet de signaler différents types de problèmes urbains.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { icon: <AlertTriangle className="h-6 w-6" />, name: "Voirie" },
              { icon: <Lightbulb className="h-6 w-6" />, name: "Éclairage" },
              { icon: <Trash2 className="h-6 w-6" />, name: "Déchets" },
              { icon: <Shield className="h-6 w-6" />, name: "Sécurité" },
              { icon: <Users className="h-6 w-6" />, name: "Autres" },
            ].map((category, index) => (
              <Card key={index} className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-3">
                    {category.icon}
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Reports */}
      <section className="py-16 container m-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Signalements récents</h2>
          <Button variant="outline" asChild>
            <Link href="/carte">
              Voir tous les signalements
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <RecentReports />
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary/10">
        <div className="container m-auto">
          <StatsSection />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 container m-auto">
        <div className="bg-primary rounded-lg p-8 md:p-12 text-primary-foreground text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à améliorer votre quartier ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Rejoignez CitéFix dès aujourd&apos;hui et participez à l&apos;amélioration de votre environnement urbain.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/inscription">Créer un compte</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white hover:bg-white hover:text-primary"
              asChild
            >
              <Link href="/signaler">
                <MapPin className="mr-2 h-5 w-5" />
                Signaler un problème
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
