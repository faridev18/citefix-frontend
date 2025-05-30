import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, Shield, AlertTriangle, Scale, Mail } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="container m-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Conditions d'utilisation</h1>
          <p className="text-muted-foreground">Dernière mise à jour : 31 mai 2025</p>
          <Badge variant="outline" className="mt-2">
            Version 2.1
          </Badge>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Acceptation des conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Bienvenue sur CitéFix ! Ces conditions d'utilisation ("Conditions") régissent votre accès et votre
                utilisation de la plateforme CitéFix, y compris notre site web, nos applications mobiles et tous les
                services associés (collectivement, le "Service").
              </p>
              <p>
                En accédant ou en utilisant notre Service, vous acceptez d'être lié par ces Conditions. Si vous
                n'acceptez pas ces Conditions, veuillez ne pas utiliser notre Service.
              </p>
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Important :</strong> Ces conditions constituent un contrat légalement contraignant entre vous
                  et CitéFix. Veuillez les lire attentivement.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Description du service */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Description du service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>CitéFix est une plateforme citoyenne qui permet aux utilisateurs de :</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Signaler des problèmes urbains (voirie, éclairage, déchets, sécurité, etc.)</li>
                <li>Suivre l'évolution de leurs signalements en temps réel</li>
                <li>Interagir avec les autorités locales et les services techniques</li>
                <li>Consulter les signalements d'autres utilisateurs</li>
                <li>Participer à l'amélioration de leur environnement urbain</li>
              </ul>
              <p>
                Notre objectif est de faciliter la communication entre les citoyens et les autorités locales pour
                améliorer la qualité de vie urbaine.
              </p>
            </CardContent>
          </Card>

          {/* Inscription et compte */}
          <Card>
            <CardHeader>
              <CardTitle>Inscription et gestion de compte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Conditions d'inscription</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Vous devez être âgé d'au moins 16 ans</li>
                  <li>Vous devez fournir des informations exactes et complètes</li>
                  <li>Vous ne pouvez créer qu'un seul compte par personne</li>
                  <li>Vous êtes responsable de la confidentialité de votre mot de passe</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Responsabilités du compte</h3>
                <p className="text-muted-foreground">
                  Vous êtes entièrement responsable de toutes les activités qui se produisent sous votre compte. Vous
                  devez nous notifier immédiatement de toute utilisation non autorisée de votre compte.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Suspension et résiliation</h3>
                <p className="text-muted-foreground">
                  Nous nous réservons le droit de suspendre ou de résilier votre compte en cas de violation de ces
                  conditions, d'utilisation abusive du service, ou pour toute autre raison légitime.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Utilisation acceptable */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Utilisation acceptable
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Utilisations autorisées</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Signaler des problèmes urbains réels et vérifiables</li>
                  <li>Fournir des informations exactes et utiles</li>
                  <li>Respecter les autres utilisateurs et les autorités</li>
                  <li>Utiliser le service de manière constructive</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-red-600">Utilisations interdites</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Publier des informations fausses, trompeuses ou diffamatoires</li>
                  <li>Harceler, menacer ou intimider d'autres utilisateurs</li>
                  <li>Utiliser le service à des fins commerciales non autorisées</li>
                  <li>Tenter de contourner les mesures de sécurité</li>
                  <li>Publier du contenu illégal, offensant ou inapproprié</li>
                  <li>Spammer ou envoyer des messages non sollicités</li>
                  <li>Violer les droits de propriété intellectuelle</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contenu utilisateur */}
          <Card>
            <CardHeader>
              <CardTitle>Contenu utilisateur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Vos droits</h3>
                <p className="text-muted-foreground">
                  Vous conservez tous vos droits sur le contenu que vous publiez sur CitéFix (textes, photos,
                  commentaires, etc.). Cependant, en publiant du contenu, vous nous accordez une licence pour l'utiliser
                  dans le cadre de notre service.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Licence accordée à CitéFix</h3>
                <p className="text-muted-foreground">
                  En publiant du contenu, vous nous accordez une licence mondiale, non exclusive, libre de redevances
                  pour utiliser, reproduire, modifier, adapter et distribuer votre contenu dans le cadre de notre
                  service et pour améliorer la qualité urbaine.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Responsabilité du contenu</h3>
                <p className="text-muted-foreground">
                  Vous êtes seul responsable du contenu que vous publiez. Nous nous réservons le droit de supprimer tout
                  contenu qui viole ces conditions ou qui est inapproprié.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Propriété intellectuelle */}
          <Card>
            <CardHeader>
              <CardTitle>Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Le Service et son contenu original, ses fonctionnalités et sa fonctionnalité sont et resteront la
                propriété exclusive de CitéFix et de ses concédants de licence. Le Service est protégé par le droit
                d'auteur, les marques commerciales et d'autres lois.
              </p>
              <p className="text-muted-foreground">
                Vous ne pouvez pas copier, modifier, distribuer, vendre ou louer une partie de notre Service sans notre
                autorisation écrite préalable.
              </p>
            </CardContent>
          </Card>

          {/* Limitation de responsabilité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Limitation de responsabilité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Service fourni "en l'état"</h3>
                <p className="text-muted-foreground">
                  Le Service est fourni "en l'état" et "selon disponibilité" sans garantie d'aucune sorte. Nous ne
                  garantissons pas que le service sera ininterrompu, sécurisé ou exempt d'erreurs.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Limitation des dommages</h3>
                <p className="text-muted-foreground">
                  Dans la mesure permise par la loi, CitéFix ne sera pas responsable des dommages indirects,
                  accessoires, spéciaux, consécutifs ou punitifs résultant de votre utilisation du Service.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Responsabilité des tiers</h3>
                <p className="text-muted-foreground">
                  Nous ne sommes pas responsables des actions ou inactions des autorités locales, des techniciens, ou
                  d'autres tiers dans le traitement des signalements.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Indemnisation */}
          <Card>
            <CardHeader>
              <CardTitle>Indemnisation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Vous acceptez d'indemniser, de défendre et de dégager de toute responsabilité CitéFix, ses dirigeants,
                directeurs, employés et agents contre toute réclamation, dommage, obligation, perte, responsabilité,
                coût ou dette, et dépense (y compris, mais sans s'y limiter, les honoraires d'avocat) résultant de :
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-3">
                <li>Votre utilisation et accès au Service</li>
                <li>Votre violation de ces Conditions</li>
                <li>Votre violation de tout droit d'un tiers</li>
                <li>Tout contenu que vous publiez sur le Service</li>
              </ul>
            </CardContent>
          </Card>

          {/* Résiliation */}
          <Card>
            <CardHeader>
              <CardTitle>Résiliation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Résiliation par vous</h3>
                <p className="text-muted-foreground">
                  Vous pouvez résilier votre compte à tout moment en nous contactant ou en utilisant les paramètres de
                  votre compte.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Résiliation par CitéFix</h3>
                <p className="text-muted-foreground">
                  Nous pouvons résilier ou suspendre votre compte immédiatement, sans préavis, pour toute raison, y
                  compris, sans limitation, si vous violez ces Conditions.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Effet de la résiliation</h3>
                <p className="text-muted-foreground">
                  Lors de la résiliation, votre droit d'utiliser le Service cessera immédiatement. Les signalements déjà
                  soumis peuvent être conservés pour des raisons légales ou opérationnelles.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Droit applicable */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Droit applicable et juridiction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Ces Conditions sont régies et interprétées conformément aux lois de la République du Bénin, sans égard
                aux principes de conflit de lois.
              </p>
              <p className="text-muted-foreground">
                Tout litige découlant de ou en relation avec ces Conditions sera soumis à la juridiction exclusive des
                tribunaux de Cotonou, Bénin.
              </p>
            </CardContent>
          </Card>

          {/* Modifications */}
          <Card>
            <CardHeader>
              <CardTitle>Modifications des conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces Conditions à
                tout moment. Si une révision est importante, nous essaierons de fournir un préavis d'au moins 30 jours
                avant l'entrée en vigueur des nouvelles conditions.
              </p>
              <p className="text-muted-foreground">
                Votre utilisation continue du Service après l'entrée en vigueur de toute modification constitue votre
                acceptation de ces nouvelles Conditions.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Nous contacter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Si vous avez des questions concernant ces Conditions d'utilisation, contactez-nous :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Service juridique</h3>
                  <p className="text-sm text-muted-foreground">
                    Email : legal@citefix.bj
                    <br />
                    Téléphone : +229 XX XX XX XX
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Adresse postale</h3>
                  <p className="text-sm text-muted-foreground">
                    CitéFix
                    <br />
                    123 Rue de l'Innovation
                    <br />
                    Cotonou, Bénin
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button asChild>
                  <Link href="/contact">Nous contacter</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/confidentialite">Politique de confidentialité</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
