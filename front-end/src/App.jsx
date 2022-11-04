import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Container, Button } from "react-bootstrap";

import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Home } from "./Pages/Home";
import { BotPage } from "./Pages/BotPage";
import { LinkApiBitkub } from "./Pages/LinkApiBitkub";
import { LinkLine } from "./Pages/LinkLine";
import { BotDetails } from "./Pages/BotDetails";
import { LinkApiLine } from "./Pages/LinkApiLine";
import { LinkApiBitkubUpdate } from "./Pages/LinkApiBitkubUpdate";
import { ViewerTrade } from "./Pages/ViewerTrade";
import { SymStgHistory } from "./Pages/SymStgHistory";
import { ActivePage } from "./Pages/ActivePage";
import StgInfo from "./Pages/StgInfo";
import TakeprofitStoploss from "./Pages/TakeprofitStoploss";

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
              <Route path=":botType">
                <Route path="" element={<BotDetails />} />
                <Route path="symstghistory" element={<SymStgHistory />} />
                <Route path="Active" element={<ActivePage />} />
                <Route path="viewertrade">
                  <Route path=":symbol" element={<ViewerTrade />} />
                </Route>
              </Route>
              <Route path="bitkub" element={<LinkApiBitkub />} />
              <Route path="bitkubupdate" element={<LinkApiBitkubUpdate />} />
              {/* <Route path="viewertrade" element={<ViewerTrade />} /> */}

              <Route path="linkline" element={<LinkLine />} />
              <Route path="linkapiline" element={<LinkApiLine />} />
            </Route>
            <Route path="StgInfo" element={<StgInfo />} />
            <Route
              path="Takeprofit&Stoploss"
              element={<TakeprofitStoploss />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
