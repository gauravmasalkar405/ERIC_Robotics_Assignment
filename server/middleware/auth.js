import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import { users } from "../data/users.js";

// protect route
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // get token from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log(decoded);

      // get users details excluding password
      req.user = users.find((user) => user.id === decoded.id);
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorised, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorised, no token");
  }
});

// Middleware to check if the user is authenticated and attach user to the request
export const authenticateSocket = asyncHandler(async (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Not authorized, no token provided."));
  }

  try {
    // decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get users details excluding password
    const user = users.find((user) => user.id === decoded.userId);

    if (!user) {
      return next(new Error("Not authorized, invalid token."));
    }

    socket.user = user; // Attach the authenticated user object to the socket
    next();
  } catch (error) {
    return next(new Error("Not authorized, token verification failed."));
  }
});
