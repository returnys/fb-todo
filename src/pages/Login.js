import { Button, Checkbox, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncLoginFetch } from "../reducers/actions";

// import { useLogin } from "../hooks/useFirebase";
// import firebase from "../firebase";

const Login = () => {
  // const { login } = useLogin();

  // 페이지 강제이동
  const navigate = useNavigate();

  // Modal 기능
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();
  const onFinish = values => {
    // console.log("Success:", values);
    // Firebase 로그인 시도
    // login(values.email, values.password);
    // dispatch를 통해서 액션을 만들거나 담아야 한다.
    // payload 는 1개밖에 못보내기 때문에 객체로 만들어서 전달
    dispatch(asyncLoginFetch({email:values.email, password:values.password}))
    // try {
    //   await firebase
    //     .auth()
    //     .signInWithEmailAndPassword(values.email, values.password);
    //   // 로그인 된 사용자 정보를 가지고 옮
    //   const user = firebase.auth().currentUser;
    //   setUserName(user.displayName);
    //   setUserEmail(user.email);
    //   setUserUid(user.uid);
    //   navigate("/todo");
    // } catch (error) {
    //   if (error.code === "auth/invalid-email") {
    //     setModalMessage("올바른 이메일 형식이 아닙니다.");
    //   } else if (error.code === "auth/wrong-password") {
    //     setModalMessage("올바르지 않은 비밀번호입니다.");
    //   } else if (error.code === "auth/user-not-found") {
    //     setModalMessage("가입되지 않은 사용자입니다.");
    //   } else if (error.code === "auth/missing-email") {
    //     setModalMessage("이메일이 입력되지 않았습니다..");
    //   } else {
    //     setModalMessage("로그인이 실패하였습니다.");
    //   }
    //   showModal();
    // }
  };
  const onFinishFailed = errorInfo => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <div className="p-6 mt-5 shadow rounded-md bg-white">
      <h2>Login</h2>
      {/* AntD Modal */}
      <Modal
        title="알림"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalMessage}</p>
      </Modal>
      {/* AntD form */}
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 1280,
          margin: "0 auto",
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Email을 입력해주세요.!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요.",
              validator: async (_, password) => {
                if (!password || password.length < 6) {
                  return Promise.reject(new Error("At least 6 passengers"));
                }
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#1677ff", marginRight: "10px" }}
          >
            로그인
          </Button>
          <Button
            htmlType="button"
            style={{ marginRight: "10px" }}
            onClick={() => navigate("/signup")}
          >
            회원가입
          </Button>
          <Button htmlType="button" onClick={() => navigate("/")}>
            취소
          </Button>
        </Form.Item>
      </Form>
      {/* 1. emotion을 활용하여 tag의 용도를 구분한다.
          2. css도 함께 적용한다.
      */}
    </div>
  );
};

export default Login;
