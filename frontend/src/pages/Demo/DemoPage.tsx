import { Box, Button, Paper, Stack, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/paths";
import { useAppSelector } from "../../hooks/useAppSelector";

export function DemoPage() {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector((s) => s.auth.status === "authenticated");

    const handleLogin = () => navigate(ROUTES.LOGIN);
    const handleSignup = () => navigate(ROUTES.SIGNUP);
    const handleEnterApp = () => navigate(ROUTES.HOME);

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 4, md: 6 },
                    textAlign: "center",
                    background: "linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
                    backdropFilter: "blur(10px)",
                }}
            >
                <Stack spacing={4} alignItems="center">
                    <Box>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                                background: "linear-gradient(135deg, #818cf8 0%, #f472b6 100%)",
                                backgroundClip: "text",
                                textFillColor: "transparent",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Auth Experience
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem", maxWidth: "80%", mx: "auto" }}>
                            A premium, secure, and blazing fast authentication flow built with React, Redux, and MUI.
                        </Typography>
                    </Box>

                    <Box sx={{ width: "100%", height: "1px", bgcolor: "divider", my: 2 }} />

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: "100%", justifyContent: "center" }}>
                        {!isAuthenticated ? (
                            <>
                                <Button variant="contained" size="large" onClick={handleSignup} sx={{ minWidth: 160 }}>
                                    Sign Up
                                </Button>
                                <Button variant="outlined" size="large" onClick={handleLogin} sx={{ minWidth: 160 }}>
                                    Sign In
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="contained" size="large" onClick={handleEnterApp} sx={{ minWidth: 160 }}>
                                    Enter Dashboard
                                </Button>
                                <Button variant="outlined" size="large" onClick={() => alert("Explore more features!")} sx={{ minWidth: 160 }}>
                                    Learn More
                                </Button>
                            </>
                        )}
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    );
}