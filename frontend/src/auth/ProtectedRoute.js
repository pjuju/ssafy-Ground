import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    // user is not authenticated
    alert("로그인이 필요한 서비스입니다.");
    return <Navigate to="/" />;
  }
  return children;
};
