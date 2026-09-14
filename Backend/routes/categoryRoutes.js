const express = require("express")
const { getCategory, createCategory, updateCategory, deleteCategory, getByIdCategories } = require("../controllers/categoryController")
const router = express.Router()

router.get("/", getCategory)
router.get("/:id", getByIdCategories)
router.post("/", createCategory)
router.put("/:id", updateCategory)
router.delete("/:id", deleteCategory)

module.exports = router