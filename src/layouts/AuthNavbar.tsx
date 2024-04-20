import { NavLink } from "react-router-dom";
import skillshoreLogo from "../assets/skillshoresvg.svg";

const AuthNavbar = () => {
  const navElementStyles = "login-nav font-bold hover:underline";

  return (
    <nav className="h-[56px] shrink-0 w-full bg-[#03103F] text-white flex justify-between items-center px-12">
      <NavLink to="/" className="login-nav flex gap-2">
        <img src={skillshoreLogo} alt="skillshore-logo" />
      </NavLink>
      <div className="flex gap-[46px] text-sm">
        <NavLink to="." end className={navElementStyles}>
          Login
        </NavLink>
        <NavLink to="/register" className={navElementStyles}>
          Register
        </NavLink>
      </div>
    </nav>
  );
};

export default AuthNavbar;
