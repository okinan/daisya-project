import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import axios from "axios";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import { Navigate } from "react-router-dom";

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
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  /* ↓関数「handleSubmit」を定義 */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  /* ↓ログインを判定する設定 */
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  });

  return (
    <>
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <>
          <Slogincard variant="outlined">
            <form onSubmit={handleSubmit}>
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
                <AccountCircle
                  sx={{ color: "action.active", mr: 1, mb: 0.5 }}
                />
                <TextField
                  name="email"
                  type="email"
                  onChange={(e) => setLoginEmail(e.target.value)}
                  value={loginEmail}
                  label="メールアドレス"
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
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
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
      )}
    </>
  );
}

export default LoginCard;
