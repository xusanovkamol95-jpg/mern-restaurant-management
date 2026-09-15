import { createTheme } from "@mui/material/styles"

// Design tokens
// ink     — primary text, near-black warm charcoal
// panel   — dark sidebar / chalkboard surface
// paper   — warm off-white app background
// copper  — primary accent (actions, active states)
// sage    — secondary accent (fresh / available)
// rust    — danger / unavailable
// sand    — hairline borders on the paper surface

const tokens = {
  ink: "#221E19",
  panel: "#1C231F",
  panelLine: "#2E3B34",
  paper: "#FAF6EF",
  surface: "#FFFFFF",
  copper: "#BE6A34",
  copperDark: "#9C5527",
  sage: "#3F5D4C",
  sageLight: "#EAF0EB",
  rust: "#A63B2E",
  rustLight: "#F7E9E6",
  sand: "#E7DDCB",
  mute: "#75695A",
}

export const t = tokens

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: tokens.paper,
      paper: tokens.surface,
    },
    text: {
      primary: tokens.ink,
      secondary: tokens.mute,
    },
    primary: {
      main: tokens.copper,
      dark: tokens.copperDark,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: tokens.sage,
      contrastText: "#FFFFFF",
    },
    error: {
      main: tokens.rust,
    },
    divider: tokens.sand,
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h2: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h3: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h4: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h5: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h6: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          boxShadow: "none",
          paddingInline: 18,
          paddingBlock: 9,
        },
        containedPrimary: {
          "&:hover": { boxShadow: "none", backgroundColor: tokens.copperDark },
        },
        outlined: {
          borderWidth: 1.5,
          "&:hover": { borderWidth: 1.5 },
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
    },
    MuiSelect: {
      defaultProps: { size: "small" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          backgroundColor: tokens.surface,
        },
        notchedOutline: {
          borderColor: tokens.sand,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 3, fontWeight: 600 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontFamily: '"Fraunces", Georgia, serif',
          fontWeight: 600,
          color: tokens.ink,
          backgroundColor: tokens.paper,
          borderBottom: `1.5px solid ${tokens.ink}`,
        },
        root: {
          borderBottom: `1px solid ${tokens.sand}`,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": { color: tokens.sage },
          "&.Mui-checked + .MuiSwitch-track": { backgroundColor: tokens.sage },
        },
      },
    },
  },
})

export default theme
