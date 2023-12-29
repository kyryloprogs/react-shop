import { Route, Routes } from "react-router-dom";
import Header from "./components/HeaderComponents/Header";
import MainPage from "./pages/MainPage";
import GoodsPage from './pages/GoodsPage';
import { Box, createTheme, ThemeProvider } from "@mui/material";
import ProductPage from "./pages/ProductPage";
import theme from './components/UtilsComponents/Fonts';
import LoginPage from "./pages/LoginPage";
import ProductList from './pages/ProductList';
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage"

import AdminPageUsers from "./pages/AdminPageUsers";
import AdminProductListPage from "./pages/AdminProductListPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App bg-supergray min-h-screen">
        <Header />
        <Box sx={{ marginLeft: "90px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search" element={<ProductList fav={false}/>} />
            <Route path="/favorites" element={<ProductList fav={true}/>} />

            <Route path="/category/:name/:id?" element={<ProductList fav={false}/>} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/adminusers" element={<AdminPageUsers/>} />
            <Route path="/adminproducts" element={<AdminProductListPage/>} />
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </Box>
      </div >
    </ThemeProvider>
  );
}

export default App;
