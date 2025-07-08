"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"
import { Pencil, Check, X } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const STATUS_LABELS = {
  reported: "Signalé",
  validated: "Validé",
  assigned: "Assigné",
  in_progress: "En cours",
  completed: "Terminé",
  resolved: "Résolu",
  rejected: "Rejeté",
}
const STATUS_OPTIONS = [
  { value: "reported", label: "Signalé" },
  { value: "validated", label: "Validé" },
  { value: "assigned", label: "Assigné" },
  { value: "in_progress", label: "En cours" },
  { value: "completed", label: "Terminé" },
  { value: "resolved", label: "Résolu" },
  { value: "rejected", label: "Rejeté" },
]
const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#6366f1", "#a21caf"]

export default function AdminReportsPage() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit] = useState(20)
  const [status, setStatus] = useState("all")
  const [category, setCategory] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editStatus, setEditStatus] = useState("")
  const [editComment, setEditComment] = useState("")

  // Récupère les signalements quand filtre/page change
  useEffect(() => {
    fetchReports()
    // eslint-disable-next-line
  }, [page, status, category])

  const fetchReports = async () => {
    setLoading(true)
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    try {
      let url = `http://localhost:3001/api/admin/reports?page=${page}&limit=${limit}`
      if (status && status !== "all") url += `&status=${status}`
      if (category) url += `&category=${category}`
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setReports(data)
    } catch {
      toast.error("Impossible de charger les signalements")
    }
    setLoading(false)
  }

  // Statistiques calculées dynamiquement à partir des reports
  function getStatusStats(reports) {
    const counts = {}
    for (const report of reports) {
      const key = report.status || "Autre"
      counts[key] = (counts[key] || 0) + 1
    }
    return Object.entries(counts).map(([status, value]) => ({
      name: STATUS_LABELS[status] || status,
      value,
    }))
  }
  function getCategoryStats(reports) {
    const counts = {}
    for (const report of reports) {
      const key = (report.category || "Autres").toLowerCase()
      counts[key] = (counts[key] || 0) + 1
    }
    return Object.entries(counts).map(([name, value], i) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: COLORS[i % COLORS.length],
    }))
  }

  // Pour les graphiques dynamiques
  const statusStats = getStatusStats(reports)
  const categoryStats = getCategoryStats(reports)

  // Gestion édition
  const handleEdit = (report) => {
    setEditingId(report._id)
    setEditStatus(report.status)
    setEditComment("")
  }
  const handleCancel = () => {
    setEditingId(null)
    setEditStatus("")
    setEditComment("")
  }
  const handleSave = async (id) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    try {
      const res = await fetch(`http://localhost:3001/api/admin/reports/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: editStatus, comment: editComment }),
      })
      if (!res.ok) throw new Error()
      toast.success("Statut mis à jour")
      setEditingId(null)
      fetchReports()
    } catch {
      toast.error("Erreur lors de la modification")
    }
  }

  return (
    <div className="container m-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Gestion des signalements</h1>

      {/* Dashboard mini-stat + graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Signalements par statut</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={statusStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Répartition par catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryStats.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle>Signalements</CardTitle>
          <div className="flex flex-wrap gap-2 mt-4">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tous statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous statuts</SelectItem>
                {STATUS_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              className="border rounded px-2 h-10"
              placeholder="Catégorie"
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-10">Chargement...</div>
          ) : reports.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">Aucun signalement</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2">#</th>
                    <th className="text-left p-2">Titre</th>
                    <th className="text-left p-2">Catégorie</th>
                    <th className="text-left p-2">Statut</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Auteur</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report, idx) => (
                    <tr key={report._id} className={editingId === report._id ? "bg-muted" : ""}>
                      <td className="p-2">{(page - 1) * limit + idx + 1}</td>
                      <td className="p-2">{report.title}</td>
                      <td className="p-2">{report.category}</td>
                      <td className="p-2">
                        {editingId === report._id ? (
                          <select
                            value={editStatus}
                            onChange={e => setEditStatus(e.target.value)}
                            className="border rounded p-1"
                          >
                            {STATUS_OPTIONS.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        ) : (
                          <Badge>{STATUS_LABELS[report.status] || report.status}</Badge>
                        )}
                      </td>
                      <td className="p-2">
                        {report.timestamps?.createdAt
                          ? new Date(report.timestamps.createdAt).toLocaleString("fr-FR")
                          : "-"}
                      </td>
                      <td className="p-2">{report.citizen?.name || "-"}</td>
                      <td className="p-2">
                        {editingId === report._id ? (
                          <div className="flex gap-1">
                            <Textarea
                              className="min-w-[120px] text-xs"
                              placeholder="Commentaire (optionnel)"
                              value={editComment}
                              onChange={e => setEditComment(e.target.value)}
                              rows={1}
                            />
                            <Button size="icon" variant="success" onClick={() => handleSave(report._id)}>
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="outline" onClick={handleCancel}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button size="icon" variant="outline" onClick={() => handleEdit(report)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  Précédent
                </Button>
                <span className="text-xs py-2">Page {page}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPage(page + 1)}
                  disabled={reports.length < limit}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
