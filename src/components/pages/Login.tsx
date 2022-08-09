import React, { useState } from "react";
// import swal from "sweetalert";
// import { useHistory } from 'react-router-dom';
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LoginCard from "../molecules/LoginCard";

function Login() {
  //history.pushでページ遷移できる
  // const history = useHistory();

  const [loginInput, setLogin] = useState<any>({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e: any) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };
  const loginSubmit = (e: any) => {
    //ブラウザで設定されているデフォルトの動作をキャンセルする
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/login`, data).then((res) => {
        if (res.data.status === 200) {
          window.localStorage.setItem("auth_token", res.data.token);
          window.localStorage.setItem("auth_name", res.data.username);
          //   swal("ログイン成功", res.data.message, "success");
          //   history.push("/");
          window.location.reload();
        } else if (res.data.status === 401) {
          //   swal("注意", res.data.message, "warning");
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  };

  return (
    <>
      <Container
        sx={{
          textAlign: "center",
          mt: 10,
          color: "#000000",
          fontWeight: "bold",
          variant: "body1",
          fontSize: "h4.fontSize",
        }}
      >
        代車管理システム
      </Container>
      <Container
        sx={{
          mt: 2,
          display: "block",
          textAlign: "center",
        }}
      >
        <img src="/storage/images/logo.png" alt="ロゴ" width="200" />
      </Container>
      {/* ログイン画面 */}
      <Grid container sx={{ textAlign: "center", mt: 4, mb: 8 }}>
        <Grid item xl={4.5} lg={4.5} md={4} sm={3} xs={0.5}></Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={11}>
          <LoginCard />
        </Grid>
        <Grid item xl={4.5} lg={4.5} md={4} sm={3} xs={0.5}></Grid>
      </Grid>
    </>
  );
}

export default Login;
