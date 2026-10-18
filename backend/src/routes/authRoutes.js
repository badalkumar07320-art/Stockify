import express from "express";
import {
  changePassword,
  confirmEmailPasswordReset,
  getProfile,
  loginUser,
  registerUser,
  resetPasswordWithOldPassword,
  requestEmailPasswordReset,
  updateProfile
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset-password", resetPasswordWithOldPassword);
router.post("/reset-password/request", requestEmailPasswordReset);
router.post("/reset-password/confirm", confirmEmailPasswordReset);
router.get("/me", protect, getProfile);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

export default router;
