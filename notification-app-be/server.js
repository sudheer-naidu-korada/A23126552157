require("dotenv").config(); // For accessing the variables in .env file
const express = require("express"); 
const cors = require("cors"); // For connecting backend and frontend on different ports
const http = require("http");
const { Server } = require("socket.io"); // For sending notifications
const connectDB = require("./db"); // Connected Database
const notificationRoutes = require("./routes/routes"); // Routes for Notification Fetch, Update and more

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/notifications", notificationRoutes);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

app.set("io", io);

server.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});