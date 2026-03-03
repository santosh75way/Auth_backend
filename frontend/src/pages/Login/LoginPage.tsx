import { useState } from "react";
import { Button, Paper, Stack, Typography, Box } from "@mui/material";
import { LoginForm } from "../../components/auth/LoginForm/LoginForm";
import { ForgotPasswordDialog } from "../../components/auth/ForgotPasswordDialog/ForgotPasswordDialog";

export function LoginPage() {
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

    return (
        <Paper elevation={0} sx={{ p: 4, border: "1px solid", borderColor: "divider" }}>
            <Stack spacing={2}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Login
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Enter your credentials to access the dashboard.
                </Typography>

                <LoginForm />

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Button
                        variant="text"
                        color="primary"
                        size="small"
                        onClick={() => setForgotPasswordOpen(true)}
                    >
                        Forgot password?
                    </Button>
                </Box>
            </Stack>

            <ForgotPasswordDialog
                open={forgotPasswordOpen}
                onClose={() => setForgotPasswordOpen(false)}
            />
        </Paper>
    );
}