import { Link } from "react-router-dom"
import api from "../api/axios"
import { useEffect, useState } from "react"




function Menu() {
  const [menuItems, setMenuItems] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOption, setSortOption] = useState("name-asc")


  const fetchMenuItems = async () => {
    try {
      const res = await api.get("/menu-items")
      setMenuItems(res.data.menuitems || [])
    } catch (error) {
      console.log(error.message)
    }
  }


  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories")
      setCategories(res.data.data || [])
    } catch (error) {
      console.log(error.message)
    }
  }


  useEffect(() => {
    fetchMenuItems()
    fetchCategories()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Rostdan ham o'chirmoqchimisiz?")) return
    try {
      await api.delete(`/menu-items/${id}`)
      fetchMenuItems()
    } catch (error) {
      console.log(error.message)
    }
  }

  let filtered = menuItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  filtered = [...filtered].sort((a, b) => {
    if (sortOption === "name-asc") return a.name.localeCompare(b.name)
    if (sortOption === "name-desc") return b.name.localeCompare(a.name)
    if (sortOption === "price-asc") return a.price - b.price
    if (sortOption === "price-desc") return b.price - a.price
    return 0
  })


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Menyu</h1>

      <div>
        <input type="text" placeholder="Nomi boyicha qidirish..." value={search} onChange={(e) => setSearch(e.target.value)} className="border p-2 rounded" />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border p-2 rounded">
          <option value="All">Barcha kategoriyalar</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border p-2 rounded">
          <option value="name-asc">Nomi (A-Z)</option>
          <option value="name-desc">Nomi (Z-A)</option>
          <option value="price-asc">Narxi (arzon → qimmat)</option>
          <option value="price-desc">Narxi (qimmat → arzon)</option>
        </select>

        <Link to="/add-menu-item" className="bg-green-600 text-white px-4 py-2 rounded">
          +Yangi mahsulot
        </Link>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">Hech narsa topilmadi</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div key={item._id} className="border rounded p-4 shadow">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-gray-600">{item.category?.name}</p>
              <p className="font-semibold">{item.price} so'm</p>
              <p className={item.available ? "text-green-600" : "text-red-600"}>
                {item.available ? "Mavjud" : "Mavjud emas"}
              </p>
              <div className="flex gap-2 mt-3">
                <Link to={`/edit-menu-item/${item._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded">
                  Tahrirlash
                </Link>
                <button onClick={() => handleDelete(item._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                  O'chirish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Menu