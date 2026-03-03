import { useState } from "react";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordValues } from "../../../features/auth/schemas";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { apiForgotPassword } from "../../../services/auth.service";

type Props = {
    open: boolean;
    onClose: () => void;
};

export function ForgotPasswordDialog({ open, onClose }: Props) {
    const hasSignedUp = useAppSelector((s) => s.auth.hasSignedUp);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const handleClose = () => {
        reset();
        setSuccessMsg(null);
        setErrorMsg(null);
        onClose();
    };

    const onSubmit = async (values: ForgotPasswordValues) => {
        setSuccessMsg(null);
        setErrorMsg(null);

        if (!hasSignedUp) {
            setErrorMsg("Please signup first. No account found for this email.");
            return;
        }

        setIsSubmitting(true);
        try {
            await apiForgotPassword(values.email);
            setSuccessMsg("Email sent to your registered mail.");
        } catch (e) {
            setErrorMsg("Failed to send email");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>Forgot Password?</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <DialogContent sx={{ pt: 2 }}>
                    <DialogContentText sx={{ mb: 2 }}>
                        Enter your email address and we'll send you a link to reset your password.
                    </DialogContentText>

                    {errorMsg && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {errorMsg}
                        </Alert>
                    )}

                    {successMsg && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {successMsg}
                        </Alert>
                    )}

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                        {...register("email")}
                        disabled={isSubmitting || Boolean(successMsg)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={isSubmitting}>
                        {successMsg ? "Close" : "Cancel"}
                    </Button>
                    {!successMsg && (
                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Send Email"}
                        </Button>
                    )}
                </DialogActions>
            </form>
        </Dialog>
    );
}
