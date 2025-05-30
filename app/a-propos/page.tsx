import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Users, Building, Handshake } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/20 to-background py-16 md:py-24">
        <div className="container m-auto">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="px-3 py-1 text-sm mb-6">
              À propos de CitéFix
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Notre mission : améliorer la qualité de vie urbaine
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              CitéFix est une plateforme citoyenne qui permet aux habitants de signaler et suivre les problèmes urbains
              pour créer des villes plus agréables et fonctionnelles.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Vision & Mission */}
      <section className="py-16 container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Notre vision</h2>
            <p className="text-muted-foreground">
              Nous imaginons des villes où chaque citoyen peut contribuer activement à l&apos;amélioration de son
              environnement urbain, où la transparence et la collaboration entre les habitants et les autorités locales
              sont la norme.
            </p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <p>Favoriser la participation citoyenne dans l&apos;entretien de l&apos;espace public</p>
              </div>
              <div className="flex gap-3">
                <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <p>Accroître la transparence et la réactivité des collectivités</p>
              </div>
              <div className="flex gap-3">
                <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <p>Centraliser la gestion des incidents pour des prises de décisions plus efficaces</p>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] w-full">
            <Image
              src="about.jpg"
              alt="Notre vision"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-16 bg-muted/50">
        <div className="container m-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre histoire</h2>
            <p className="text-muted-foreground">
              CitéFix est né d&apos;une volonté de transformer la façon dont les citoyens interagissent avec leur
              environnement urbain et les services publics.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <span className="font-bold text-primary">2023</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Les débuts</h3>
                <p className="text-muted-foreground">
                  Lancement de l&apos;idée lors d&apos;un hackathon sur l&apos;innovation urbaine à Cotonou, remportant
                  le premier prix.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <span className="font-bold text-primary">2024</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Développement</h3>
                <p className="text-muted-foreground">
                  Création de la plateforme et partenariats avec les premières municipalités pour tester le concept.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <span className="font-bold text-primary">2025</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Aujourd&apos;hui</h3>
                <p className="text-muted-foreground">
                  CitéFix est désormais déployé dans plusieurs villes et continue de s&apos;améliorer grâce aux retours
                  des utilisateurs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* L'équipe */}
      <section className="py-16 container m-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Notre équipe</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            CitéFix est porté par une équipe passionnée et engagée pour l&apos;amélioration de la vie urbaine.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Farihane ZANNOU",
              role: "Fondateur & CEO et Développeur",
              image: "/farihane.jpg"
            },
            {
              name: "Miguel AHIDOTE",
              role: "Directeur Technique et Designer",
              image: "/miguel.jpg"
            },
            {
              name: "Wesley MONTCHO",
              role: "Responsable Partenariats et Développeur backend",
              image: "/wesley.jpg"
            },
            {
              name: "Cédric BLEOSSI",
              role: "Développeur Senior Frontend",
              image: "/cedric.jpg"
            },
          ].map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-team relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-16 bg-muted/50">
        <div className="container m-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos partenaires</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              CitéFix collabore avec des municipalités, des organisations et des entreprises pour améliorer la vie
              urbaine.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Municipalités</h3>
              <p className="text-muted-foreground">
                Nous travaillons avec les autorités locales pour intégrer CitéFix dans leurs processus de gestion
                urbaine.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Associations</h3>
              <p className="text-muted-foreground">
                Nous collaborons avec des associations citoyennes pour promouvoir l&apos;engagement communautaire.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                <Handshake className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Entreprises</h3>
              <p className="text-muted-foreground">
                Des entreprises locales et internationales soutiennent notre mission d&apos;amélioration urbaine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 container m-auto">
        <div className="bg-primary rounded-lg p-8 md:p-12 text-primary-foreground text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez le mouvement CitéFix</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Ensemble, nous pouvons créer des villes plus agréables, plus propres et plus fonctionnelles pour tous.
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
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
