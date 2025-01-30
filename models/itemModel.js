import mongoose from "mongoose";
import User from "../models/userModel.js";

export const itemSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    quantity: {
      type: Number,
      required: false,
    },
    unitPrice: {
      type: Number,
      required: false,
    },
    SKU: {
      type: String,
      unique: true,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
