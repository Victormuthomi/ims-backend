import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";
import User from "../models/userModel.js";

//@desc GET items
//@route Get /api/items
//@acess public
export const getItems = asyncHandler(async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error getting Items", error);
    res.status(500).json({ message: "Server error getting items" });
  }
});

//@desc POST item
//@route Post /api/items
//@acess private
export const createItem = asyncHandler(async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400);
      throw new Error("Please add a name");
    }

    const item = await Item.create({
      name: req.body.name,
      quantity: req.body.quantity,
      unitPrice: req.body.unitPrice,
      SKU: req.body.SKU,
      description: req.body.description,
      user: req.user.id,
    });
    res.status(200).json(item);
  } catch (error) {
    console.error("Error creating item", error);
    res.status(500).json({ message: "Server error creating item" });
  }
});

//@desc Update item
//@route PUT /api/items/:id
//@access Private
export const updateItem = asyncHandler(async (req, res) => {
  try {
    // Find the item by ID
    const item = await Item.findById(req.params.id);

    // Check if item exists
    if (!item) {
      res.status(404);
      throw new Error("Item not found");
    }

    // Ensure the logged-in user owns the item
    if (item.user.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User not authorized to update this item");
    }

    // Update the item
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation is run
    });

    res.status(200).json(updatedItem); // 200 for successful update
  } catch (error) {
    console.error("Error updating item:", error.message);
    res.status(500).json({ message: "Server error updating item" });
  }
});

//@desc Delete item
//@route Delete /api/items/:id
//@acess private
export const deleteItem = asyncHandler(async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      res.status(400);
      throw new Error("Item not found");
    }

    if (!req.user) {
      res.status(401);
      throw new Error("Not Authorized");
    }

    if (item.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    res.status(200).json({ message: `Item deleted ${req.params.id}` });
  } catch (error) {
    console.error("Error deleting item", error);
    res.status(500).json({ message: "Server error deleting item" });
  }
});
