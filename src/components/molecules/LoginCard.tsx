import React, { useState } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
// import { useHistory } from 'react-router-dom';
import axios from "axios";
// import swal from "sweetalert";

//ログインカード全体のスタイル
const Slogincard = styled(Card)(() => ({
  backgroundColor: "#FDFCFB",
  borderRadius: "24px",
  border: "3px dashed #FFEFD2",
}));

//ログイン下線のスタイル
const Shr = styled("hr")(() => ({
  height: "3px",
  width: "50%",
  backgroundColor: "#979393",
  border: "none",
}));

function LoginCard() {
  // const history = useHistory();

  const [loginInput, setLogin] = useState<any>({
    userid: "",
    password: "",
    error_list: [],
  });

  const [UserIdStatus, SetUserIdStatus] = useState(false);
  const [PasswordStatus, SetPasswordStatus] = useState(false);

  const handleInput = (e: any) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const isKeyExists = (obj: any, key: any) => {
    if (obj[key] == undefined) {
      return false;
    } else {
      return true;
    }
  };

  const loginSubmit = (e: any) => {
    //ブラウザで設定されているデフォルトの動作をキャンセルする
    e.preventDefault();

    const data = {
      userid: loginInput.userid,
      password: loginInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/login`, data).then((res) => {
        if (res.data.status === 200) {
          window.localStorage.setItem("auth_token", res.data.token);
          window.localStorage.setItem("auth_name", res.data.username);
          // swal("ログイン成功", res.data.message, "success");
          // history.push("/");
          window.location.reload();
          // history.push('/');
          // window.location.reload();
        } else if (res.data.status === 401) {
          // swal("注意", res.data.message, "warning");
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });

          if (isKeyExists(res.data.validation_errors, "userid")) {
            SetUserIdStatus(true);
          } else {
            SetUserIdStatus(false);
          }

          if (isKeyExists(res.data.validation_errors, "password")) {
            SetPasswordStatus(true);
          } else {
            SetPasswordStatus(false);
          }
        }
      });
    });
  };

  return (
    <>
      <Slogincard variant="outlined">
        <form onSubmit={loginSubmit}>
          <Box
            sx={{
              textAlign: "center",
              mt: 3,
              color: "#000000",
              variant: "body1",
              fontSize: "h5.fontSize",
            }}
          >
            ログイン
          </Box>
          <Shr />
          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "flex-end",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <AccountCircle sx={{ color: "action.active", mr: 1, mb: 0.5 }} />
            <TextField
              name="userid"
              onChange={handleInput}
              value={loginInput.userid}
              error={UserIdStatus}
              helperText={loginInput.error_list.userid}
              // id="USERID"
              // name="USERID"
              label="ユーザー名"
              variant="standard"
            />
          </Box>
          <Box
            sx={{
              mt: 2,
              mb: 2,
              display: "flex",
              alignItems: "flex-end",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <LockIcon sx={{ color: "action.active", mr: 1, mb: 0.5 }} />
            <TextField
              name="password"
              onChange={handleInput}
              value={loginInput.password}
              error={PasswordStatus}
              helperText={loginInput.error_list.password}
              // id="PWD"
              // name="PWD"
              label="パスワード"
              variant="standard"
            />
          </Box>
          <Box
            sx={{
              mt: 4,
              mb: 3,
              display: "flex",
              alignItems: "flex-end",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: 210,
                color: "#000000",
                backgroundColor: "#FFDD9F",
                "&:hover": {
                  backgroundColor: "#FEE9C4",
                  color: "#7D7676",
                },
              }}
            >
              ログイン
            </Button>
          </Box>
          <Box
            sx={{
              mt: 4,
              mb: 3,
              display: "flex",
              alignItems: "flex-end",
              textAlign: "center",
              justifyContent: "center",
              fontSize: "10px",
            }}
          >
            &copy; Copyright kouse & misuzu
          </Box>
        </form>
      </Slogincard>
    </>
  );
}

export default LoginCard;
