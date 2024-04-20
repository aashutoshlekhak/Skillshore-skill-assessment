import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { LineWave } from "react-loader-spinner";
import { accessibleRoutes, defaultRoutes } from "../configs/routeConstants";

const AuthWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state: RootState) => state.user.data);
  const token = useSelector((state: RootState) => state.auth.data.token);

  useEffect(() => {
    handleRouteAuthentication();
  }, [token, userData]);

  const handleRouteAuthentication = () => {
    const {
      publicRoute,
      adminRoute,
      userWithNoProfileRoute,
      userWithProfileRoute,
    } = accessibleRoutes;

    if (!token) {
      handleUnauthenticatedUser(publicRoute);
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 300);

      return () => {
        clearTimeout(timeout);
      };
    }

    let allowedRoutes: string[] = [];
    let user: string = "";

    if (userData.role !== "") {
      if (userData.role === "admin") {
        allowedRoutes = adminRoute;
        user = "adminRoute";
      } else {
        allowedRoutes = userData.profile
          ? userWithProfileRoute
          : userWithNoProfileRoute;
        user = userData.profile
          ? "userWithProfileRoute"
          : "userWithNoProfileRoute";
      }
    }

    handleUnauthorizedRoutes(allowedRoutes, user);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  };

  const handleUnauthenticatedUser = (publicRoute: string[]) => {
    const isAllowed = publicRoute.some((route) =>
      pathname.startsWith(`${route}/`)
    );
    if (publicRoute.includes(pathname) || isAllowed) return;
    if (!publicRoute.includes(pathname)) {
      navigate("/");
    }
  };

  const handleUnauthorizedRoutes = (allowedRoutes: string[], user: string) => {
    const isAllowed = allowedRoutes.some((route) =>
      pathname.startsWith(`${route}/`)
    );
    if (allowedRoutes.includes(pathname) || isAllowed) return;

    if (!allowedRoutes.includes(pathname)) {
      navigate(defaultRoutes[user]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <LineWave />
      </div>
    );
  }

  return children;
};

export default AuthWrapper;
