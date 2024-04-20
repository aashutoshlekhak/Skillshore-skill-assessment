import { NavLink } from "react-router-dom";
import { MdHome } from "react-icons/md";
import skillshoreLogo from "../assets/skillshoresvg.svg";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/slice/authSlice";
import { setInitialData } from "../redux/slice/userSlice";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const LogOut = () => {
    dispatch(setInitialData());

    dispatch(logOut());
  };
  return (
    <div className="h-[56px] shrink-0 w-full bg-[#03103F] text-white flex justify-between items-center px-5">
      <NavLink to="/admin" className="flex gap-1">
        <MdHome className="text-xl" />
        <img src={skillshoreLogo} alt="skillshore-logo" />
      </NavLink>
      <div className="flex gap-4 text-sm">
        <NavLink
          to="/"
          onClick={LogOut}
          className="font-bold cursor-pointer dark:text-white hover:underline"
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default AdminNavbar;
