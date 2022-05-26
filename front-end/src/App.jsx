import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Container, Button } from "react-bootstrap";

import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";

// import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
