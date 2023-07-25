import { useState } from "react";
import axios from "axios";
import { loginRoute } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("user1");
  const [password, setPassword] = useState("123456");

  const navigate = useNavigate();

  // login handler
  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await axios.post(
        loginRoute,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      if (loginResponse?.data?.status) {
        navigate("/joystick");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={loginHandler} className="joy_farm">
        <input
          placeholder="Enter username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Test Login</button>
      </form>
    </div>
  );
};

export default Login;
