"use client"

import { useEffect, useState } from "react"

interface Report {
  id: string
  title: string
  category: string
  status: string
  location: [number, number] // [longitude, latitude]
}

interface MapComponentProps {
  reports: Report[]
}

export default function MapComponent({ reports }: MapComponentProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simuler le chargement de la carte
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Chargement de la carte...</div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg relative overflow-hidden">
      {/* Simulation d'une carte avec des marqueurs */}
      {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fillOpacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" /> */}
      <div className="absolute inset-0"  />
      
      {/* Marqueurs fictifs pour les signalements */}
      {reports.map((report, index) => (
        <div
          key={report.id}
          className="absolute w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
          style={{
            left: `${20 + (index * 15) % 60}%`,
            top: `${30 + (index * 10) % 40}%`,
          }}
          title={report.title}
        >
          <div className="w-full h-full rounded-full animate-ping bg-red-400 opacity-75" />
        </div>
      ))}

      {/* Contrôles de carte fictifs */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center hover:bg-gray-50">
          +
        </button>
        <button className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center hover:bg-gray-50">
          −
        </button>
      </div>

      {/* Légende */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
        <div className="font-medium mb-2">Légende</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span>Signalements actifs</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span>Signalements résolus</span>
        </div>
      </div>

      {/* Indicateur de position fictif */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span>Votre position</span>
        </div>
      </div>
    </div>
  )
}