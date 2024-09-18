import Navbar from "./components/Navbar";
import Upload from "./components/Upload";
import "./App.css";
import { useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

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
    <div className="mainLayout">
      <Navbar />
      <div className="flex border-2 justify-center items-center w-full">
        <Upload />
      </div>
    </div>
  );
}
