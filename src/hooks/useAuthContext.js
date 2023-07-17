import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

// React의 useContext 훅을 사용
// AuthContext의 state 및 dispatch 함수를 가져오는 커스텀 훅 정의
export const useAuthContext = ()=>{
  // 가져오는 커스텀 훅 정의
  const context = useContext(AuthContext);
  return context;
}