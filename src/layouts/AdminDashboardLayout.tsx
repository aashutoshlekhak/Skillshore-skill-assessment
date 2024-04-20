import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useLoadingState } from "./AdminLayout";
import { ToastContainer } from "react-toastify";
const AdminDashboardLayout = () => {
  const { showLoader, setShowLoader } = useLoadingState();
  return (
    <div className="flex grow">
      <ToastContainer
        className="top-16"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        limit={1}
      />
      <AdminSidebar />
      <Outlet context={{ showLoader, setShowLoader }} />
    </div>
  );
};

export default AdminDashboardLayout;
