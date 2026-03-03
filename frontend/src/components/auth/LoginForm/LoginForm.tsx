import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginSchema, type LoginValues } from "../../../features/auth/schemas";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { ROUTES } from "../../../router/paths";
import { setAuthError, setSession, startAuth } from "../../../store/slices/auth.slice";
import { apiLogin } from "../../../services/auth.service";

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const status = useAppSelector((s) => s.auth.status);
  const error = useAppSelector((s) => s.auth.error);

  const isSubmitting = status === "authenticating";

  const defaultValues = useMemo<LoginValues>(
    () => ({ email: "", password: "" }),
    [],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: "onTouched",
  });

  const onSubmit = async (values: LoginValues) => {
    dispatch(startAuth());

    try {
      const result = await apiLogin(values);

      dispatch(
        setSession({
          user: result.user,
          accessToken: result.accessToken,
        }),
      );

      navigate(ROUTES.HOME, { replace: true });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Login failed";
      dispatch(setAuthError(message));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        {error ? <Alert severity="error">{error}</Alert> : null}

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
          autoComplete="current-password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </Stack>
    </Box>
  );
}
