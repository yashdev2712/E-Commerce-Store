import { useState } from "react";
import { useAuthContext } from "../Context/authContext";

const useLogin = () => {
  const { setAuth } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const logIn = async (email, password) => {
    try {
      setLoading(true);
      validateInput(email, password);

      if (validateInput) return;

      const res = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(email, password),
      });

      const data = await res.json();
      setAuth(data);
      localStorage.setItem("authToken", setAuth);
    } catch (error) {
      console.log("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  return { logIn, loading };
};

export default useLogin;

const validateInput = (email, password) => {
  if (!email || !password) {
    return false;
  } else {
    return true;
  }
};
