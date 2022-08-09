import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SyakenTable from "../atoms/table/SyakenTable";
import { styled } from "@mui/system";

// import React, { useState } from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import { styled } from "@mui/system";
// import { styled as muistyled } from "@mui/material/styles";

const SDiv = styled("div")(() => ({
  fontSize: 22,
  whiteSpace: "nowrap",
  textAlign: "center",
  marginTop: "5px",
  marginBottom: "10px"
}));

function SyakenCard() {

  return (
    <>
    <Card
        variant="outlined"
        style={{
          backgroundColor: "#FDFCFB",
          borderRadius: "24px",
          border: "3px dashed #FFEFD2"
        }}
     >
    <CardContent>
      <SDiv>車検更新対象</SDiv>
      <SyakenTable />
    </CardContent>
    </Card>
    </>
  );
}

export default SyakenCard;