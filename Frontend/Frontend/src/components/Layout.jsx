import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined"
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined"
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined"
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import { t } from "../theme"

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: SpaceDashboardOutlinedIcon, end: true },
  { to: "/menu", label: "Menyu", icon: RestaurantMenuOutlinedIcon },
  { to: "/add-menu-item", label: "Yangi mahsulot", icon: AddBoxOutlinedIcon },
  { to: "/categories", label: "Kategoriyalar", icon: LocalOfferOutlinedIcon },
  { to: "/about", label: "Biz haqimizda", icon: InfoOutlinedIcon },
]

const DRAWER_WIDTH = 264

function SidebarContent({ onNavigate }) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: t.panel,
        backgroundImage: `radial-gradient(560px circle at 0% 0%, rgba(190,106,52,0.14), transparent 55%)`,
        color: "#F4EFE6",
      }}
    >
      <Box sx={{ px: 3, py: 3.5, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "6px",
            background: `linear-gradient(155deg, ${t.copper}, ${t.copperDark})`,
            boxShadow: t.glowCopper,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <RestaurantMenuOutlinedIcon sx={{ fontSize: 18, color: "#FFF" }} />
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 600,
              fontSize: 19,
              lineHeight: 1.1,
              color: "#FBF8F2",
            }}
          >
            Menyu
          </Typography>
          <Typography sx={{ fontSize: 11.5, color: "#9BA79E", letterSpacing: 0.2 }}>
            Boshqaruv paneli
          </Typography>
        </Box>
      </Box>

      <Box sx={{ borderTop: `1px solid ${t.panelLine}`, mx: 3 }} />

      <Box component="nav" sx={{ mt: 1.5, px: 1.5, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  pl: 2,
                  pr: 1.75,
                  py: 1.1,
                  borderRadius: "6px",
                  color: isActive ? "#FBF8F2" : "#B7BFB9",
                  backgroundColor: isActive ? "rgba(190,106,52,0.16)" : "transparent",
                  transition: `background-color 160ms ${t.ease}, color 160ms ${t.ease}`,
                  overflow: "hidden",
                  "&:hover": {
                    backgroundColor: isActive ? "rgba(190,106,52,0.18)" : "rgba(255,255,255,0.06)",
                    color: "#FBF8F2",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: "18%",
                    bottom: "18%",
                    width: 3,
                    borderRadius: 999,
                    backgroundColor: t.copper,
                    transform: isActive ? "scaleY(1)" : "scaleY(0)",
                    transition: `transform 200ms ${t.ease}`,
                  },
                }}
              >
                <Icon sx={{ fontSize: 20 }} />
                <Typography sx={{ fontSize: 14.5, fontWeight: isActive ? 600 : 500 }}>
                  {label}
                </Typography>
              </Box>
            )}
          </NavLink>
        ))}
      </Box>

      <Box sx={{ mt: "auto", px: 3, py: 2.5, borderTop: `1px solid ${t.panelLine}` }}>
        <Typography sx={{ fontSize: 11.5, color: "#7E897F" }}>
          MERN · restoran menyusi tizimi
        </Typography>
      </Box>
    </Box>
  )
}

const PAGE_TITLES = {
  "/": { title: "Dashboard", subtitle: "Umumiy ko'rsatkichlar bir qarashda" },
  "/menu": { title: "Menyu", subtitle: "Barcha taomlar va mahsulotlar ro'yxati" },
  "/add-menu-item": { title: "Yangi mahsulot", subtitle: "Menyuga yangi taom qo'shish" },
  "/categories": { title: "Kategoriyalar", subtitle: "Menyu kategoriyalarini boshqarish" },
  "/about": { title: "Biz haqimizda", subtitle: "Tizim haqida ma'lumot" },
}

function currentPageMeta(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith("/edit-menu-item")) {
    return { title: "Mahsulotni tahrirlash", subtitle: "Mavjud taom ma'lumotlarini yangilash" }
  }
  return { title: "", subtitle: "" }
}

function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { title, subtitle } = currentPageMeta(location.pathname)

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: t.paper }}>
      {/* Desktop persistent sidebar */}
      <Box
        component="aside"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          display: { xs: "none", md: "block" },
        }}
      >
        <Box sx={{ position: "fixed", width: DRAWER_WIDTH, height: "100vh" }}>
          <SidebarContent />
        </Box>
      </Box>

      {/* Mobile temporary drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" },
        }}
      >
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Mobile top bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            display: { xs: "flex", md: "none" },
            backgroundColor: t.surface,
            color: t.ink,
            borderBottom: `1px solid ${t.sand}`,
          }}
        >
          <Toolbar sx={{ gap: 1.5 }}>
            <IconButton edge="start" onClick={() => setMobileOpen(true)} sx={{ color: t.ink }}>
              <MenuIcon />
            </IconButton>
            <Typography sx={{ fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600, fontSize: 18 }}>
              Menyu
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Page header */}
        {title && (
          <Box
            key={`title-${location.pathname}`}
            sx={{
              px: { xs: 3, md: 5 },
              pt: { xs: 3, md: 5 },
              pb: 2.5,
              animation: "pageEnter 320ms cubic-bezier(0.22,1,0.36,1)",
              "@keyframes pageEnter": {
                from: { opacity: 0, transform: "translateY(6px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontSize: { xs: 24, md: 28 }, color: t.ink, lineHeight: 1.15 }}
            >
              {title}
            </Typography>
            <Typography sx={{ fontSize: 14.5, color: t.mute, mt: 0.5 }}>
              {subtitle}
            </Typography>
          </Box>
        )}

        <Box
          key={`content-${location.pathname}`}
          sx={{
            px: { xs: 3, md: 5 },
            pb: 6,
            flexGrow: 1,
            animation: "pageEnter 380ms cubic-bezier(0.22,1,0.36,1)",
            "@keyframes pageEnter": {
              from: { opacity: 0, transform: "translateY(8px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
