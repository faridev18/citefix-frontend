"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, AlertTriangle, Lightbulb, Trash2, Shield, ArrowRight, CheckCircle2, Clock, Users } from "lucide-react"
import Image from "next/image"
import RecentReports from "@/components/recent-reports"
import StatsSection from "@/components/stats-section"
import { useEffect, useState } from "react"

export default function Home() {
  const [recentReports, setRecentReports] = useState([])

  const getCategoryIcon = (category) => {
    switch ((category || "").toLowerCase()) {
      case "voirie": return <AlertTriangle className="h-4 w-4" />
      case "éclairage": return <Lightbulb className="h-4 w-4" />
      case "déchets": return <Trash2 className="h-4 w-4" />
      case "sécurité": return <Shield className="h-4 w-4" />
      default: return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getPhotoUrl = (photo, baseUrl = "http://localhost:3001") => {
    if (!photo || typeof photo !== "string") return "/placeholder.svg"
    if (photo.startsWith("http")) return photo
    if (photo.startsWith("/uploads/")) return baseUrl + photo
    if (photo.startsWith("data:")) return photo
    return "/placeholder.svg"
  }


  useEffect(() => {
    fetch("http://localhost:3001/api/reports/public")
      .then(res => res.json())
      .then(data => {
        // sécurise peu importe la structure
        const array = Array.isArray(data) ? data : (data?.reports || data?.data || [])
        setRecentReports(array.slice(0, 4))
      })
      .catch(() => setRecentReports([]))
  }, [])
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 to-background py-16 md:py-24">
        <div className="container  m-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
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
          <div className="flex-1 w-full min-h-[300px] md:h-[400px] relative">
            <Image
              src="/header.png"
              alt="CitéFix illustration"
              fill
              className="object-contain animate-float"
              priority
            />
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
      <section className="py-16 my-16  container m-auto">
        <div className="flex justify-between gap-5 flex-wrap items-center mb-8">
          <h2 className="text-3xl font-bold">Signalements récents</h2>
          <Button variant="outline" asChild>
            <Link href="/carte">
              Voir tous les signalements
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recentReports.length === 0 ? (
            <div className="text-muted-foreground col-span-full py-8 text-center">
              Aucun signalement récent
            </div>
          ) : recentReports.map((report) => (
            <Link
              href={`/signalements/${report._id || report.id}`}
              key={report._id || report.id}
              className="hover:shadow-lg transition-shadow"
              style={{ textDecoration: "none" }} // enlève le souligné sur mobile
            >
              <Card className="flex flex-col h-full cursor-pointer">
                <CardContent className="flex-1 flex flex-col gap-2 p-4">
                  {/* Image */}
                  {report.media?.[0]?.url && (
                    <div className="h-32 w-full rounded-md overflow-hidden mb-2">
                      <img
                        src={getPhotoUrl(report.media?.[0]?.url)}
                        alt={report.title}
                        width={320}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getCategoryIcon(report.category)}
                      {(report.category?.charAt(0).toUpperCase() ?? '') + (report.category?.slice(1) ?? '')}
                    </Badge>
                    <Badge variant="secondary">{report.status}</Badge>
                  </div>
                  <div className="font-bold text-base">{report.title}</div>
                  <div className="text-muted-foreground line-clamp-2 text-sm">{report.description}</div>
                  <div className="mt-auto text-xs text-muted-foreground opacity-70">
                    {new Date(report.timestamps?.createdAt || report.createdAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>


      </section>

      {/* Stats */}
      {/* <section className="py-16 bg-primary/10">
        <div className="container m-auto">
          <StatsSection />
        </div>
      </section> */}

      {/* CTA */}
      <section className="my-16 container m-auto">
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
