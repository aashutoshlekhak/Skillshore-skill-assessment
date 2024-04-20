import { TAccessibleRoutes, TAllowedRoute } from "../pages/auth/types";

export const accessibleRoutes: TAccessibleRoutes = {
  publicRoute: [
    "/",
    "/register",
    "/forgot-password",
    "/enter-new-password",
    "/password-reset",
  ],
  adminRoute: ["/admin", "/password-reset"],
  userWithNoProfileRoute: ["/create-profile", "/password-reset"],
  userWithProfileRoute: [
    "/home",
    "/category",
    "/profile",
    "/edit-profile",
    "/password-reset",
    "/quiz",
    "/quizzes",
  ],
};

export const defaultRoutes: TAllowedRoute = {
  adminRoute: "/admin",
  userWithNoProfileRoute: "/create-profile",
  userWithProfileRoute: "/home",
};
