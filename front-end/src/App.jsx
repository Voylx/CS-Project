import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Container, Button } from "react-bootstrap";

import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import {Home} from "./Pages/Home"

// import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
