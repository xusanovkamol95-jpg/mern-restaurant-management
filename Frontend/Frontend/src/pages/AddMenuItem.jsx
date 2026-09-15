import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/axios"
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem as SelectOption,
  InputLabel,
  FormControl,
  Switch,
  Button,
  Alert,
  InputAdornment,
} from "@mui/material"
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined"
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined"
import { t } from "../theme"

function SectionLabel({ children }) {
  return (
    <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: t.mute, mt: 1, mb: -0.5 }}>
      {children}
    </Typography>
  )
}

function AddMenuItem() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [available, setAvailable] = useState(true)
  const [imgOk, setImgOk] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories")
        setCategories(res.data.data || [])
      } catch (err) {
        console.log(err)
      }
    }
    fetchCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!name.trim() || !price || !category) {
      setError("Nom, narx va kategoriya majburiy")
      return
    }

    setSubmitting(true)
    try {
      await api.post("/menu-items", { name, price: Number(price), category, image, description, available })
      navigate("/menu")
    } catch (err) {
      setError(err.response?.data?.message || "Xatolik yuz berdi")
      setSubmitting(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 640, display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: t.surface,
          border: `1px solid ${t.sand}`,
          borderRadius: 1.5,
          borderTop: `3px solid ${t.copper}`,
          p: { xs: 2.5, sm: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 2.25,
          flexGrow: 1,
        }}
      >
        <SectionLabel>Asosiy ma'lumot</SectionLabel>
        <TextField
          label="Mahsulot nomi"
          placeholder="Masalan: Osh"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Narxi"
            type="number"
            placeholder="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            slotProps={{
              input: { endAdornment: <InputAdornment position="end">so'm</InputAdornment> },
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="category-label">Kategoriya</InputLabel>
            <Select
              labelId="category-label"
              label="Kategoriya"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <SelectOption key={cat._id} value={cat._id}>{cat.name}</SelectOption>
              ))}
            </Select>
          </FormControl>
        </Box>

        <SectionLabel>Qo'shimcha</SectionLabel>
        <TextField
          label="Rasm manzili (ixtiyoriy)"
          placeholder="https://..."
          value={image}
          onChange={(e) => { setImage(e.target.value); setImgOk(true) }}
          fullWidth
        />

        <TextField
          label="Tavsif (ixtiyoriy)"
          placeholder="Taom haqida qisqacha ma'lumot"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          minRows={3}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: `1px solid ${t.sand}`,
            borderRadius: 1,
            px: 2,
            py: 1,
          }}
        >
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: t.ink }}>Mavjud</Typography>
            <Typography sx={{ fontSize: 12, color: t.mute }}>Menyuda ko'rinadigan holat</Typography>
          </Box>
          <Switch checked={available} onChange={(e) => setAvailable(e.target.checked)} />
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        <Box sx={{ display: "flex", gap: 1.5, pt: 1 }}>
          <Button type="submit" variant="contained" disabled={submitting} sx={{ flexGrow: 1 }}>
            {submitting ? "Qo'shilmoqda..." : "Qo'shish"}
          </Button>
          <Button component={Link} to="/menu" color="inherit" startIcon={<ArrowBackOutlinedIcon />}>
            Menyuga qaytish
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: 200 },
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: t.mute }}>Ko'rinishi</Typography>
        <Box
          sx={{
            height: 150,
            borderRadius: 1.5,
            backgroundColor: t.sageLight,
            border: `1px solid ${t.sand}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {image && imgOk ? (
            <Box
              component="img"
              src={image}
              alt="Oldindan ko'rish"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={() => setImgOk(false)}
            />
          ) : (
            <RestaurantOutlinedIcon sx={{ fontSize: 28, color: t.sage, opacity: 0.5 }} />
          )}
        </Box>
        <Typography sx={{ fontSize: 12, color: t.mute, lineHeight: 1.5 }}>
          Rasm manzili kiritilsa, shu yerda mahsulot kartasidagi ko'rinishi taxminan aks etadi.
        </Typography>
      </Box>
    </Box>
  )
}

export default AddMenuItem
