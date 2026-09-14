const Category = require("../models/Category")

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.find(req.params.id)
        if (!category) {
            return res.status(404).json({ message: "Kategoriya topilmadi" })
        }
        res.status(200).json({
            message: "Kategoriya muvaffaqiyatli olingan",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.getByIdCategories = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).json({ message: "Kategoriya topilmadi" })
        }
        res.status(200).json({
            message: "Kategoriya muvaffaqiyatli olingan",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body
        if (!name) {
            return res.status(400).json({ message: "Kategoriya nomi majburiy" })
        }
        const category = new Category({
            name,
            description
        })
        await category.save()
        res.status(201).json({
            message: "Kategoriya muvaffaqiyatli yaratildi",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!category) {
            return res.status(404).json({
                message: "Kategoriya topilmadi"
            })
        }

        res.status(200).json({
            message: "Kategoriya muvaffaqiyatli yangilandi",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) {
            return res.status(404).json({
                message: "Kategoriya topilmadi"
            })
        } else {
            res.status(200).json({
                message: "Kategoriya muvaffaqiyatli o'chirildi"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

