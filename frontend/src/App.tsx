import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Upload from "./components/Upload";
import "./App.css";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Past from "./components/Past";
import Camera from "./components/Camera";
import { Chat } from "./components/Chat";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Upload />} />
        <Route path="/past" element={<Past />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/chat" element={<Chat />} />
      </Route>
    </Routes>
  );
}
