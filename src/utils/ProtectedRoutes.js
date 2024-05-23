import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Authcontext";

const ProtectedRoutes = () => {

    const { isAuthenticated } = useAuth();

    if(isAuthenticated){
        return <Outlet />
    }else{
        return(
        <Navigate to="/login" />
        )
    }
}

export default ProtectedRoutes;