"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, MapPin, Bell, User, LogIn, LogOut, Shield } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const pathname = usePathname()
  const router = useRouter()

  // Un seul useEffect pour tout synchroniser
  useEffect(() => {
    const fetchUser = () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      setIsLoggedIn(!!token)
      if (token) {
        fetch("http://localhost:3001/api/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => res.ok ? res.json() : null)
          .then(data => setUser(data))
          .catch(() => setUser(null))
      } else {
        setUser(null)
      }
    }

    fetchUser()
    window.addEventListener("storage", fetchUser)
    window.addEventListener("auth", fetchUser)
    return () => {
      window.removeEventListener("storage", fetchUser)
      window.removeEventListener("auth", fetchUser)
    }
  }, [])

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setUser(null)
    toast.success("Déconnexion réussie")
    router.push("/connexion")
    window.dispatchEvent(new Event("auth")) // Pour synchro autres onglets
  }

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/a-propos" },
    { name: "Tous les signalements", href: "/recherche" },
    { name: "Carte des signalements", href: "/carte" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container m-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">CitéFix</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="default" className="hidden md:flex">
            <Link href="/signaler">
              <MapPin className="mr-2 h-4 w-4" />
              Signaler un problème
            </Link>
          </Button>
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-2">
              {user?.role === "admin" && (
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/admin">
                    <Shield className="h-5 w-5 text-orange-500" />
                  </Link>
                </Button>
              )}
              <Button variant="ghost" size="icon" asChild>
                <Link href="/mes-signalements">
                  <MapPin className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/profil">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button asChild variant="outline" className="hidden md:flex">
              <Link href="/connexion">
                <LogIn className="mr-2 h-4 w-4" />
                Connexion
              </Link>
            </Button>
          )}
          <ModeToggle />
          {/* Menu mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button asChild variant="default" className="mt-2">
                  <Link href="/signaler">
                    <MapPin className="mr-2 h-4 w-4" />
                    Signaler un problème
                  </Link>
                </Button>
                {isLoggedIn ? (
                  <>
                    {user?.role === "admin" && (
                      <Button asChild variant="outline">
                        <Link href="/admin">
                          <Shield className="mr-2 h-4 w-4 text-orange-500" />
                          Admin
                        </Link>
                      </Button>
                    )}
                    <Button asChild variant="outline">
                      <Link href="/notifications">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/profil">
                        <User className="mr-2 h-4 w-4" />
                        Mon profil
                      </Link>
                    </Button>
                    <Button variant="outline" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <Button asChild variant="outline">
                    <Link href="/connexion">
                      <LogIn className="mr-2 h-4 w-4" />
                      Connexion
                    </Link>
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
