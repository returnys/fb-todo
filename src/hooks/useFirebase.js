import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appAuth } from "../firebase/config";
import {
  deleteUserFB,
  isErrorFB,
  loginFB,
  logoutFB,
  updateEmailFB,
  updateNameFB,
} from "../reducers/fbAuthSlice";

// 사용자 로그인 Hook
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        appAuth,
        email,
        password,
      );
      const user = userCredential.user;
      dispatch(
        loginFB({
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
        }),
      );
      navigate("/");
    } catch (err) {
      let errMessage = "";
      if (err.code === "auth/invalid-email") {
        errMessage = "올바른 이메일 형식이 아닙니다.";
      } else if (err.code === "auth/wrong-password") {
        errMessage = "올바르지 않은 비밀번호입니다.";
      } else if (err.code === "auth/user-not-found") {
        errMessage = "가입되지 않은 사용자입니다.";
      } else if (err.code === "auth/missing-email") {
        errMessage = "이메일이 입력되지 않았습니다.";
      } else {
        errMessage = "로그인이 실패하였습니다.";
      }
      dispatch(isErrorFB(errMessage));
    }
  };
  return { error, isPending, login };
};

// 사용자 로그아웃 Hook
export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    setError(null);
    setIsPending(true);
    try {
      await signOut(appAuth);
      dispatch(logoutFB());
      navigate("/");
    } catch (err) {
      dispatch(isErrorFB(err.message));
    }
  };
  return { error, isPending, logout };
};

// 회원가입 Hook
export const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [ispending, setIspending] = useState(false);
  const signup = async (email, password, displayName) => {
    setError(null);
    setIspending(true);
    try {
      // 사용자 등록 시작
      const userCredential = await createUserWithEmailAndPassword(
        appAuth,
        email,
        password,
      );
      const user = userCredential.user;
      if (!user) {
        const errMessage = "회원가입에 실패하였습니다.";
        dispatch(isErrorFB(errMessage));
        return;
      }
      await updateProfile(appAuth.currentUser, {
        displayName: displayName,
        // photoURL: "https://example.com/jane-q-user/profile.jpg",
      });
      dispatch(
        loginFB({
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
        }),
      );
      setError(null);
      setIspending(false);
      navigate("/login");
    } catch (err) {
      let errMessage = "";
      if (err.code == "auth/email-already-in-use") {
        errMessage = "The email address is already in use";
      } else if (err.code == "auth/invalid-email") {
        errMessage = "The email address is not valid.";
      } else if (err.code == "auth/operation-not-allowed") {
        errMessage = "Operation not allowed.";
      } else if (err.code == "auth/weak-password") {
        errMessage = "The password is too weak.";
      }
      dispatch(isErrorFB(errMessage));
    }
  };
  return { error, ispending, signup };
};

// 이메일 변경 Hook
export const useUpdateEmail = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const updateMail = async email => {
    setError(null);
    setIsPending(true);
    try {
      await updateEmail(appAuth.currentUser, email);
      console.log(appAuth.currentUser);
      dispatch(
        updateEmailFB({
          email: appAuth.currentUser.email,
        }),
      );
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      dispatch(isErrorFB(err.message));
      setIsPending(false);
    }
  };
  return { error, isPending, updateMail };
};

// 닉네임 변경 Hook
export const useUpdateNickName = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const updateNickName = async displayName => {
    setError(null);
    setIsPending(true);
    try {
      await updateProfile(appAuth.currentUser, {
        displayName: displayName,
        // photoURL: "https://example.com/jane-q-user/profile.jpg",
      });
      dispatch(
        updateNameFB({
          displayName: appAuth.currentUser.displayName,
        }),
      );
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      dispatch(isErrorFB(err.message));
      setIsPending(false);
      let errMessage = "";
      if (err.code == "auth/email-already-in-use") {
        errMessage = "The email address is already in use";
      } else if (err.code == "auth/invalid-email") {
        errMessage = "The email address is not valid.";
      } else {
        errMessage = "이메일을 확인해 주세요.";
      }
      dispatch(isErrorFB(errMessage));
    }
  };
  return { error, isPending, updateNickName };
};

// 비밀번호 변경 Hook
export const useUpdatePassword = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const updatepw = async newPass => {
    setError(null);
    setIsPending(true);
    try {
      await updatePassword(appAuth.currentUser, newPass);
    } catch (err) {
      setError(err.message);
      dispatch(isErrorFB(err.message));
      setIsPending(false);
      let errMessage = "";
      if (err.code === "auth/weak-password") {
        errMessage = "The password is too weak.";
      } else {
        errMessage = "비밀번호 다시 입력해 주세요.";
      }
      dispatch(isErrorFB(errMessage));
    }
  };
  return { error, isPending, updatepw };
};

// 회원탈퇴 Hook
export const useUserDelete = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const userDelete = async () => {
    setError(null);
    setIsPending(true);
    try {
      await deleteUser(appAuth.currentUser);
      dispatch(deleteUserFB());
      setIsPending(false);
      navigate("/");
    } catch (err) {
      setError(err.message);
      dispatch(isErrorFB(err.message));
      setIsPending(false);
    }
  };
  return { error, isPending, userDelete };
};
