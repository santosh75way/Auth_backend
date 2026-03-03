import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import { useAppSelector } from "../../../hooks/useAppSelector";

export function Navbar() {
    const user = useAppSelector((s) => s.auth.user);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => setAnchorEl(null);

    return (
        <AppBar position="static" elevation={1} color="inherit">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Dashboard</Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        {user?.name ?? "Guest"}
                    </Typography>

                    <IconButton onClick={handleOpenMenu} size="small">
                        <Avatar sx={{ width: 32, height: 32 }}>
                            {user?.name?.charAt(0).toUpperCase() ?? "U"}
                        </Avatar>
                    </IconButton>

                    <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
                        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Settings</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}