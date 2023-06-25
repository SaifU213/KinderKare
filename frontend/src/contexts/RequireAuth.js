import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth"

const RequireAuth = ({requireRole}) =>{
    const { auth } = useAuth();
    const location = useLocation();
    let authorize = false
    for(let i=0; i< auth.length; i++){
        if(requireRole[0] === auth[i]){
            authorize = true
        }
    }

    return(
        authorize
            ?<Outlet />
            : <Navigate to="/" state = {{from : location}} replace/>
    );
}

export default RequireAuth;