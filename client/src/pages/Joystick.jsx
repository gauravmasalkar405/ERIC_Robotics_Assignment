import React, { useState, useEffect } from "react";
import { host, logoutRoute } from "../api";
import socketIOClient from "socket.io-client";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const socket = socketIOClient(host, {
  transports: ["websocket"], // To avoid cors error
  auth: {
    token: Cookies.get("jwt"), // Use js-cookie to get the JWT token from the cookie
  },
  withCredentials: true, // Enable sending cookies in cross-origin requests
});

const Joystick = () => {
  const [joystickData, setJoystickData] = useState({ x: 0, y: 0 });
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleJoystickMove = (x, y) => {
    socket.emit("joystickData", { x, y });
  };

  useEffect(() => {
    // Listen for incoming data from the server
    socket.on("joystickData", (data) => {
      // Update the state with the received data
      setJoystickData(data);
    });

    // Listen for connection event
    socket.on("connect", () => {
      setIsConnected(true);
    });

    // Listen for disconnection event
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      socket.off("joystickData");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    // After the initial render, check if the WebSocket is connected
    if (socket.connected) {
      setIsLoading(false);
      setIsConnected(true);
    }
  }, [socket.connected]);

  // logout handler
  const logoutHandler = async () => {
    const logoutResponse = await axios.post(
      logoutRoute,
      {},
      {
        withCredentials: true,
      }
    );

    // after logut navigate to login page
    if (logoutResponse.data.status) {
      navigate("/");
    }
  };

  return isLoading ? (
    <>Loading...</>
  ) : (
    <>
      <div className="joy_logout_btn">
        <button onClick={logoutHandler}>Logout</button>
      </div>
      <h1>WebSocket Joystick App</h1>
      <div>
        <h2>Joystick Component</h2>
        <button
          onMouseMove={(e) =>
            handleJoystickMove(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
          }
        >
          Joystick
        </button>
        <div className="joy_data_heading">
          <h2>Live data from server {"-->"}</h2>
        </div>
        <div className="joy_data">
          <strong>X:</strong> {joystickData.x}
          <strong>Y:</strong> {joystickData.y}
        </div>
        <div className="connection_status">
          <strong>Connection Status:</strong>{" "}
          {isConnected ? (
            <span style={{ color: "green" }}>Connected</span>
          ) : (
            <span style={{ color: "red" }}>Disconnected</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Joystick;
