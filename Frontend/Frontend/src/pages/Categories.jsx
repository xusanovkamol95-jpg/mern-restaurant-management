import { useEffect, useState } from "react"
import api from "../api/axios"
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Skeleton,
} from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"
import { t } from "../theme"

function Categories() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState("")
  const [pendingDelete, setPendingDelete] = useState(null)
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories")
      setCategories(res.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const resetForm = () => {
    setName("")
    setDescription("")
    setEditId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!name.trim()) {
      setError("Kategoriya nomi kiritilmagan")
      return
    }

    try {
      if (editId) {
        await api.put(`/categories/${editId}`, { name, description })
        setToast({ severity: "success", message: "Kategoriya yangilandi" })
      } else {
        await api.post("/categories", { name, description })
        setToast({ severity: "success", message: "Kategoriya qo'shildi" })
      }
      resetForm()
      fetchCategories()
    } catch (error) {
      setError(error.response?.data?.message || "Xatolik yuz berdi")
    }
  }

  const handleEdit = (cat) => {
    setEditId(cat._id)
    setName(cat.name)
    setDescription(cat.description || "")
  }

  const confirmDelete = async () => {
    if (!pendingDelete) return
    try {
      await api.delete(`/categories/${pendingDelete._id}`)
      setPendingDelete(null)
      setToast({ severity: "success", message: "Kategoriya o'chirildi" })
      fetchCategories()
    } catch (error) {
      console.log(error)
      setToast({ severity: "error", message: "O'chirishda xatolik yuz berdi" })
    }
  }

  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: t.surface,
          border: `1px solid ${t.sand}`,
          borderRadius: 1.5,
          borderTop: `3px solid ${t.copper}`,
          p: 3,
          mb: 3.5,
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          alignItems: "flex-start",
          transition: `box-shadow 200ms ${t.ease}`,
          ...(editId && { boxShadow: `0 0 0 3px ${t.copperLight}` }),
        }}
      >
        {editId && (
          <Chip
            size="small"
            label="Tahrirlash rejimi"
            sx={{ backgroundColor: t.copperLight, color: t.copperDark, width: "100%", justifyContent: "flex-start", fontSize: 12 }}
          />
        )}
        <TextField
          label="Kategoriya nomi"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ minWidth: 200, flexGrow: 1, maxWidth: 260 }}
        />
        <TextField
          label="Tavsif"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ minWidth: 220, flexGrow: 2 }}
        />
        <Box sx={{ display: "flex", gap: 1, pt: 0.25 }}>
          <Button type="submit" variant="contained">
            {editId ? "Yangilash" : "Qo'shish"}
          </Button>
          {editId && (
            <Button color="inherit" onClick={resetForm}>Bekor qilish</Button>
          )}
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Skeleton variant="rounded" height={220} sx={{ borderRadius: 1.5 }} />
      ) : categories.length === 0 ? (
        <Box sx={{ border: `1px dashed ${t.sand}`, borderRadius: 1.5, py: 8, textAlign: "center", color: t.mute }}>
          <LocalOfferOutlinedIcon sx={{ fontSize: 30, mb: 1, opacity: 0.5 }} />
          <Typography>Hozircha kategoriyalar yo'q</Typography>
        </Box>
      ) : (
        <>
          <Typography sx={{ fontSize: 13, color: t.mute, mb: 1 }}>
            Jami {categories.length} ta kategoriya
          </Typography>
          <Box sx={{ backgroundColor: t.surface, border: `1px solid ${t.sand}`, borderRadius: 1.5, overflow: "hidden" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nomi</TableCell>
                  <TableCell>Tavsifi</TableCell>
                  <TableCell align="right">Amallar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((cat, i) => (
                  <TableRow
                    key={cat._id}
                    hover
                    sx={{
                      backgroundColor: editId === cat._id ? t.copperLight : i % 2 === 1 ? "rgba(34,30,25,0.02)" : "transparent",
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600, color: t.ink }}>{cat.name}</TableCell>
                    <TableCell sx={{ color: t.mute }}>{cat.description || "—"}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => handleEdit(cat)} sx={{ color: t.copper, "&:hover": { backgroundColor: t.copperLight } }}>
                        <EditOutlinedIcon sx={{ fontSize: 19 }} />
                      </IconButton>
                      <IconButton size="small" onClick={() => setPendingDelete(cat)} sx={{ color: t.rust, "&:hover": { backgroundColor: t.rustLight } }}>
                        <DeleteOutlineOutlinedIcon sx={{ fontSize: 19 }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </>
      )}

      <Dialog open={!!pendingDelete} onClose={() => setPendingDelete(null)}>
        <DialogTitle sx={{ fontFamily: '"Fraunces", Georgia, serif' }}>
          Kategoriyani o'chirish
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: t.mute }}>
            "{pendingDelete?.name}" kategoriyasini o'chirishni tasdiqlaysizmi?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setPendingDelete(null)} color="inherit">Bekor qilish</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">O'chirish</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!toast} autoHideDuration={3000} onClose={() => setToast(null)}>
        {toast && <Alert severity={toast.severity} onClose={() => setToast(null)}>{toast.message}</Alert>}
      </Snackbar>
    </Box>
  )
}

export default Categories
