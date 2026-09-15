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
  copperLight: "#F3E3D3",
  sage: "#3F5D4C",
  sageLight: "#EAF0EB",
  rust: "#A63B2E",
  rustLight: "#F7E9E6",
  sand: "#E7DDCB",
  sandDark: "#D8C9AC",
  mute: "#75695A",
  shadowSm: "0 1px 2px rgba(34,30,25,0.06)",
  shadowMd: "0 4px 16px -4px rgba(34,30,25,0.14)",
  shadowLg: "0 16px 40px -12px rgba(34,30,25,0.22)",
  glowCopper: "0 6px 18px -6px rgba(190,106,52,0.55)",
  glowSage: "0 6px 18px -6px rgba(63,93,76,0.45)",
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
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
      light: tokens.copperLight,
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
    borderRadius: 6,
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600, letterSpacing: "-0.01em" },
    h2: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600, letterSpacing: "-0.01em" },
    h3: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600, letterSpacing: "-0.01em" },
    h4: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600, letterSpacing: "-0.01em" },
    h5: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h6: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "::selection": {
          backgroundColor: tokens.copperLight,
          color: tokens.ink,
        },
        "*:focus-visible": {
          outline: `2px solid ${tokens.copper}`,
          outlineOffset: 2,
        },
        "::-webkit-scrollbar": { width: 10, height: 10 },
        "::-webkit-scrollbar-track": { background: "transparent" },
        "::-webkit-scrollbar-thumb": {
          background: tokens.sandDark,
          borderRadius: 999,
          border: `2px solid ${tokens.paper}`,
        },
        "::-webkit-scrollbar-thumb:hover": { background: tokens.mute },
        body: { scrollbarColor: `${tokens.sandDark} transparent` },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: "none",
          paddingInline: 18,
          paddingBlock: 9,
          transition: `transform 160ms ${tokens.ease}, box-shadow 160ms ${tokens.ease}, background-color 160ms ${tokens.ease}`,
          "&:active": { transform: "translateY(1px)" },
        },
        containedPrimary: {
          boxShadow: tokens.glowCopper,
          "&:hover": { boxShadow: tokens.glowCopper, backgroundColor: tokens.copperDark, transform: "translateY(-1px)" },
        },
        containedError: {
          boxShadow: "0 6px 18px -6px rgba(166,59,46,0.5)",
          "&:hover": { transform: "translateY(-1px)" },
        },
        outlined: {
          borderWidth: 1.5,
          "&:hover": { borderWidth: 1.5, backgroundColor: "rgba(190,106,52,0.06)" },
        },
        text: {
          "&:hover": { backgroundColor: "rgba(34,30,25,0.05)" },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: `transform 160ms ${tokens.ease}, background-color 160ms ${tokens.ease}`,
          "&:hover": { transform: "translateY(-1px)" },
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
          borderRadius: 4,
          backgroundColor: tokens.surface,
          transition: `box-shadow 160ms ${tokens.ease}, border-color 160ms ${tokens.ease}`,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.mute,
          },
          "&.Mui-focused": {
            boxShadow: `0 0 0 3px ${tokens.copperLight}`,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: tokens.copper,
            borderWidth: 1.5,
          },
        },
        notchedOutline: {
          borderColor: tokens.sand,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": { color: tokens.copperDark },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 999, fontWeight: 600 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 8, boxShadow: tokens.shadowLg },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontFamily: '"Fraunces", Georgia, serif',
          fontWeight: 600,
          fontSize: 14,
          color: tokens.ink,
          backgroundColor: tokens.paper,
          borderBottom: `1.5px solid ${tokens.ink}`,
        },
        root: {
          borderBottom: `1px solid ${tokens.sand}`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: `background-color 120ms ${tokens.ease}`,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": { color: tokens.sage },
          "&.Mui-checked + .MuiSwitch-track": { backgroundColor: tokens.sage, opacity: 1 },
        },
        track: { backgroundColor: tokens.sand, opacity: 1 },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 4 },
      },
    },
  },
})

export default theme
