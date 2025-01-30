import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

//import the controllers
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

//Route to get the items
router.route("/").get(getItems).post(protect, createItem);

//routes to update an Item
router.route("/:id").put(protect, updateItem).delete(protect, deleteItem);

export default router;
