import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import About from "./pages/About"
import Home from "./pages/Home"
import PageNotFound from "./pages/PageNotFound"
import { Product } from "./types/Product.types"

async function fetchProducts(setProducts: (products: Product[]) => void) {
    const response = await fetch("https://dummyjson.com/products")
    const data = await response.json()
    // dispatch(setProducts(data.products))
    console.log(data.products)
    setProducts(data.products)
}

function App() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetchProducts(setProducts)
  }, []) 

  return <Router>
    <Routes>
      <Route path="/" element={<Home products={products} />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Router>

}

export default App
