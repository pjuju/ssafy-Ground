import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const LoginRoute = ({ children }) => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/feed/follow" />;
  }
  return children;
};
