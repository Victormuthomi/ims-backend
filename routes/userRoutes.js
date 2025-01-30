import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

//import the controllers
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController.js";

router.route("/").post(registerUser);

router.route("/login").post(loginUser);

router.route("/me").get(protect, getUser);

export default router;
