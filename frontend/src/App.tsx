import Navbar from "./components/Navbar";
import Upload from "./components/Upload";
import "./App.css";

export default function App() {
  return (
    <div className="mainLayout">
      <Navbar />
      <div className="flex flex-wrap border-2 justify-center items-center h-screen">
        <Upload />
      </div>
    </div>
  );
}
