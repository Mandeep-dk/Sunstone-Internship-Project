import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import SaleProducts from "./components/SaleProducts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductSell from "./pages/ProductSell";
import ProductBrowsing from "./pages/ProductBrowsing";
import ProductDetails from "./pages/ProductDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Carousel />
              <SaleProducts />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sell" element={<ProductSell />} />
        <Route path="/productBrowse" element={<ProductBrowsing />} />
        <Route path="/productDetail/:id" element={<ProductDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;