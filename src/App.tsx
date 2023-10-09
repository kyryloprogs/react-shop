import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import GoodsPage from './pages/GoodsPage';
import { Box } from "@mui/material";

function App() {
  return (

    <div className="App">
      <Header />
      <Box sx={{ marginLeft: "90px" }}>


      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/favorites" element={
          <div>
            test
          </div>
        } />

        <Route path="/category" element={<GoodsPage/>}/>
      </Routes>

    </Box>
    </div >
  );
}

export default App;
