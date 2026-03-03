import { Paper, Stack, Typography, Box, Card, CardActionArea, CardContent, Avatar } from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/paths";

export function HomePage() {
    const user = useAppSelector((s) => s.auth.user);
    const navigate = useNavigate();

    return (
        <Box sx={{ width: "100%", maxWidth: 1000, mx: "auto", mt: 4 }}>
            <Stack spacing={4}>
                {/* Welcome Section */}
                <Box>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)",
                            border: "1px solid rgba(99, 102, 241, 0.2)",
                        }}
                    >
                        <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" spacing={3}>
                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    bgcolor: "primary.main",
                                    fontSize: "2rem",
                                    boxShadow: "0 8px 16px rgba(99, 102, 241, 0.25)",
                                }}
                            >
                                {user?.name?.charAt(0).toUpperCase() || "U"}
                            </Avatar>
                            <Box>
                                <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>
                                    Welcome back, {user?.name}!
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    You are successfully authenticated and viewing your private dashboard. Your email is {user?.email}.
                                </Typography>
                            </Box>
                        </Stack>
                    </Paper>
                </Box>

                {/* Quick Links Section */}
                <Box>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                        Quick Navigation Links
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                            gap: 3,
                        }}
                    >
                        {/* Demo Link */}
                        <Box>
                            <Card elevation={0} sx={{ height: "100%", bgcolor: "background.paper" }}>
                                <CardActionArea onClick={() => navigate(ROUTES.DEMO)} sx={{ height: "100%", p: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6" color="primary.light" gutterBottom>
                                            Demo Page
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Navigate to the public landing page. Accessible by anyone.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Box>

                        {/* Home Link */}
                        <Box>
                            <Card elevation={0} sx={{ height: "100%", bgcolor: "background.paper", border: "1px solid", borderColor: "primary.main" }}>
                                <CardActionArea onClick={() => navigate(ROUTES.HOME)} sx={{ height: "100%", p: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6" color="text.primary" gutterBottom>
                                            Home Dashboard
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Refresh this secure routing area.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Box>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
}