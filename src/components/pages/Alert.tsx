import React from "react";
// import { Redirect } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import AlertCard from "../molecules/AlertCard";

const Alert = (props: any) => {
  // if (!props.authflg) {
  //   return <Redirect to="/login" />;
  // }
  return (
    <>
      <Container
        sx={{
          textAlign: "center",
          mt: 2,
          color: "#000000",
          fontWeight: "bold",
          variant: "body1",
          fontSize: "h4.fontSize",
        }}
      >
        通知設定
      </Container>
      <hr
        style={{
          height: "3px",
          width: "50%",
          backgroundColor: "#979393",
          border: "none",
        }}
      />
      {/* 通知設定 */}
      <Grid container sx={{ textAlign: "center", mt: 4, mb: 8 }}>
        <Grid item xl={5} lg={4.5} md={4} sm={3} xs={0.5}></Grid>
        <Grid item xl={2} lg={3} md={4} sm={6} xs={11}>
          <AlertCard />
        </Grid>
        <Grid item xl={5} lg={4.5} md={4} sm={3} xs={0.5}></Grid>
      </Grid>
    </>
  );
};

export default Alert;
