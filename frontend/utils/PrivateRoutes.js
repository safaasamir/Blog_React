import { useContext } from "react";
import { Outlet,Navigate } from "react-router-dom";
import { UserContext } from "../src/hooks/Usercontext";

const PrivateRoutes=()=>{
    const { setUserInfo, userInfo } = useContext(UserContext);
    let auth={'token':false}
    return(
      auth?.token ? <Outlet/> : <Navigate to="/login"/>
    )

}
export default PrivateRoutes