import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Scale, Building, Mail, Phone } from "lucide-react"

export default function MentionsLegalesPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Mentions légales</h1>
          <p className="text-muted-foreground">Informations légales concernant la plateforme CitéFix</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Éditeur du site
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">CitéFix SARL</h3>
                <p className="text-muted-foreground">Société à responsabilité limitée au capital de 1 000 000 FCFA</p>
                <p className="text-muted-foreground">Siège social : Avenue de la République, Cotonou, Bénin</p>
                <p className="text-muted-foreground">RCCM : BJ-COT-01-2025-A12-00001</p>
                <p className="text-muted-foreground">IFU : 3202500000001</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Directeur de la publication</h3>
                <p className="text-muted-foreground">M. Farihane ZANNOU</p>
                <p className="text-muted-foreground">Gérant de CitéFix SARL</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Contact</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>contact@citefix.bj</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>+229 XX XX XX XX</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hébergement</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <h3 className="font-semibold mb-2">Vercel Inc.</h3>
                <p className="text-muted-foreground">340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                <p className="text-muted-foreground">Site web : https://farihane.com</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Propriété intellectuelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                L'ensemble de ce site relève de la législation béninoise et internationale sur le droit d'auteur et la
                propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents
                téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="text-muted-foreground">
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est
                formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
              <p className="text-muted-foreground">
                La marque "CitéFix" ainsi que les logos figurant sur le site sont des marques déposées. Toute
                reproduction non autorisée de ces éléments constitue une contrefaçon passible de sanctions pénales.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement
                remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
              </p>
              <p className="text-muted-foreground">
                Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir
                le signaler par email à l'adresse contact@citefix.bj, en décrivant le problème de la manière la plus
                précise possible.
              </p>
              <p className="text-muted-foreground">
                Tout contenu téléchargé se fait aux risques et périls de l'utilisateur et sous sa seule responsabilité.
                En conséquence, CitéFix ne saurait être tenu responsable d'un quelconque dommage subi par l'ordinateur
                de l'utilisateur ou d'une quelconque perte de données consécutives au téléchargement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Droit applicable et juridiction compétente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Tout litige en relation avec l'utilisation du site www.citefix.bj est soumis au droit béninois. En
                dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux
                tribunaux compétents de Cotonou.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mise à jour</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les présentes mentions légales peuvent être amenées à évoluer, notamment en fonction des évolutions du
                site, de la réglementation ou de la jurisprudence. Il est donc conseillé de les consulter régulièrement.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Dernière mise à jour :</strong> 26 mai 2025
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
