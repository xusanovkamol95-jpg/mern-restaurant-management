const express = require("express")
const { getItems, getItemsById, createItem, updateItem, deleteItem } = require("../controllers/menuItemController")
const router = express.Router()

router.get("/", getItems)
router.get("/:id", getItemsById)
router.post("/", createItem)
router.put("/:id", updateItem)
router.delete("/:id", deleteItem)

module.exports = router