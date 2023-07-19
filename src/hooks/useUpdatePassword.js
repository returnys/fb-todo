import { updatePassword } from "firebase/auth";
import { useState } from "react";
import { appAuth } from "../firebase/config";

export const useUpdatePassword = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const updatepw = async newPass => {
    setError(null);
    setIsPending(true);
    try {
      await updatePassword(appAuth.currentUser, newPass);
      console.log("비밀번호업데이트 완료");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };
  return { error, isPending, updatepw };
};
