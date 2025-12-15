import "./App.css";
import { Routes, Route } from "react-router";
import Home from "@/pages/Home";
import BugHunter from "@/pages/BugHunter.jsx";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<BugHunter />} path="/training/bug" />
    </Routes>
  );
}

export default App;
