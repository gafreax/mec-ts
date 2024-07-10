import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import About from "./pages/About"
import Home from "./pages/Home"
import PageNotFound from "./pages/PageNotFound"
import Login from "./pages/Login"
import BaseContext from "./context/BaseContext"

function App() {

  return <Router>
    <Routes>
      <Route path="/" element={<BaseContext><Home /></BaseContext>} />
      <Route path="/home" element={<BaseContext><Home /></BaseContext>} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<BaseContext><Login /></BaseContext>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </Router>

}

export default App
