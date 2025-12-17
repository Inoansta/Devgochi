import "./App.css";
import { Routes, Route } from "react-router";
import Home from "@/pages/Home";
import RunningGame from "./features/RunningGame";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<RunningGame />} path="/run" />
    </Routes>
  );
}

export default App;
