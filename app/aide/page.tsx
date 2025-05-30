import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  BookOpen,
  Video,
  Download,
  ExternalLink,
  HelpCircle,
  FileText,
  Users,
} from "lucide-react"
import Link from "next/link"

// Données fictives pour l'aide
const helpCategories = [
  {
    title: "Premiers pas",
    icon: <BookOpen className="h-5 w-5" />,
    articles: [
      { title: "Comment créer un compte", views: 1250 },
      { title: "Faire son premier signalement", views: 980 },
      { title: "Comprendre les statuts", views: 750 },
      { title: "Utiliser la carte interactive", views: 620 },
    ],
  },
  {
    title: "Signalements",
    icon: <FileText className="h-5 w-5" />,
    articles: [
      { title: "Types de problèmes à signaler", views: 890 },
      { title: "Ajouter des photos efficacement", views: 670 },
      { title: "Suivre l'évolution d'un signalement", views: 540 },
      { title: "Modifier ou supprimer un signalement", views: 430 },
    ],
  },
  {
    title: "Compte et profil",
    icon: <Users className="h-5 w-5" />,
    articles: [
      { title: "Gérer ses informations personnelles", views: 520 },
      { title: "Paramétrer les notifications", views: 480 },
      { title: "Historique des signalements", views: 390 },
      { title: "Supprimer son compte", views: 210 },
    ],
  },
]

const quickActions = [
  {
    title: "Guides vidéo",
    description: "Tutoriels vidéo pour apprendre à utiliser CitéFix",
    icon: <Video className="h-6 w-6" />,
    action: "Voir les vidéos",
    href: "/aide/videos",
  },
  {
    title: "Documentation",
    description: "Guide complet d'utilisation de la plateforme",
    icon: <Download className="h-6 w-6" />,
    action: "Télécharger PDF",
    href: "/aide/documentation.pdf",
  },
  {
    title: "Forum communautaire",
    description: "Échangez avec d'autres utilisateurs",
    icon: <MessageCircle className="h-6 w-6" />,
    action: "Accéder au forum",
    href: "/forum",
  },
  {
    title: "API Documentation",
    description: "Documentation technique pour les développeurs",
    icon: <ExternalLink className="h-6 w-6" />,
    action: "Voir l'API",
    href: "/api/docs",
  },
]

const faqQuestions = [
  {
    question: "Comment signaler un problème urgent ?",
    answer:
      "Pour les urgences, utilisez le bouton 'Signalement urgent' sur la page d'accueil. Sélectionnez la priorité 'Haute' et ajoutez des photos claires du problème. Les signalements urgents sont traités en priorité par nos équipes.",
  },
  {
    question: "Pourquoi mon signalement n'a-t-il pas été traité ?",
    answer:
      "Plusieurs raisons peuvent expliquer cela : le signalement est en cours de validation, il nécessite des autorisations spéciales, ou il fait partie d'un projet plus large. Consultez les commentaires sur votre signalement pour plus d'informations.",
  },
  {
    question: "Puis-je signaler un problème en dehors de ma ville ?",
    answer:
      "Vous pouvez signaler des problèmes dans toutes les villes couvertes par CitéFix. Cependant, nous encourageons les signalements dans votre zone de résidence pour une meilleure connaissance du terrain.",
  },
  {
    question: "Comment puis-je suivre plusieurs signalements ?",
    answer:
      "Rendez-vous dans 'Mes signalements' depuis votre profil. Vous y trouverez tous vos signalements avec leur statut actuel. Vous pouvez aussi activer les notifications pour être alerté des changements.",
  },
]

export default function AidePage() {
  return (
    <div className="container m-auto py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Centre d'aide CitéFix</h1>
          <p className="text-muted-foreground mb-6">
            Trouvez rapidement les réponses à vos questions et apprenez à utiliser CitéFix efficacement
          </p>

          {/* Barre de recherche */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Rechercher dans l'aide..." className="pl-10" />
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  {action.icon}
                </div>
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={action.href}>{action.action}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Catégories d'aide */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Catégories d'aide</h2>
            <div className="space-y-6">
              {helpCategories.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {category.icon}
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.articles.map((article, articleIndex) => (
                        <div
                          key={articleIndex}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Link href={`/aide/article/${articleIndex}`} className="flex-1">
                            <h3 className="font-medium hover:text-primary transition-colors">{article.title}</h3>
                          </Link>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {article.views} vues
                            </Badge>
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ et contact */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Questions fréquentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {faqQuestions.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left text-sm">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/faq">Voir toutes les FAQ</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Besoin d'aide personnalisée ?</CardTitle>
                <CardDescription>Notre équipe est là pour vous aider</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/contact">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Nous contacter
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  +229 XX XX XX XX
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  support@citefix.bj
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Horaires de support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span>8h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span>9h00 - 15h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span>Fermé</span>
                </div>
                <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-green-800">
                  <p className="text-xs">Support d'urgence 24h/7j pour les problèmes critiques</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ressources utiles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/a-propos">À propos de CitéFix</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/conditions">Conditions d'utilisation</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/confidentialite">Politique de confidentialité</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/changelog">Notes de version</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
