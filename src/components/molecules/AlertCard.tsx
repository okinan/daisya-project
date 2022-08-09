import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import { styled as muistyled } from "@mui/material/styles";

const SAlertcord = styled(Card)(() => ({
  backgroundColor: "#FDFCFB",
  borderRadius: "24px",
  border: "3px dashed #FFEFD2",
}));

const SSwitch = muistyled(Switch)(() => ({
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      color: "#FED182",
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#F9E1B5",
    },
  },
}));

const SDiv = styled("div")(() => ({
  fontSize: 22,
  textAlign: "center",
  marginTop: "5px",
  marginBottom: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function AlertCard() {
  //データ準備用
  const [Alert1, SetAlert1] = useState(false);
  const [Alert2, SetAlert2] = useState(false);
  const [Alert3, SetAlert3] = useState(false);
  const [Alert4, SetAlert4] = useState(false);
  const [Alert5, SetAlert5] = useState(false);

  const AlertChange = (e: any) => {
    if (e.target.name === "ALERT1") {
      SetAlert1((prevState) => !prevState);
    } else if (e.target.name === "ALERT2") {
      SetAlert2((prevState) => !prevState);
    } else if (e.target.name === "ALERT3") {
      SetAlert3((prevState) => !prevState);
    } else if (e.target.name === "ALERT4") {
      SetAlert4((prevState) => !prevState);
    } else if (e.target.name === "ALERT5") {
      SetAlert5((prevState) => !prevState);
    }

    // console.log(e.target.name);
    // console.log(`${!Alert1}に変更しました`);
  };

  return (
    <>
      <SAlertcord variant="outlined">
        <CardContent>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xl={0.5} lg={0.5} md={1} sm={1} xs={1}></Grid>
            <Grid item xl={8} lg={7.5} md={7.5} sm={7} xs={7}>
              <SDiv>1カ月と1週間前</SDiv>
            </Grid>
            <Grid item xl={3.5} lg={4} md={3.5} sm={4} xs={4}>
              <SDiv>
                <SSwitch
                  checked={Alert1}
                  onChange={AlertChange}
                  name={"ALERT1"}
                />
              </SDiv>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xl={0.5} lg={0.5} md={1} sm={1} xs={1}></Grid>
            <Grid item xl={8} lg={7.5} md={7.5} sm={7} xs={7}>
              <SDiv>1カ月前</SDiv>
            </Grid>
            <Grid item xl={3.5} lg={4} md={3.5} sm={4} xs={4}>
              <SDiv>
                <SSwitch
                  checked={Alert2}
                  onChange={AlertChange}
                  name={"ALERT2"}
                />
              </SDiv>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xl={0.5} lg={0.5} md={1} sm={1} xs={1}></Grid>
            <Grid item xl={8} lg={7.5} md={7.5} sm={7} xs={7}>
              <SDiv>3週間前</SDiv>
            </Grid>
            <Grid item xl={3.5} lg={4} md={3.5} sm={4} xs={4}>
              <SDiv>
                <SSwitch
                  checked={Alert3}
                  onChange={AlertChange}
                  name={"ALERT3"}
                />
              </SDiv>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xl={0.5} lg={0.5} md={1} sm={1} xs={1}></Grid>
            <Grid item xl={8} lg={7.5} md={7.5} sm={7} xs={7}>
              <SDiv>2週間前</SDiv>
            </Grid>
            <Grid item xl={3.5} lg={4} md={3.5} sm={4} xs={4}>
              <SDiv>
                <SSwitch
                  checked={Alert4}
                  onChange={AlertChange}
                  name={"ALERT4"}
                />
              </SDiv>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xl={0.5} lg={0.5} md={1} sm={1} xs={1}></Grid>
            <Grid item xl={8} lg={7.5} md={7.5} sm={7} xs={7}>
              <SDiv>1週間前</SDiv>
            </Grid>
            <Grid item xl={3.5} lg={4} md={3.5} sm={4} xs={4}>
              <SDiv>
                <SSwitch
                  checked={Alert5}
                  onChange={AlertChange}
                  name={"ALERT5"}
                />
              </SDiv>
            </Grid>
          </Grid>
        </CardContent>
      </SAlertcord>
    </>
  );
}

export default AlertCard;
