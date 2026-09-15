import { useState, useEffect } from "react"
import { Box, Typography, Skeleton, Alert } from "@mui/material"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined"
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined"
import api from "../api/axios"
import { t } from "../theme"

function StatCard({ label, value, icon: Icon, accent, accentSoft, loading }) {
  return (
    <Box
      sx={{
        backgroundColor: t.surface,
        border: `1px solid ${t.sand}`,
        borderRadius: 1.5,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minWidth: 0,
        position: "relative",
        overflow: "hidden",
        transition: `transform 200ms ${t.ease}, box-shadow 200ms ${t.ease}, border-color 200ms ${t.ease}`,
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: t.shadowMd,
          borderColor: "transparent",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          backgroundColor: accent,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: 13.5, color: t.mute, fontWeight: 500 }}>{label}</Typography>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "8px",
            backgroundColor: accentSoft,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon sx={{ fontSize: 18, color: accent }} />
        </Box>
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

function AvailabilityBar({ available, unavailable, loading }) {
  const total = available + unavailable
  const pct = total > 0 ? Math.round((available / total) * 100) : 0

  return (
    <Box
      sx={{
        backgroundColor: t.surface,
        border: `1px solid ${t.sand}`,
        borderRadius: 1.5,
        p: 3,
        mt: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", mb: 1.5 }}>
        <Typography sx={{ fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600, fontSize: 16, color: t.ink }}>
          Mavjudlik nisbati
        </Typography>
        {!loading && (
          <Typography sx={{ fontSize: 13.5, color: t.mute }}>
            <Box component="span" sx={{ color: t.sage, fontWeight: 700 }}>{pct}%</Box> mavjud
          </Typography>
        )}
      </Box>

      {loading ? (
        <Skeleton variant="rounded" height={10} sx={{ borderRadius: 999 }} />
      ) : total === 0 ? (
        <Typography sx={{ fontSize: 13.5, color: t.mute }}>Hali mahsulot qo'shilmagan</Typography>
      ) : (
        <>
          <Box
            sx={{
              height: 10,
              borderRadius: 999,
              backgroundColor: t.rustLight,
              overflow: "hidden",
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: `${pct}%`,
                backgroundColor: t.sage,
                borderRadius: 999,
                transition: `width 600ms ${t.ease}`,
              }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 3, mt: 1.75 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: t.sage }} />
              <Typography sx={{ fontSize: 12.5, color: t.mute }}>Mavjud — {available}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: t.rust }} />
              <Typography sx={{ fontSize: 12.5, color: t.mute }}>Mavjud emas — {unavailable}</Typography>
            </Box>
          </Box>
        </>
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
    { label: "Jami mahsulotlar", value: totalItems, icon: Inventory2OutlinedIcon, accent: t.copper, accentSoft: t.copperLight },
    { label: "Jami kategoriyalar", value: totalCategories, icon: LocalOfferOutlinedIcon, accent: t.sage, accentSoft: t.sageLight },
    { label: "Mavjud mahsulotlar", value: availableCount, icon: CheckCircleOutlineIcon, accent: t.sage, accentSoft: t.sageLight },
    { label: "Mavjud emas", value: unavailableCount, icon: HighlightOffOutlinedIcon, accent: t.rust, accentSoft: t.rustLight },
  ]

  return (
    <Box>
      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
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

      <AvailabilityBar available={availableCount} unavailable={unavailableCount} loading={loading} />
    </Box>
  )
}

export default Dashboard
