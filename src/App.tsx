import "./App.css";
import { Routes, Route } from "react-router";
import Home from "@/pages/Home";
import RhythmGame from "@/features/RhythmGame";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<RhythmGame />} path="/rhythm" />
    </Routes>
  );
}

export default App;
