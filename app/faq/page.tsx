import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, MessageCircle, Phone, Mail } from "lucide-react"
import Link from "next/link"

// Données fictives pour les FAQ
const faqData = [
  {
    category: "Général",
    questions: [
      {
        id: "1",
        question: "Qu'est-ce que CitéFix ?",
        answer:
          "CitéFix est une plateforme citoyenne qui permet aux habitants de signaler facilement les problèmes urbains (éclairage défaillant, nids de poule, dépôts sauvages, etc.) et de suivre leur résolution en temps réel. Notre objectif est d'améliorer la qualité de vie urbaine en facilitant la communication entre les citoyens et les autorités locales.",
      },
      {
        id: "2",
        question: "CitéFix est-il gratuit ?",
        answer:
          "Oui, CitéFix est entièrement gratuit pour tous les citoyens. Notre mission est d'améliorer la vie urbaine pour tous, sans barrière financière. Les municipalités partenaires financent le service.",
      },
      {
        id: "3",
        question: "Dans quelles villes CitéFix est-il disponible ?",
        answer:
          "CitéFix est actuellement déployé à Cotonou et s'étend progressivement à d'autres villes du Bénin. Nous travaillons avec les autorités locales pour étendre notre couverture géographique.",
      },
    ],
  },
  {
    category: "Signalements",
    questions: [
      {
        id: "4",
        question: "Comment signaler un problème ?",
        answer:
          "Pour signaler un problème : 1) Cliquez sur 'Signaler un problème', 2) Remplissez le formulaire avec une description détaillée, 3) Ajoutez des photos si possible, 4) Localisez le problème sur la carte, 5) Soumettez votre signalement. Vous recevrez une confirmation par email.",
      },
      {
        id: "5",
        question: "Quels types de problèmes puis-je signaler ?",
        answer:
          "Vous pouvez signaler tous les problèmes liés à l'espace public : voirie (nids de poule, chaussée dégradée), éclairage public défaillant, dépôts sauvages de déchets, problèmes de sécurité (panneaux endommagés, barrières cassées), et autres dysfonctionnements urbains.",
      },
      {
        id: "6",
        question: "Dois-je créer un compte pour signaler ?",
        answer:
          "Oui, un compte est nécessaire pour signaler un problème. Cela nous permet de vous tenir informé de l'évolution de votre signalement et de maintenir un historique de vos contributions. L'inscription est rapide et gratuite.",
      },
      {
        id: "7",
        question: "Puis-je signaler anonymement ?",
        answer:
          "Non, les signalements anonymes ne sont pas acceptés pour garantir la qualité et la véracité des informations. Cependant, vos informations personnelles restent confidentielles et ne sont partagées qu'avec les services techniques concernés.",
      },
    ],
  },
  {
    category: "Suivi",
    questions: [
      {
        id: "8",
        question: "Comment suivre l'évolution de mon signalement ?",
        answer:
          "Vous pouvez suivre votre signalement de plusieurs façons : 1) Consultez la page 'Mes signalements' dans votre profil, 2) Recevez des notifications par email à chaque changement de statut, 3) Activez les notifications push sur votre appareil mobile.",
      },
      {
        id: "9",
        question: "Quels sont les différents statuts d'un signalement ?",
        answer:
          "Les statuts sont : Signalé (nouveau signalement), Validé (vérifié par les autorités), Assigné (technicien désigné), Intervention en cours (travaux en cours), Terminé (intervention finie), Résolu (problème corrigé et vérifié), Rejeté (signalement non valide).",
      },
      {
        id: "10",
        question: "Combien de temps faut-il pour résoudre un problème ?",
        answer:
          "Le délai varie selon le type de problème et sa complexité. En moyenne : éclairage public (2-5 jours), petites réparations de voirie (3-7 jours), nettoyage de déchets (1-3 jours), gros travaux de voirie (2-4 semaines). Les urgences sont traitées en priorité.",
      },
    ],
  },
  {
    category: "Technique",
    questions: [
      {
        id: "11",
        question: "CitéFix fonctionne-t-il sur mobile ?",
        answer:
          "Oui, CitéFix est optimisé pour les appareils mobiles. Vous pouvez utiliser notre site web depuis votre navigateur mobile ou télécharger notre application mobile (bientôt disponible sur iOS et Android).",
      },
      {
        id: "12",
        question: "Puis-je utiliser CitéFix sans connexion internet ?",
        answer:
          "Une connexion internet est nécessaire pour soumettre des signalements et consulter les mises à jour. Cependant, vous pouvez préparer votre signalement hors ligne (photos, description) et le soumettre dès que vous retrouvez une connexion.",
      },
      {
        id: "13",
        question: "Mes données personnelles sont-elles protégées ?",
        answer:
          "Oui, nous prenons la protection de vos données très au sérieux. Vos informations sont chiffrées, stockées de manière sécurisée et ne sont utilisées que dans le cadre du traitement de vos signalements. Consultez notre politique de confidentialité pour plus de détails.",
      },
    ],
  },
  {
    category: "Participation",
    questions: [
      {
        id: "14",
        question: "Puis-je commenter les signalements d'autres utilisateurs ?",
        answer:
          "Oui, vous pouvez commenter et confirmer les signalements d'autres utilisateurs. Cela aide les autorités à prioriser les interventions selon l'impact sur la communauté. Restez respectueux et constructif dans vos commentaires.",
      },
      {
        id: "15",
        question: "Comment puis-je confirmer qu'un problème est résolu ?",
        answer:
          "Lorsqu'un signalement est marqué comme 'Résolu', vous recevez une notification. Vous pouvez alors confirmer ou contester la résolution en visitant la page du signalement. Votre retour aide à s'assurer que les problèmes sont vraiment résolus.",
      },
      {
        id: "16",
        question: "Puis-je proposer des améliorations pour ma ville ?",
        answer:
          "Absolument ! Utilisez la section 'Suggestions' de votre profil ou contactez-nous directement. Nous transmettons régulièrement les suggestions constructives aux autorités locales. Votre participation active contribue à améliorer votre ville.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="container m-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Questions fréquemment posées</h1>
          <p className="text-muted-foreground mb-6">Trouvez rapidement les réponses à vos questions sur CitéFix</p>

          {/* Barre de recherche */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Rechercher dans les FAQ..." className="pl-10" />
            </div>
          </div>
        </div>

        {/* FAQ par catégorie */}
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category.category}
                  <Badge variant="secondary">{category.questions.length}</Badge>
                </CardTitle>
                <CardDescription>Questions relatives à {category.category.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section d'aide supplémentaire */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Vous ne trouvez pas votre réponse ?</CardTitle>
            <CardDescription>Notre équipe est là pour vous aider</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
                <Link href="/contact">
                  <MessageCircle className="h-6 w-6" />
                  <span className="font-medium">Nous contacter</span>
                  <span className="text-xs text-muted-foreground">Envoyez-nous un message</span>
                </Link>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Phone className="h-6 w-6" />
                <span className="font-medium">Appelez-nous</span>
                <span className="text-xs text-muted-foreground">+229 XX XX XX XX</span>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Mail className="h-6 w-6" />
                <span className="font-medium">Email</span>
                <span className="text-xs text-muted-foreground">support@citefix.bj</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Liens utiles */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Liens utiles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/a-propos">À propos de CitéFix</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/confidentialite">Politique de confidentialité</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/conditions">Conditions d'utilisation</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/signaler">Signaler un problème</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
