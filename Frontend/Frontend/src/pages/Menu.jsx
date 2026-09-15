import { Link } from "react-router-dom"
import api from "../api/axios"
import { useEffect, useMemo, useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem as SelectOption,
  InputAdornment,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined"
import { t } from "../theme"

function formatPrice(value) {
  return new Intl.NumberFormat("uz-UZ").format(value)
}

function MenuItemCard({ item, onDelete }) {
  return (
    <Box
      sx={{
        backgroundColor: t.surface,
        border: `1px solid ${t.sand}`,
        borderRadius: 1.5,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: `transform 220ms ${t.ease}, box-shadow 220ms ${t.ease}, border-color 220ms ${t.ease}`,
        "&:hover": { transform: "translateY(-3px)", boxShadow: t.shadowMd, borderColor: "transparent" },
        "&:hover .menu-card-img": { transform: "scale(1.06)" },
      }}
    >
      <Box
        sx={{
          height: 132,
          backgroundColor: t.sageLight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {item.image ? (
          <Box
            component="img"
            className="menu-card-img"
            src={item.image}
            alt={item.name}
            sx={{ width: "100%", height: "100%", objectFit: "cover", transition: `transform 400ms ${t.ease}` }}
            onError={(e) => { e.target.style.display = "none" }}
          />
        ) : (
          <RestaurantOutlinedIcon sx={{ fontSize: 30, color: t.sage, opacity: 0.5 }} />
        )}
      </Box>

      <Box sx={{ p: 2.25, display: "flex", flexDirection: "column", gap: 1, flexGrow: 1 }}>
        <Typography sx={{ fontSize: 12.5, color: t.mute }}>
          {item.category?.name || "Kategoriyasiz"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
          <Typography sx={{ fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600, fontSize: 17, color: t.ink }}>
            {item.name}
          </Typography>
          <Box sx={{ flexGrow: 1, borderBottom: `1px dotted ${t.sand}`, mb: "3px" }} />
          <Typography sx={{ fontVariantNumeric: "tabular-nums", fontWeight: 600, fontSize: 15, color: t.ink, whiteSpace: "nowrap" }}>
            {formatPrice(item.price)} so'm
          </Typography>
        </Box>

        {item.description && (
          <Typography sx={{ fontSize: 13, color: t.mute, lineHeight: 1.4 }}>
            {item.description}
          </Typography>
        )}

        <Box sx={{ mt: 0.5 }}>
          <Chip
            size="small"
            icon={
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: item.available ? t.sage : t.rust,
                  ml: "8px !important",
                }}
              />
            }
            label={item.available ? "Mavjud" : "Tugagan"}
            sx={{
              backgroundColor: item.available ? t.sageLight : t.rustLight,
              color: item.available ? t.sage : t.rust,
              fontSize: 12.5,
              "& .MuiChip-icon": { color: "inherit" },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 1, mt: "auto", pt: 1.5 }}>
          <Button
            component={Link}
            to={`/edit-menu-item/${item._id}`}
            size="small"
            startIcon={<EditOutlinedIcon sx={{ fontSize: 16 }} />}
            variant="outlined"
            sx={{ flexGrow: 1 }}
          >
            Tahrirlash
          </Button>
          <IconButton
            size="small"
            onClick={() => onDelete(item)}
            sx={{
              border: `1.5px solid ${t.rust}`,
              borderRadius: "4px",
              color: t.rust,
              "&:hover": { backgroundColor: t.rustLight },
            }}
          >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

function CategoryPills({ categories, selected, onSelect }) {
  const items = [{ _id: "All", name: "Barchasi" }, ...categories]
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
      {items.map((cat) => {
        const isActive = selected === cat._id
        return (
          <Box
            key={cat._id}
            component="button"
            onClick={() => onSelect(cat._id)}
            sx={{
              cursor: "pointer",
              border: `1.5px solid ${isActive ? t.ink : t.sand}`,
              backgroundColor: isActive ? t.ink : t.surface,
              color: isActive ? "#FFF" : t.ink,
              borderRadius: 999,
              px: 1.75,
              py: 0.6,
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "inherit",
              transition: `all 160ms ${t.ease}`,
              "&:hover": {
                borderColor: t.ink,
                transform: "translateY(-1px)",
              },
            }}
          >
            {cat.name}
          </Box>
        )
      })}
    </Box>
  )
}

function Menu() {
  const [menuItems, setMenuItems] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOption, setSortOption] = useState("name-asc")
  const [pendingDelete, setPendingDelete] = useState(null)
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchMenuItems = async () => {
    try {
      const res = await api.get("/menu-items")
      setMenuItems(res.data.menuitems || [])
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories")
      setCategories(res.data.data || [])
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchMenuItems()
    fetchCategories()
  }, [])

  const confirmDelete = async () => {
    if (!pendingDelete) return
    try {
      await api.delete(`/menu-items/${pendingDelete._id}`)
      setPendingDelete(null)
      setToast({ severity: "success", message: "Mahsulot o'chirildi" })
      fetchMenuItems()
    } catch (error) {
      console.log(error.message)
      setToast({ severity: "error", message: "O'chirishda xatolik yuz berdi" })
    }
  }

  const filtered = useMemo(() => {
    let list = menuItems.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    if (selectedCategory !== "All") {
      list = list.filter((item) => item.category?._id === selectedCategory)
    }
    return [...list].sort((a, b) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name)
      if (sortOption === "name-desc") return b.name.localeCompare(a.name)
      if (sortOption === "price-asc") return a.price - b.price
      if (sortOption === "price-desc") return b.price - a.price
      return 0
    })
  }, [menuItems, search, selectedCategory, sortOption])

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", mb: 2.5 }}>
        <TextField
          placeholder="Nomi bo'yicha qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 220, flexGrow: 1, maxWidth: 320 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon sx={{ fontSize: 19, color: t.mute }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          sx={{ minWidth: 210 }}
        >
          <SelectOption value="name-asc">Nomi (A-Z)</SelectOption>
          <SelectOption value="name-desc">Nomi (Z-A)</SelectOption>
          <SelectOption value="price-asc">Narxi: arzon → qimmat</SelectOption>
          <SelectOption value="price-desc">Narxi: qimmat → arzon</SelectOption>
        </Select>

        <Button
          component={Link}
          to="/add-menu-item"
          variant="contained"
          startIcon={<AddOutlinedIcon />}
          sx={{ ml: { sm: "auto" } }}
        >
          Yangi mahsulot
        </Button>
      </Box>

      <Box sx={{ mb: 3.5 }}>
        <CategoryPills categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
      </Box>

      {loading ? (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" }, gap: 2 }}>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} variant="rounded" height={280} sx={{ borderRadius: 1.5 }} />
          ))}
        </Box>
      ) : filtered.length === 0 ? (
        <Box
          sx={{
            border: `1px dashed ${t.sand}`,
            borderRadius: 1.5,
            py: 8,
            textAlign: "center",
            color: t.mute,
          }}
        >
          <RestaurantOutlinedIcon sx={{ fontSize: 30, mb: 1, opacity: 0.5 }} />
          <Typography>Hech narsa topilmadi</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          {filtered.map((item) => (
            <MenuItemCard key={item._id} item={item} onDelete={setPendingDelete} />
          ))}
        </Box>
      )}

      <Dialog open={!!pendingDelete} onClose={() => setPendingDelete(null)}>
        <DialogTitle sx={{ fontFamily: '"Fraunces", Georgia, serif' }}>
          Mahsulotni o'chirish
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: t.mute }}>
            "{pendingDelete?.name}" mahsulotini o'chirishni tasdiqlaysizmi? Bu amalni orqaga qaytarib bo'lmaydi.
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

export default Menu
