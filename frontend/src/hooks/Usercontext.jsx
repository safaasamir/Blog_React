import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [update,setUpdate]=useState({})
  return (
    <UserContext.Provider value={{ setUserInfo, userInfo ,update,setUpdate}}>
      {children}
    </UserContext.Provider>
  );
};
