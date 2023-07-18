import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

// FB 로그아웃
export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const logout = async () => {
    setError(null);
    setIsPending(true);

    // FB 로그아웃 API
    try {
      await signOut(appAuth);
      dispatch({ type: "logout" });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return { error, isPending, logout };
};
