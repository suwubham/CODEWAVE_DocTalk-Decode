import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="flex-1 flex flex-wrap h-screen md:ml-64">
          {/* Adding margin on large screens (md:ml-64) so content doesn't overlap with the sidebar */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
