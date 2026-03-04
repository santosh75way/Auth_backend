import { useNavigate } from "react-router-dom";
import { Box, Divider, List, ListItemButton, ListItemText, Button } from "@mui/material";
import { ROUTES } from "../../../router/paths";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { clearSession } from "../../../store/slices/auth.slice";
import { apiLogout } from "../../../services/auth.service";

export function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleGoHome = () => navigate(ROUTES.HOME);

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (e) {
      console.error("Failed to logout on backend:", e);
    } finally {
      dispatch(clearSession());
      navigate(ROUTES.DEMO, { replace: true });
    }
  };

  return (
    <Box
      component="aside"
      sx={{
        width: 260,
        minHeight: "100vh",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2 }}>
        <ListItemText primary="Auth Frontend" secondary="Navigation" />
      </Box>

      <Divider />

      {/* Top nav items */}
      <Box sx={{ flex: 1 }}>
        <List disablePadding>
          <ListItemButton onClick={handleGoHome}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </List>
      </Box>

      <Divider />

      {/* Bottom-left logout */}
      <Box sx={{ p: 2 }}>
        <Button fullWidth variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}