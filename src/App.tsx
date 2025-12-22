import "./App.css";
import { Routes, Route } from "react-router";

import Home from "@/pages/Home";
import BugHunter from "@/features/BugHunterGame/BugHunter.jsx";
import RunningGame from "./features/RunningGame";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<BugHunter />} path="/BugHunter" />
      <Route element={<RunningGame />} path="/run" />
    </Routes>
  );
}

export default App;
