import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Box, CircularProgress } from "@mui/material";
import { useAuthInitializer } from "./hooks/useAuthInitializer";

function App() {
  const { isLoading } = useAuthInitializer();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;