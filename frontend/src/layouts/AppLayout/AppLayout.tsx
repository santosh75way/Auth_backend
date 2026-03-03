import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Navbar } from "../../components/navigation/Navbar/Navbar.tsx";
import { Sidebar } from "../../components/navigation/Sidebar/Sidebar.tsx";

export function AppLayout() {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main area */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* Top navigation */}
                <Navbar />

                {/* Page content */}
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}