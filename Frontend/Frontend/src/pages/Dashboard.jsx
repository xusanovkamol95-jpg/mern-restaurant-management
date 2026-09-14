import { useState, useEffect } from "react"
import api from "../api/axios"

function Dashboard() {
  const [totalItems, setTotalItems] = useState(0)
  const [totalCategories, setTotalCategories] = useState(0)
  const [availableCount, setAvailableCount] = useState(0)
  const [unavailableCount, setUnavailableCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsRes = await api.get("/menu-items")
        const items = itemsRes.data.menuitems || []

        const catRes = await api.get("/categories")
        const cats = catRes.data.data || []

        setTotalItems(items.length)
        setTotalCategories(cats.length)
        setAvailableCount(items.filter((i) => i.available).length)
        setUnavailableCount(items.filter((i) => !i.available).length)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const cards = [
    { label: "Jami mahsulotlar", value: totalItems, color: "bg-blue-600" },
    { label: "Jami kategoriyalar", value: totalCategories, color: "bg-purple-600" },
    { label: "Mavjud mahsulotlar", value: availableCount, color: "bg-green-600" },
    { label: "Mavjud emas", value: unavailableCount, color: "bg-red-600" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className={`${card.color} text-white rounded p-6 shadow`}>
            <p className="text-3xl font-bold">{card.value}</p>
            <p className="mt-1">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard