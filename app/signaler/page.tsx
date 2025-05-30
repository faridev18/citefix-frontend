"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Camera, Lightbulb, MapPin, Shield, Trash2 } from "lucide-react"
import dynamic from "next/dynamic"

// Import dynamique de la carte pour éviter les erreurs SSR
const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-muted/30 rounded-lg flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Chargement de la carte...</div>
    </div>
  ),
})

export default function ReportPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [location, setLocation] = useState<[number, number] | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Gérer l'upload d'images
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setImages([...images, ...newFiles])

      // Créer des URLs pour la prévisualisation
      const newUrls = newFiles.map((file) => URL.createObjectURL(file))
      setPreviewUrls([...previewUrls, ...newUrls])
    }
  }

  // Supprimer une image
  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)

    const newUrls = [...previewUrls]
    URL.revokeObjectURL(newUrls[index]) // Libérer l'URL
    newUrls.splice(index, 1)
    setPreviewUrls(newUrls)
  }

  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      // Show success message
      alert("Signalement envoyé avec succès ! Vous allez être redirigé vers vos signalements.")

      // Reset form
      setTitle("")
      setDescription("")
      setCategory("")
      setImages([])
      setPreviewUrls([])
      setLocation(null)

      // Redirect to user reports
      setTimeout(() => {
        window.location.href = "/mes-signalements"
      }, 2000)
    }, 1500)
  }

  // Obtenir l'icône de la catégorie
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case "voirie":
        return <AlertTriangle className="h-5 w-5" />
      case "éclairage":
        return <Lightbulb className="h-5 w-5" />
      case "déchets":
        return <Trash2 className="h-5 w-5" />
      case "sécurité":
        return <Shield className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <div className="container m-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Signaler un problème</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
                <CardDescription>Décrivez le problème que vous souhaitez signaler</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre du signalement</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Lampadaire cassé devant l'école"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="voirie">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Voirie</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="éclairage">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          <span>Éclairage</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="déchets">
                        <div className="flex items-center gap-2">
                          <Trash2 className="h-4 w-4" />
                          <span>Déchets</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="sécurité">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <span>Sécurité</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description détaillée</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez le problème en détail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
                <CardDescription>Ajoutez des photos pour illustrer le problème (max 5)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => removeImage(index)}
                        type="button"
                      >
                        <span className="sr-only">Supprimer</span>×
                      </Button>
                    </div>
                  ))}

                  {previewUrls.length < 5 && (
                    <div className="aspect-square rounded-md border-2 border-dashed flex flex-col items-center justify-center p-4 hover:bg-muted/50 cursor-pointer">
                      <Label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center justify-center h-full w-full"
                      >
                        <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground text-center">
                          Cliquez pour ajouter une photo
                        </span>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                          multiple
                        />
                      </Label>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Localisation</CardTitle>
                <CardDescription>Indiquez l&apos;emplacement du problème sur la carte</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] mb-4">
                  <MapComponent reports={[]} />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {location ? (
                    <span>
                      Latitude: {location[0].toFixed(6)}, Longitude: {location[1].toFixed(6)}
                    </span>
                  ) : (
                    <span>Cliquez sur la carte pour définir l&apos;emplacement</span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Résumé</CardTitle>
                <CardDescription>Vérifiez les informations avant de soumettre</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {title && (
                    <div>
                      <h3 className="font-medium">Titre</h3>
                      <p className="text-muted-foreground">{title}</p>
                    </div>
                  )}
                  {description && (
                    <div>
                      <h3 className="font-medium">Description</h3>
                      <p className="text-muted-foreground">{description}</p>
                    </div>
                  )}
                  {category && (
                    <div>
                      <h3 className="font-medium">Catégorie</h3>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(category)}
                        <p className="text-muted-foreground">{category}</p>
                      </div>
                    </div>
                  )}
                  {location && (
                    <div>
                      <h3 className="font-medium">Localisation</h3>
                      <p className="text-muted-foreground">
                        Latitude: {location[0].toFixed(6)}, Longitude: {location[1].toFixed(6)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
