import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Lock, UserCheck, Database, Mail } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="container m-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Politique de confidentialité</h1>
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
                <Eye className="h-5 w-5" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                CitéFix s'engage à protéger votre vie privée et vos données personnelles. Cette politique de
                confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations
                lorsque vous utilisez notre plateforme.
              </p>
              <p>
                En utilisant CitéFix, vous acceptez les pratiques décrites dans cette politique. Si vous n'acceptez pas
                ces conditions, veuillez ne pas utiliser notre service.
              </p>
            </CardContent>
          </Card>

          {/* Données collectées */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Données que nous collectons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Informations d'identification</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Nom complet</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                  <li>Adresse postale (optionnelle)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Données de signalement</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Descriptions des problèmes signalés</li>
                  <li>Photos et images jointes</li>
                  <li>Données de géolocalisation</li>
                  <li>Commentaires et interactions</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Données techniques</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Adresse IP</li>
                  <li>Type de navigateur et version</li>
                  <li>Système d'exploitation</li>
                  <li>Pages visitées et temps passé</li>
                  <li>Cookies et technologies similaires</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Utilisation des données */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Comment nous utilisons vos données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Fourniture du service</h3>
                <p className="text-muted-foreground">
                  Nous utilisons vos données pour traiter vos signalements, vous tenir informé de leur évolution, et
                  faciliter la communication avec les services techniques.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Amélioration du service</h3>
                <p className="text-muted-foreground">
                  Vos données nous aident à analyser l'utilisation de la plateforme, identifier les problèmes
                  récurrents, et améliorer nos fonctionnalités.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Communication</h3>
                <p className="text-muted-foreground">
                  Nous vous envoyons des notifications sur l'évolution de vos signalements, des mises à jour
                  importantes, et des informations sur le service (avec votre consentement).
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Conformité légale</h3>
                <p className="text-muted-foreground">
                  Nous pouvons utiliser vos données pour respecter nos obligations légales, résoudre des litiges, et
                  faire appliquer nos conditions d'utilisation.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Partage des données */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Partage de vos données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Autorités locales partenaires</h3>
                <p className="text-muted-foreground">
                  Nous partageons les informations de signalement avec les municipalités et services techniques
                  concernés pour permettre le traitement des problèmes signalés.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Prestataires de services</h3>
                <p className="text-muted-foreground">
                  Nous travaillons avec des prestataires tiers pour l'hébergement, l'envoi d'emails, et l'analyse. Ces
                  partenaires sont contractuellement tenus de protéger vos données.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Obligations légales</h3>
                <p className="text-muted-foreground">
                  Nous pouvons divulguer vos données si requis par la loi, une décision de justice, ou pour protéger nos
                  droits et ceux de nos utilisateurs.
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Important :</strong> Nous ne vendons jamais vos données personnelles à des tiers à des fins
                  commerciales.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Sécurité de vos données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Nous mettons en place des mesures de sécurité techniques et organisationnelles appropriées pour protéger
                vos données contre l'accès non autorisé, la modification, la divulgation ou la destruction.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Mesures techniques</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Chiffrement des données en transit et au repos</li>
                    <li>Authentification à deux facteurs</li>
                    <li>Surveillance continue des systèmes</li>
                    <li>Sauvegardes régulières et sécurisées</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Mesures organisationnelles</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Accès limité aux données personnelles</li>
                    <li>Formation du personnel à la sécurité</li>
                    <li>Audits de sécurité réguliers</li>
                    <li>Politique de gestion des incidents</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vos droits */}
          <Card>
            <CardHeader>
              <CardTitle>Vos droits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Conformément à la réglementation en vigueur, vous disposez des droits suivants concernant vos données
                personnelles :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Droit d'accès</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez demander une copie de toutes les données personnelles que nous détenons sur vous.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Droit de rectification</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez demander la correction de données inexactes ou incomplètes.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Droit à l'effacement</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez demander la suppression de vos données dans certaines circonstances.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Droit à la portabilité</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez demander le transfert de vos données vers un autre service.
                  </p>
                </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm">
                  Pour exercer vos droits, contactez-nous à{" "}
                  <a href="mailto:privacy@citefix.bj" className="text-primary hover:underline">
                    privacy@citefix.bj
                  </a>{" "}
                  ou via notre{" "}
                  <Link href="/contact" className="text-primary hover:underline">
                    formulaire de contact
                  </Link>
                  .
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies et technologies similaires</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Nous utilisons des cookies et technologies similaires pour améliorer votre expérience, analyser
                l'utilisation du site, et personnaliser le contenu.
              </p>

              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold">Cookies essentiels</h3>
                  <p className="text-sm text-muted-foreground">
                    Nécessaires au fonctionnement du site (authentification, préférences).
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Cookies analytiques</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous aident à comprendre comment vous utilisez le site pour l'améliorer.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Cookies de préférences</h3>
                  <p className="text-sm text-muted-foreground">
                    Mémorisent vos choix (langue, thème) pour personnaliser votre expérience.
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
              </p>
            </CardContent>
          </Card>

          {/* Conservation des données */}
          <Card>
            <CardHeader>
              <CardTitle>Conservation des données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Nous conservons vos données personnelles uniquement le temps nécessaire aux finalités pour lesquelles
                elles ont été collectées :
              </p>

              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <strong>Données de compte :</strong> Tant que votre compte est actif, puis 3 ans après la dernière
                  connexion
                </li>
                <li>
                  <strong>Signalements :</strong> 5 ans après la résolution pour les statistiques et l'amélioration du
                  service
                </li>
                <li>
                  <strong>Données techniques :</strong> 13 mois maximum pour les analyses d'usage
                </li>
                <li>
                  <strong>Communications :</strong> 3 ans pour le support client et la résolution de litiges
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Modifications */}
          <Card>
            <CardHeader>
              <CardTitle>Modifications de cette politique</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Nous pouvons modifier cette politique de confidentialité pour refléter les changements dans nos
                pratiques ou pour des raisons légales. Les modifications importantes vous seront notifiées par email ou
                via une notification sur la plateforme.
              </p>
              <p className="text-muted-foreground">
                Nous vous encourageons à consulter régulièrement cette page pour rester informé de nos pratiques de
                confidentialité.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Nous contacter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Si vous avez des questions concernant cette politique de confidentialité ou le traitement de vos données
                personnelles, contactez-nous :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Délégué à la protection des données</h3>
                  <p className="text-sm text-muted-foreground">
                    Email : privacy@citefix.bj
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
                  <Link href="/conditions">Conditions d'utilisation</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
