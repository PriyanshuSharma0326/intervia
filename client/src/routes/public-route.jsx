import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import LoadingModal from "../components/loading-modal";

function PublicRoute({ children }) {
    const {
        loading,
        isAuthenticated,
    } = useAuth();

    if (loading) {
        return <LoadingModal />;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default PublicRoute;
