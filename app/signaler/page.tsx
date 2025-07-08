"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AlertTriangle, Camera, Lightbulb, MapPin, Shield, Trash2, LocateFixed } from "lucide-react"
import toast from "react-hot-toast"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useRouter } from "next/navigation"

export default function ReportPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [location, setLocation] = useState<[number, number] | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const router = useRouter()

  // Gérer l'upload d'images
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setImages([...images, ...newFiles])
      const newUrls = newFiles.map((file) => URL.createObjectURL(file))
      setPreviewUrls([...previewUrls, ...newUrls])
    }
  }

  useEffect(() => {
    // Check dès le montage du composant
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (!token) {
      // Redirige vers la page login instantanément
      router.replace("/connexion")
    }
  }, [router])

  // Supprimer une image
  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
    const newUrls = [...previewUrls]
    URL.revokeObjectURL(newUrls[index])
    newUrls.splice(index, 1)
    setPreviewUrls(newUrls)
  }

  // Récupérer la géolocalisation
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("La géolocalisation n'est pas supportée par ce navigateur.")
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation([pos.coords.latitude, pos.coords.longitude])
        toast.success("Localisation récupérée !")
      },
      () => toast.error("Impossible d'obtenir la localisation."),
      { enableHighAccuracy: true }
    )
  }

useEffect(() => {
  if (leafletMapRef.current || !mapRef.current) return;

  leafletMapRef.current = L.map(mapRef.current).setView([6.37, 2.42], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(leafletMapRef.current);

  // Gestion du clic sur la carte
  leafletMapRef.current.on("click", function (e: L.LeafletMouseEvent) {
    if (!leafletMapRef.current) return;
    
    const { lat, lng } = e.latlng;
    setLocation([lat, lng]);
    
    const customIcon = L.divIcon({
      className: "custom-marker",
      html: `<div style="background:#6366f1;width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 2px 5px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center">
               <div style="width:8px;height:8px;background:white;border-radius:50%"></div>
             </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    if (markerRef.current) {
      leafletMapRef.current.removeLayer(markerRef.current);
    }

    markerRef.current = L.marker([lat, lng], { icon: customIcon })
      .addTo(leafletMapRef.current)
      .bindPopup("Position sélectionnée")
      .openPopup();

    leafletMapRef.current.setView([lat, lng], leafletMapRef.current.getZoom());
    toast.success(`Position sélectionnée : ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
  });

  return () => {
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
      markerRef.current = null;
    }
  };
}, []);

  // Gérer le marker après initialisation
  useEffect(() => {
    if (!leafletMapRef.current) return
    if (!location) {
      if (markerRef.current) {
        leafletMapRef.current.removeLayer(markerRef.current)
        markerRef.current = null
      }
      return
    }
    // Si marker déjà existant, on le déplace :
    if (markerRef.current) {
      markerRef.current.setLatLng(location)
    } else {
      markerRef.current = L.marker(location, {
        icon: L.divIcon({
          className: "",
          html: `<div style="background:#6366f1;width:20px;height:20px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 4px #0002"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })
      }).addTo(leafletMapRef.current)
    }
    leafletMapRef.current.setView(location, 17)
  }, [location])


  // Gérer la soumission du formulaire (identique à avant)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (!token) {
      toast.error("Veuillez vous connecter pour envoyer un signalement.")
      setIsSubmitting(false)
      return
    }
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("category", category)
    if (location) {
      // Inverse ici !
      formData.append(
        "location",
        JSON.stringify({ coordinates: [location[1], location[0]] }) // [lng, lat]
      )
    }
    images.forEach((file) => {
      formData.append("media", file)
    })
    try {
      const res = await fetch("http://localhost:3001/api/reports", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      })
      const data = await res.json()
      if (res.ok) {
        toast.success("Signalement envoyé avec succès !")
        setTitle("")
        setDescription("")
        setCategory("")
        setImages([])
        setPreviewUrls([])
        setLocation(null)
        setTimeout(() => {
          window.location.href = "/mes-signalements"
        }, 1500)
      } else {
        toast.error(data.error || "Erreur lors de l’envoi")
      }
    } catch {
      toast.error("Erreur réseau")
    } finally {
      setIsSubmitting(false)
    }
  }


  // Obtenir l'icône de la catégorie
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case "voirie": return <AlertTriangle className="h-5 w-5" />
      case "éclairage": return <Lightbulb className="h-5 w-5" />
      case "déchets": return <Trash2 className="h-5 w-5" />
      case "sécurité": return <Shield className="h-5 w-5" />
      default: return null
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
                <CardDescription>Utilisez la géolocalisation pour indiquer l&apos;emplacement du problème</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleGetLocation}
                  className="mb-4 flex items-center gap-2"
                >
                  <LocateFixed className="w-5 h-5" />
                  Récupérer ma localisation
                </Button>
                {/* Style inline FORTEMENT recommandé pour la carte */}
                <div
                  ref={mapRef}
                  style={{ height: "240px", width: "100%", borderRadius: 8, overflow: "hidden", border: "1px solid #eee", marginBottom: 12 }}
                />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {location ? (
                    <span>
                      Latitude: {location[0].toFixed(6)}, Longitude: {location[1].toFixed(6)}
                    </span>
                  ) : (
                    <span>Aucune position sélectionnée</span>
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
        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
            {isSubmitting ? "Envoi en cours..." : "Envoyer le signalement"}
          </Button>
        </div>

      </form>
    </div>
  )
}
