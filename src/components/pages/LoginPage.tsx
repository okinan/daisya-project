import React, { useState } from "react";
// import swal from "sweetalert";
// import { useHistory } from 'react-router-dom';
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LoginCard from "../molecules/LoginCard";

const LoginPage = () => {
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
        <img src="images/logo.png" alt="ロゴ" width="200" />
      </Container>
      <Grid container sx={{ textAlign: "center", mt: 4, mb: 8 }}>
        <Grid item xl={4.5} lg={4.5} md={4} sm={3} xs={0.5}></Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={11}>
          <LoginCard />
        </Grid>
        <Grid item xl={4.5} lg={4.5} md={4} sm={3} xs={0.5}></Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
