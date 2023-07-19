import { deleteUser } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useUserDelete = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const userDelete = async () => {
    setError(null);
    setIsPending(true);
    try {
      await deleteUser(appAuth.currentUser);
      dispatch({ type: "deleteUser" });
      setIsPending(false);
      console.log("서비스 탈퇴하였습니다.");
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };
  return { error, isPending, userDelete };
};
