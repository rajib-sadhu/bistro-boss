import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center" >
            <progress className="progress w-56"></progress>
        </div>
    }
    if (user) {
        return children;
    }
    else {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

};

export default PrivateRoute;