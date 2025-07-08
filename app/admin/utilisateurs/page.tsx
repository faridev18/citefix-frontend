"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pencil, Check, X } from "lucide-react"
import toast from "react-hot-toast"

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editRole, setEditRole] = useState("")
  const [editStatus, setEditStatus] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    try {
      const res = await fetch("http://localhost:3001/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setUsers(data)
    } catch {
      toast.error("Impossible de charger les utilisateurs")
    }
    setLoading(false)
  }

  const handleEdit = (user) => {
    setEditingId(user._id)
    setEditRole(user.role)
    setEditStatus(user.status ?? "active")
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditRole("")
    setEditStatus("")
  }

  const handleSave = async (id) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    try {
      const res = await fetch(`http://localhost:3001/api/admin/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: editRole, status: editStatus }),
      })
      if (!res.ok) throw new Error()
      toast.success("Utilisateur modifié")
      setEditingId(null)
      fetchUsers()
    } catch {
      toast.error("Erreur lors de la modification")
    }
  }

  return (
    <div className="container m-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Utilisateurs</h1>
      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-10">Chargement...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">Aucun utilisateur</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2">#</th>
                    <th className="text-left p-2">Nom</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Rôle</th>
                    <th className="text-left p-2">Statut</th>
                    <th className="text-left p-2">Date d’inscription</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user._id} className={editingId === user._id ? "bg-muted" : ""}>
                      <td className="p-2">{idx + 1}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name || "User"} />
                            <AvatarFallback>{user.name?.charAt(0) ?? "U"}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">
                        {editingId === user._id ? (
                          <select
                            value={editRole}
                            onChange={e => setEditRole(e.target.value)}
                            className="border rounded p-1"
                          >
                            <option value="citizen">Citoyen</option>
                            <option value="technician">Technicien</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          <Badge>{user.role}</Badge>
                        )}
                      </td>
                      <td className="p-2">
                        {editingId === user._id ? (
                          <select
                            value={editStatus}
                            onChange={e => setEditStatus(e.target.value)}
                            className="border rounded p-1"
                          >
                            <option value="active">Actif</option>
                            <option value="inactive">Inactif</option>
                          </select>
                        ) : (
                          <Badge variant={user.status === "active" ? "default" : "outline"}>
                            {user.status ?? "active"}
                          </Badge>
                        )}
                      </td>
                      <td className="p-2">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString("fr-FR") : "-"}
                      </td>
                      <td className="p-2">
                        {editingId === user._id ? (
                          <>
                            <Button size="icon" variant="success" onClick={() => handleSave(user._id)}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="outline" onClick={handleCancel}>
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <Button size="icon" variant="outline" onClick={() => handleEdit(user)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
