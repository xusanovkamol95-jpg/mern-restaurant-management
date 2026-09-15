import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import api from "../api/axios"
import {
  Box,
  TextField,
  Select,
  MenuItem as SelectOption,
  InputLabel,
  FormControl,
  Switch,
  FormControlLabel,
  Button,
  Alert,
  InputAdornment,
  CircularProgress,
} from "@mui/material"
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined"
import { t } from "../theme"

function EditMenuItem() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await api.get("/categories")
        setCategories(catRes.data.data || [])

        const itemRes = await api.get(`/menu-items/${id}`)
        const item = itemRes.data.message

        setName(item.name)
        setPrice(item.price)
        setCategory(item.category?._id || "")
        setImage(item.image || "")
        setDescription(item.description || "")
        setAvailable(item.available)
        setLoading(false)
      } catch (err) {
        console.log(err)
        setError("Mahsulot topilmadi")
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!name.trim() || !price || !category) {
      setError("Nom, narx va kategoriya majburiy")
      return
    }

    setSubmitting(true)
    try {
      await api.put(`/menu-items/${id}`, {
        name, price: Number(price), category, image, description, available
      })
      navigate("/menu")
    } catch (err) {
      setError(err.response?.data?.message || "Xatolik yuz berdi")
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 256 }}>
        <CircularProgress sx={{ color: t.copper }} />
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 560 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: t.surface,
          border: `1px solid ${t.sand}`,
          borderTop: `3px solid ${t.copper}`,
          p: { xs: 2.5, sm: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        <TextField
          label="Mahsulot nomi"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Narxi"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          slotProps={{
            input: { endAdornment: <InputAdornment position="end">so'm</InputAdornment> },
          }}
        />

        <FormControl fullWidth>
          <InputLabel id="category-label">Kategoriyani tanlang</InputLabel>
          <Select
            labelId="category-label"
            label="Kategoriyani tanlang"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <SelectOption key={cat._id} value={cat._id}>{cat.name}</SelectOption>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Rasm manzili (ixtiyoriy)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
        />

        <TextField
          label="Tavsif (ixtiyoriy)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          minRows={3}
        />

        <FormControlLabel
          control={<Switch checked={available} onChange={(e) => setAvailable(e.target.checked)} />}
          label="Mavjud"
        />

        {error && <Alert severity="error">{error}</Alert>}

        <Box sx={{ display: "flex", gap: 1.5, pt: 1 }}>
          <Button type="submit" variant="contained" disabled={submitting} sx={{ flexGrow: 1 }}>
            {submitting ? "Yangilanmoqda..." : "Yangilash"}
          </Button>
          <Button component={Link} to="/menu" color="inherit" startIcon={<ArrowBackOutlinedIcon />}>
            Menyuga qaytish
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default EditMenuItem
