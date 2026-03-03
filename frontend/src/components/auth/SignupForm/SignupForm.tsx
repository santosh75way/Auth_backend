import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { signupSchema, type SignupValues } from "../../../features/auth/schemas";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { ROUTES } from "../../../router/paths";
import { markSignedUp } from "../../../store/slices/auth.slice";
import { apiSignup } from "../../../services/auth.service";

export function SignupForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const defaultValues = useMemo<SignupValues>(
        () => ({ name: "", email: "", password: "" }),
        [],
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupValues>({
        resolver: zodResolver(signupSchema),
        defaultValues,
        mode: "onTouched",
    });

    const onSubmit = async (values: SignupValues) => {
        setIsSubmitting(true);
        setError(null);

        try {
            await apiSignup(values);
            dispatch(markSignedUp());
            navigate(ROUTES.LOGIN, { replace: true });
        } catch (e) {
            setError(e instanceof Error ? e.message : "Signup failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
                {error ? <Alert severity="error">{error}</Alert> : null}

                <TextField
                    label="Name"
                    type="text"
                    autoComplete="name"
                    error={Boolean(errors.name?.message)}
                    helperText={errors.name?.message}
                    {...register("name")}
                />

                <TextField
                    label="Email"
                    type="email"
                    autoComplete="email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register("email")}
                />

                <TextField
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register("password")}
                />

                <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                </Button>
            </Stack>
        </Box>
    );
}
