import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import { Outlet, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { LineWave } from "react-loader-spinner";

type ContextType = {
  showLoader: boolean;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminLayout = () => {
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showLoader]);

  return (
    <div className="flex flex-col justify-between h-screen">
      <motion.div
        style={{ pointerEvents: showLoader ? "auto" : "none" }}
        animate={showLoader ? { opacity: 1 } : { opacity: 0 }}
        initial={{ opacity: 0 }}
        className="fixed inset-0 bg-dark bg-opacity-[30%] z-50 flex items-center justify-center"
      >
        <div>
          <LineWave />
        </div>
      </motion.div>

      <AdminNavbar />
      <Outlet context={{ showLoader, setShowLoader } satisfies ContextType} />
      <Footer />
    </div>
  );
};

export default AdminLayout;

export const useLoadingState = () => {
  return useOutletContext<ContextType>();
};
