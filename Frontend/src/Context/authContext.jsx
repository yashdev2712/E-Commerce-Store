import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState("");
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
