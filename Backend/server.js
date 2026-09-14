const express = require("express")
const cors = require("cors")
const DBconnect = require("./config/db")
const categoryRoutes = require("./routes/categoryRoutes")
const menuRoutes = require("./routes/menuRoutes")
require("dotenv").config()

const app = express()
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json())
DBconnect()
app.use("/api/categories", categoryRoutes)
app.use("/api/menu-items", menuRoutes)

app.listen(process.env.DATABASE_PORT, () => { console.log(`Server ${process.env.DATABASE_PORT} PORT da ishladi`) })