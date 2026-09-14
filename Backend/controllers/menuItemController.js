const MenuItem = require("../models/Menu")

exports.getItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find().populate("category")
        res.status(200).json({ menuitems: menuItems })
    } catch (error) {
        res.status(500).json({
            message: "Serverda muammo bor", error: error.message
        })
    }
}

exports.getItemsById = async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id).populate("category")
        if (!menuItem) {
            return res.status(404).json({
                message: "Mahsulot topilmadi!!1"
            })
        }
        res.status(200).json({
            message: menuItem
        })
    } catch (error) {
        res.status(500).json({
            message: "Serverda muammo bor", error: error.message
        })
    }
}


exports.createItem = async (req, res) => {
    try {
        const { name, price, category, image, description, available } = req.body
        if (!name || !price || !category) {
            return res.status(400).json({
                message: "Nom, narx va kategoriya majburiy kiritish"
            })
        }
        const menuItem = new MenuItem({ name, price, category, image, description, available })
        const savedItem = await menuItem.save()
        res.status(201).json({
            message: "Mahsulot muvaffaqiyatli yaratildi"
        })
    } catch (error) {
        res.status(500).json({
            message: "Xatolik yuz berdi", error: error.message
        })
    }
}

exports.updateItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!menuItem) {
            return res.status(404).json({
                message: "Mahsulot topilmadi"
            })
        }
        res.status(200).json({ menuItem })
    } catch (error) {
        res.status(500).json({
            message: "Xatolik yuz berdi", error: error.message
        })
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.findByIdAndDelete(req.params.id)
        if (!menuItem) {
            return res.status(404).json({
                message: "Mahsulot topilmadi"
            })
        }
        res.status(200).json({
            message: "Mahsulot o'chirildi"
        })
    } catch (error) {
        res.status(500).json({
            message: "Xatolik yuz berdi", error: error.message
        })
    }
}