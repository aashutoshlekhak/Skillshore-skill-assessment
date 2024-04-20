import { Outlet, useOutletContext } from "react-router-dom";
import AuthNavbar from "./AuthNavbar";
import UserNavbar from "./UserNavbar";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { useGetUserMutation } from "../redux/services/myUserProfileEndpoints";
import { setUserData } from "../redux/slice/userSlice";
import { motion } from "framer-motion";
import { LineWave } from "react-loader-spinner";
import Footer from "./Footer";

type Props = {
  layoutFor: string;
};
type ContextType = {
  showLoader: boolean;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CommonLayout = ({ layoutFor }: Props) => {
  const [getUserRole, { isSuccess, data }] = useGetUserMutation();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.data.token);

  useEffect(() => {
    if (token) {
      getUserRole();
    }
  }, [token]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserData(data));
    }
  }, [isSuccess]);

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
    <div className="flex flex-col justify-start min-h-screen">
      <motion.div
        style={{ pointerEvents: showLoader ? "auto" : "none" }}
        animate={showLoader ? { opacity: 1 } : { opacity: 0 }}
        initial={{ opacity: 0 }}
        className="fixed inset-0 bg-dark bg-opacity-[30%] z-50 flex items-center justify-center"
      >
        <div>
          <LineWave height={100} />
        </div>
      </motion.div>
      {layoutFor === "auth" ? <AuthNavbar /> : <UserNavbar />}
      <ToastContainer
        className="top-16"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        limit={1}
      />
      <Outlet context={{ showLoader, setShowLoader } satisfies ContextType} />
      <Footer />
    </div>
  );
};

export default CommonLayout;
export const useLoadingState = () => {
  return useOutletContext<ContextType>();
};
