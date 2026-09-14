import { useEffect, useState } from "react"
import api from "../api/axios"

function Categories() {

    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [editId, setEditId] = useState(null)
    const [error, setError] = useState("")

   const fetchCategories = async () => {
        try {
            const res = await api.get("/categories")
            setCategories(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!name.trim()) {
            setError("Nom kiritilmagn")
            return
        }

        try {
            if (editId) {
                await api.put(`/categories/${editId}`, { name, description })
            } else {
                await api.post("/categories", { name, description })
            }
            setName("")
            setDescription("")
            setEditId(null)
            fetchCategories()

        } catch (error) {
            setError(error.response?.data?.message || "xatolik yuz berdi")
        }
    }

    const handleEdit = (cat) => {
        setEditId(cat._id)
        setName(cat.name)
        setDescription(cat.description || "")
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Rostdan ham o'chirmoqchimisiz?")) return
        try {
            await api.delete(`/categories/${id}`)
            fetchCategories()
        } catch (error) {
            console.log(error)
        }
    }





    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Kategoriyalar</h1>

            <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
                <input type="text" placeholder="Kategoriya nomi" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" />
                <input type="text" placeholder="Tavsif" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded" />

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    {editId ? "Yangilash" : "Qo'shish"}
                </button>
            </form>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Nomi</th>
                        <th className="border p-2">Tavsifi</th>
                        <th className="border p-2">Amallar</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat._id}>
                            <td className="border p-2">{cat.name}</td>
                            <td className="border p-2">{cat.description}</td>
                            <td className="border p-2 flex gap-2">
                                <button
                                onClick={() => handleEdit(cat)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                            >
                                Tahrirlash
                            </button>
                            <button
                                onClick={() => handleDelete(cat._id)}
                                className="bg-red-600 text-white px-3 py-1 rounded"
                            >
                                O'chirish
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )


}

export default Categories