import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import GoodsPage from './pages/GoodsPage';
import { Box, createTheme, ThemeProvider } from "@mui/material";
import ProductPage from "./pages/ProductPage";
import theme from './components/Fonts';
import LoginPage from "./pages/LoginPage";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App bg-supergray min-h-screen">
        <Header />
        <Box sx={{ marginLeft: "90px" }}>


          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/favorites" element={
              <div>
                test
              </div>
            } />

            <Route path="/category" element={<GoodsPage />} />
            <Route path="/products/:id" element={<ProductPage/>} />
          </Routes>

        </Box>
      </div >
    </ThemeProvider>
  );
}

export default App;
