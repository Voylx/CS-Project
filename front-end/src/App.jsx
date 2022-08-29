import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Container, Button } from "react-bootstrap";

import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Home } from "./Pages/Home";
import { BotPage } from "./Pages/BotPage";
import { LinkApiBitkub } from "./Pages/LinkApiBitkub";

// import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="home" element={<Home />} />
            <Route path="bot">
              <Route path="" element={<BotPage />} />
              <Route path="bitkub" element={<LinkApiBitkub />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
