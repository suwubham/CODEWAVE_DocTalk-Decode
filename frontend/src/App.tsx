import Navbar from "./components/Navbar";
import Upload from "./components/Upload";
import "./App.css";

export default function App() {
  return (
    <div className="mainLayout">
      <Navbar />
      <div className="flex border-2 justify-center items-center w-full">
        <Upload />
      </div>
    </div>
  );
}
