import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cakes from "./Cakes";
import Customers from "./Customers";
import Buys from "./Buys";
import "./App.css"
const App = () => {
  return (
    <Router>
      <div>
        <h1>Bistro Cafe</h1>
        <nav>
          <ul>
            <li><Link to="/">Cakes</Link></li>
            <li><Link to="/customers">Customers</Link></li>
            <li><Link to="/buys">Buys</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Cakes />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/buys" element={<Buys />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
