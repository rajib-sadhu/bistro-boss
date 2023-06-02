
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";


const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="min-h-screen flex items-center justify-center" >
            <progress className="progress w-56"></progress>
        </div>
    }
    if (user && isAdmin) {
        return children;
    }
    else {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

};

export default AdminRoute;