// App.tsx
import React from "react";
import "./App.css";
import Box from "./components/Box/Box";
// import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import TodoList from "../src/components/Todo/TodoList";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login />}></Route> */}
          <Route path="/" element={<Box />}></Route>
        </Routes>
      </Router>
      <div className="left-box"></div>
      <div className="right-box"></div>
    </div>
  );
};

export default App;
