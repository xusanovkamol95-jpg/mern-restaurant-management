const mongoose = require("mongoose")

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    image: { type: String },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("Menu", menuSchema)