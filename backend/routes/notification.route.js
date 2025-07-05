import express from "express";
import authAdmin from "../middlewares/authAdmin.middleware.js";
import { deleteNotification, notifications } from "../controllers/notification.controller.js";

const router = express.Router();

// get all notifications
router.get("/notifications", authAdmin(["admin", "viewer"]), notifications);
router.post("/delete-notification", authAdmin(["admin"]), deleteNotification);

export default router;