import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav className="flex gap-5 p-4 bg-gray-800">
            <Link to="/" className="text-white">Dashboard</Link>
            <Link to="/menu" className="text-white">Menu</Link>
            <Link to="/add-menu-item" className="text-white">Add Item</Link>
            <Link to="/categories" className="text-white">Categories</Link>
            <Link to="/about" className="text-white">About</Link>
        </nav>
    )
}

export default Navbar