import { Notification } from "../models/Notification.model.js";

// api to get all notifications
const notifications = async (req, res) => {
    try {
        const notifications = await Notification.find({}).sort({ createdAt: -1 });

        if (!notifications) {
            return res
                .status(400)
                .json({ success: false, message: "No notifications found" });
        }

        return res
            .status(200)
            .json({ success: true, message: "Notifications fetched successfully", notifications });

    } catch (error) {
        console.log("error in fetching all notifications: ", error.message);
        return res
            .status(500)
            .json({ message: "Internal server error", success: false });
    }
}

// api to delete notifications 
const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.body;

        if (!notificationId) {
            return res
                .status(400)
                .json({ success: false, message: "Notification not found" });
        }
        await Notification.findByIdAndDelete(notificationId);

        return res
            .status(200)
            .json({ success: true, message: "Notification deleted successfully" });
    } catch (error) {
        console.log("error in deleting the notifications: ", error.message);
        return res
            .status(500)
            .json({ message: "Internal server error", success: false });
    }
}


export { notifications, deleteNotification };