import { Box, Typography } from "@mui/material"
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined"
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined"
import { t } from "../theme"

const STACK = [
  { label: "MongoDB", detail: "Ma'lumotlar bazasi" },
  { label: "Express", detail: "Backend server" },
  { label: "React", detail: "Foydalanuvchi interfeysi" },
  { label: "Node.js", detail: "Server muhiti" },
]

function About() {
  return (
    <Box sx={{ maxWidth: 720 }}>
      <Box
        sx={{
          backgroundColor: t.surface,
          border: `1px solid ${t.sand}`,
          borderRadius: 1.5,
          borderTop: `3px solid ${t.copper}`,
          p: { xs: 3, sm: 4 },
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <RestaurantMenuOutlinedIcon sx={{ color: t.copper, fontSize: 24 }} />
          <Typography variant="h5" sx={{ fontSize: 20, color: t.ink }}>
            Menyu boshqaruv tizimi
          </Typography>
        </Box>
        <Typography sx={{ color: t.mute, lineHeight: 1.7, fontSize: 15 }}>
          Bu — restoran menyusini boshqarish tizimi. Ushbu ilova orqali kategoriyalar
          va menyu mahsulotlarini qo'shish, tahrirlash, o'chirish hamda qidirish,
          filtrlash va saralash imkoniyatlari mavjud.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <CodeOutlinedIcon sx={{ fontSize: 18, color: t.mute }} />
        <Typography sx={{ fontSize: 13.5, color: t.mute, fontWeight: 500 }}>
          Texnologiyalar (MERN stack)
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
          gap: 1.5,
        }}
      >
        {STACK.map((s) => (
          <Box
            key={s.label}
            sx={{
              backgroundColor: t.surface,
              border: `1px solid ${t.sand}`,
              borderRadius: 1.5,
              borderLeft: `3px solid ${t.sage}`,
              p: 2,
              transition: `transform 200ms ${t.ease}, box-shadow 200ms ${t.ease}`,
              "&:hover": { transform: "translateY(-2px)", boxShadow: t.shadowSm },
            }}
          >
            <Typography sx={{ fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600, fontSize: 15.5, color: t.ink }}>
              {s.label}
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: t.mute, mt: 0.25 }}>
              {s.detail}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default About
