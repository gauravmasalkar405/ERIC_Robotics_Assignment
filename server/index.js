import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import userRoutes from "./routes/users.js";
import { authenticateSocket } from "./middleware/auth.js";

dotenv.config();

// app
const app = express();

// parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// access configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// sample route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// routes
app.use("/api/user", userRoutes);

// error middlewares
app.use(notFound);
app.use(errorHandler);

// port
const PORT = process.env.PORT || 5000;

// server
const server = createServer(app);
const io = new Server(server);

// socket.io attachment to server with the authentication middleware
io.use(authenticateSocket);

// socket.io attachment to server
io.on("connection", (socket) => {
  // console.log("A user connected:", socket.id);

  // Handle incoming joystick data
  socket.on("joystickData", (data) => {
    // Broadcast the received data to all connected clients
    io.emit("joystickData", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    // console.log("A user disconnected:", socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT} successfully`);
});
