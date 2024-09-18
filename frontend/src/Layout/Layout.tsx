import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="relative flex">
        <Navbar />
        <div className="flex-1 p-4 md:ml-64">
          <div className="flex flex-wrap justify-center items-center h-screen bg-gray-100">
            <Outlet />{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
