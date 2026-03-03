import { Paper, Stack, Typography } from "@mui/material";
import { SignupForm } from "../../components/auth/SignupForm/SignupForm";

export function SignupPage() {
    return (
        <Paper elevation={0} sx={{ p: 4, border: "1px solid", borderColor: "divider" }}>
            <Stack spacing={2}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Sign Up
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Create a new account to get started.
                </Typography>

                <SignupForm />
            </Stack>
        </Paper>
    );
}
