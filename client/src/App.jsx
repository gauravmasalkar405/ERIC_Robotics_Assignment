import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Joystick from "./pages/Joystick";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/joystick" element={<Joystick />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
