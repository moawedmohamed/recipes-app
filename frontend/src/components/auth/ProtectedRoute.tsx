import type { ProtectedRouteProps } from "../../interfaces"
import { Navigate } from "react-router-dom"
const ProtectedRoute = ({ children, isAuthenticated }: ProtectedRouteProps) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
export default ProtectedRoute