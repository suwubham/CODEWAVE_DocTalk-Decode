import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Upload from "./components/Upload";
import "./App.css";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Past from "./components/Past";
import Camera from "./components/Camera";

export default function App() {
  useEffect(() => {
    console.log("useEffect triggered");

    const getCities = async () => {
      try {
        const citiesCol = collection(db, "test");
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map((doc) => doc.data());
        console.log("City List: ", cityList);
      } catch (error) {
        console.error("Error fetching cities: ", error);
      }
    };

    getCities(); // Call the async function
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Upload />} />
        <Route path="/past" element={<Past />} />
        <Route path="/camera" element={<Camera />} />
      </Route>
    </Routes>
  );
}
