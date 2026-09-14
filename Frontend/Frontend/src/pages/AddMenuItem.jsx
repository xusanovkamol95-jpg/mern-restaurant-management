import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

function AddMenuItem() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [error, setError] = useState("")

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories")
        setCategories(res.data.data || [])
      } catch (err) {
        console.log(err)
      }
    }
    fetchCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!name.trim() || !price || !category) {
      setError("Nom, narx va kategoriya majburiy")
      return
    }

    try {
      await api.post("/menu-items", { name, price: Number(price), category, image, description, available })
      navigate("/menu")
    } catch (err) {
      setError(err.response?.data?.message || "Xatolik yuz berdi")
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Yangi mahsulot qo'shish</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input type="text" placeholder="Mahsulot nomi" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" />

        <input type="number" placeholder="Narxi" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 rounded" />

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
          <option value="">Kategoriyani tanlang</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <input type="text" placeholder="Rasm manzili (ixtiyoriy)" value={image} onChange={(e) => setImage(e.target.value)} className="border p-2 rounded" />

        <textarea placeholder="Tavsif (ixtiyoriy)" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded" />

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
          Mavjud
        </label>

        {error && <p className="text-red-600">{error}</p>}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Qo'shish
        </button>
      </form>
    </div>
  )



}

export default AddMenuItem