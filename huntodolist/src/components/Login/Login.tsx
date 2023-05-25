import "./Login.scss";
import React, { useState } from "react";
import axios from "axios";
import Logo from "../../assets/logos/logo.png";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element {
  const [userID, setUserID] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [saveEmailEnabled, setSaveEmailEnabled] = useState(false);
  const [autoLoginEnabled, setAutoLoginEnabled] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const signIn = () => {
    if (userID && userPassword) {
      if (saveEmailEnabled) {
        localStorage.setItem("savedEmail", userID);
      } else {
        localStorage.removeItem("savedEmail");
      }

      if (autoLoginEnabled) {
        localStorage.setItem("autoLogin", "true");
      } else {
        localStorage.removeItem("autoLogin");
      }

      axios({
        method: "post",
        url: `${API_BASE_URL}/user/login`,
        data: {
          userId: userID,
          userPassword: userPassword,
        },
      })
        .then((res) => {
          console.log("로그인");
          navigate("/todolist");
        })
        .catch((err) => {
          console.log("로그인 후 settings 가져오는 axios 실패", err);
        });
    } else {
      console.log("error", "아이디와 비밀번호를 입력해주세요");
    }
  };

  const enterUserID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserID(event.target.value);
  };

  const enterUserPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };

  const toggleSaveUserID = () => {
    setSaveEmailEnabled(!saveEmailEnabled);
  };

  const toggleAutoLogin = () => {
    setAutoLoginEnabled(!autoLoginEnabled);
  };

  return (
    <div className="Loginbox">
      <img src={Logo} alt="PUMG" className="login-logo" />
      <input
        className="emailInput"
        placeholder="E-mail"
        value={userID}
        onChange={enterUserID}
      />
      <input
        className="passwordInput"
        placeholder="Password"
        type="password"
        value={userPassword}
        onChange={enterUserPassword}
      />
      <div className="save-auto">
        <div className="save-email">
          <input
            type="checkbox"
            id="save-email"
            checked={saveEmailEnabled}
            onChange={toggleSaveUserID}
          />
          <label htmlFor="save-email">Save Email</label>
        </div>
        <div className="auto-login-checkbox">
          <input
            type="checkbox"
            id="auto-login"
            checked={autoLoginEnabled}
            onChange={toggleAutoLogin}
          />
          <label htmlFor="auto-login">Auto-login</label>
        </div>
      </div>
      <button className="loginbtn" onClick={signIn}>
        Login
      </button>
    </div>
  );
}

export default Login;
