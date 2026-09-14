const dns = require("dns")
dns.setServers(["8.8.8.8", "8.8.4.4"])
const mongoose = require("mongoose")
require("dotenv").config()

async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Server ishlayapti")
    } catch (error) {
        console.log("Serverda muammo bor!!!", error.message)
        process.exit(1)
    }
}

module.exports = connectDB
