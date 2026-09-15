import { useState, useEffect } from "react"
import { Box, Typography, Skeleton, Alert } from "@mui/material"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined"
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined"
import api from "../api/axios"
import { t } from "../theme"

function StatCard({ label, value, icon: Icon, accent, loading }) {
  return (
    <Box
      sx={{
        backgroundColor: t.surface,
        border: `1px solid ${t.sand}`,
        borderLeft: `3px solid ${accent}`,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        minWidth: 0,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: 13.5, color: t.mute, fontWeight: 500 }}>{label}</Typography>
        <Icon sx={{ fontSize: 20, color: accent }} />
      </Box>
      {loading ? (
        <Skeleton variant="text" width={64} height={44} />
      ) : (
        <Typography
          sx={{
            fontFamily: '"Fraunces", Georgia, serif',
            fontSize: 36,
            fontWeight: 600,
            color: t.ink,
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>
      )}
    </Box>
  )
}

function Dashboard() {
  const [totalItems, setTotalItems] = useState(0)
  const [totalCategories, setTotalCategories] = useState(0)
  const [availableCount, setAvailableCount] = useState(0)
  const [unavailableCount, setUnavailableCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsRes = await api.get("/menu-items")
        const items = itemsRes.data.menuitems || []

        const catRes = await api.get("/categories")
        const cats = catRes.data.data || []

        setTotalItems(items.length)
        setTotalCategories(cats.length)
        setAvailableCount(items.filter((i) => i.available).length)
        setUnavailableCount(items.filter((i) => !i.available).length)
      } catch (err) {
        console.log(err)
        setError("Ma'lumotlarni yuklab bo'lmadi. Server bilan aloqa yo'q.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const cards = [
    { label: "Jami mahsulotlar", value: totalItems, icon: Inventory2OutlinedIcon, accent: t.copper },
    { label: "Jami kategoriyalar", value: totalCategories, icon: LocalOfferOutlinedIcon, accent: t.sage },
    { label: "Mavjud mahsulotlar", value: availableCount, icon: CheckCircleOutlineIcon, accent: t.sage },
    { label: "Mavjud emas", value: unavailableCount, icon: HighlightOffOutlinedIcon, accent: t.rust },
  ]

  return (
    <Box>
      {error && (
        <Alert severity="warning" sx={{ mb: 3, borderRadius: "3px" }}>
          {error}
        </Alert>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        {cards.map((card) => (
          <StatCard key={card.label} {...card} loading={loading} />
        ))}
      </Box>
    </Box>
  )
}

export default Dashboard
