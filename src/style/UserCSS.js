import styled from "@emotion/styled";

const SignUpDiv = styled.div`
  form {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 0;
    width: 80%;
    margin: 0 auto;
    label {
      display: block;
      width: 30%;
      font-weight: 700;
    }
    input {
      display: block;
      width: 70%;
      border: 1px solid #ddd;
    }
    /* .btn-list{
        display: flex;
        justify-content: center;
        gap: 10px;
        width: 100%;
        text-align: center;
    } */
  }
`;

export const LoginDiv = styled.div`
  form {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 0;
    width: 80%;
    margin: 0 auto;
    label {
      display: block;
      width: 30%;
      font-weight: 700;
    }
    input {
      display: block;
      width: 70%;
      border: 1px solid #ddd;
    }
  }
`;

export const MyPageDiv = styled.div`
  form {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 10px 0;
    width: 80%;
    margin: 0 auto;
    div {
      display: flex;
      justify-content: start;
      gap: 10px;
      label {
        display: block;
        width: 25%;
        font-weight: 700;
      }
      input {
        display: block;
        width: 60%;
        border: 1px solid #ddd;
      }
    }
  }
`;

export default SignUpDiv;
