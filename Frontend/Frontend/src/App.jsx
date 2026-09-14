import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import Menu from "./pages/Menu"
import AddMenuItem from "./pages/AddMenuItem"
import EditMenuItem from "./pages/EditMenuItem"
import Categories from "./pages/Categories"
import About from "./pages/About"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/add-menu-item" element={<AddMenuItem />} />
          <Route path="/edit-menu-item/:id" element={<EditMenuItem />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App