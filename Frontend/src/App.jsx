import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

const App = () => {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <Routes>
        <Route path="/auth" element={<Login />}></Route>
        <Route path="/auth2" element={<Signup />}></Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
