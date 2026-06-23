const express = require("express");
const router = express.Router();
const Notification = require("../models/notification"); // Required the Notification schema from models 
const { Log } = require("../../logging-middleware/logger"); // Required the logger for logging events

// get for fetching all the notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find();
    Log("backend", "info", "handler", "Fetched all notifications");
    res.json({ notifications });
  } catch (err) {
    Log("backend", "error", "handler", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// post for creating a new notification
router.post("/", async (req, res) => {
  try {
    const { title, message } = req.body;
    const notification = await Notification.create({ title, message });
    Log("backend", "info", "handler", "Notification created");

    // emitting a notification now
    req.app.get("io").emit("notification", notification);

    res.status(201).json({ id: notification._id, message: "Notification created successfully" });
  } catch (err) {
    Log("backend", "error", "handler", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// put method for modifying the notification status to seen/read..
router.put("/:id/read", async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    Log("backend", "info", "handler", "Notification marked as read");
    res.json({ message: "Notification marked as read" });
  } catch (err) {
    Log("backend", "error", "handler", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;