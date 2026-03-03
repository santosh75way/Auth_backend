import { Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/paths";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Paper elevation={0} sx={{ p: 4, border: "1px solid", borderColor: "divider" }}>
      <Stack spacing={2}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Page not found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The page you are looking for doesn’t exist.
        </Typography>

        <Button variant="contained" onClick={() => navigate(ROUTES.DEMO)}>
          Go to Demo
        </Button>
      </Stack>
    </Paper>
  );
}