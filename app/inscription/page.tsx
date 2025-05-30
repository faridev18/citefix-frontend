import { redirect } from "next/navigation"

export default function RegisterPage() {
  redirect("/connexion?tab=inscription")
  return null
}
