import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { markSignedUp } from "../../store/slices/auth.slice";

import { resetPasswordSchema, type ResetPasswordValues } from "../../features/auth/schemas";
import { ROUTES } from "../../router/paths";
import { apiResetPassword } from "../../services/auth.service";

export function ResetPasswordPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { password: "", confirmPassword: "" },
        mode: "onTouched",
    });

    const onSubmit = async (values: ResetPasswordValues) => {
        if (!token) {
            setErrorMsg("Invalid or missing reset token.");
            return;
        }

        setSuccessMsg(null);
        setErrorMsg(null);
        setIsSubmitting(true);

        try {
            await apiResetPassword(token, values.password);
            dispatch(markSignedUp());
            setSuccessMsg("Password reset successfully. You can now login with your new password.");
            setTimeout(() => {
                navigate(ROUTES.LOGIN, { replace: true });
            }, 3000);
        } catch (e) {
            setErrorMsg(e instanceof Error ? e.message : "Failed to reset password");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
            <Paper elevation={0} sx={{ p: 4, border: "1px solid", borderColor: "divider" }}>
                <Stack spacing={2}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Reset Password
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Enter your new password below.
                    </Typography>

                    {!token && (
                        <Alert severity="error">
                            Reset token is missing from the URL. Please use the link provided in your email.
                        </Alert>
                    )}

                    {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                    {successMsg && <Alert severity="success">{successMsg}</Alert>}

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <TextField
                                label="New Password"
                                type="password"
                                error={Boolean(errors.password?.message)}
                                helperText={errors.password?.message}
                                {...register("password")}
                                disabled={isSubmitting || !token || Boolean(successMsg)}
                            />

                            <TextField
                                label="Confirm New Password"
                                type="password"
                                error={Boolean(errors.confirmPassword?.message)}
                                helperText={errors.confirmPassword?.message}
                                {...register("confirmPassword")}
                                disabled={isSubmitting || !token || Boolean(successMsg)}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting || !token || Boolean(successMsg)}
                            >
                                {isSubmitting ? "Resetting..." : "Reset Password"}
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
}
