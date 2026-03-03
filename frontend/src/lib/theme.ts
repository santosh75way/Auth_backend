import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#6366f1", // Indigo
            light: "#818cf8",
            dark: "#4f46e5",
        },
        secondary: {
            main: "#ec4899", // Pink
            light: "#f472b6",
            dark: "#db2777",
        },
        background: {
            default: "#0f172a", // Slate 900
            paper: "#1e293b", // Slate 800
        },
        text: {
            primary: "#f8fafc", // Slate 50
            secondary: "#94a3b8", // Slate 400
        },
        divider: "#334155", // Slate 700
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: ["'Inter'", "system-ui", "sans-serif"].join(","),
        h4: {
            fontWeight: 800,
            letterSpacing: "-0.02em",
        },
        h5: {
            fontWeight: 700,
            letterSpacing: "-0.01em",
        },
        h6: {
            fontWeight: 600,
        },
        button: {
            textTransform: "none",
            fontWeight: 600,
            letterSpacing: "0.01em",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: "10px 24px",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(99, 102, 241, 0.25)",
                    },
                },
                contained: {
                    backgroundImage: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                    color: "#ffffff",
                    "&:hover": {
                        backgroundImage: "linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)",
                    },
                },
                outlined: {
                    borderWidth: "2px",
                    "&:hover": {
                        borderWidth: "2px",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none", // Remove default elevation overlay
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                    border: "1px solid #334155",
                },
            },
        },
    },
});