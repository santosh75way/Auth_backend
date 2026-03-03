import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Box, Container, Typography, Chip, Stack } from "@mui/material";
import { ROUTES } from "../../router/paths";
import { useAppSelector } from "../../hooks/useAppSelector";

export function PublicLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useAppSelector((s) => s.auth.status === "authenticated");

    const handleNav = (path: string) => {
        // If user clicks "home" while not authenticated, let the router guard handle the redirect beautifully
        navigate(path);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "stretch",
                bgcolor: "background.default",
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    py: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        pb: 2,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            background: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
                            backgroundClip: "text",
                            textFillColor: "transparent",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: 800,
                        }}
                    >
                        Auth Frontend
                    </Typography>

                    <Stack direction="row" spacing={1}>
                        <Chip
                            label="Demo"
                            onClick={() => handleNav(ROUTES.DEMO)}
                            color={location.pathname === ROUTES.DEMO ? "primary" : "default"}
                            variant={location.pathname === ROUTES.DEMO ? "filled" : "outlined"}
                            clickable
                        />
                        <Chip
                            label="Login"
                            onClick={() => handleNav(ROUTES.LOGIN)}
                            color={location.pathname === ROUTES.LOGIN ? "secondary" : "default"}
                            variant={location.pathname === ROUTES.LOGIN ? "filled" : "outlined"}
                            clickable
                            disabled={isAuthenticated} // Disable login link if already logged in natively
                        />
                    </Stack>
                </Box>

                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Outlet />
                </Box>

                <Box sx={{ textAlign: "center", pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
                    <Typography variant="caption" color="text.secondary">
                        © {new Date().getFullYear()} Auth Frontend
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}