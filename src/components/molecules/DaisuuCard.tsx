import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/system";

const SDivTitle = styled("div")(() => ({
  fontSize: 22,
  whiteSpace: "nowrap",
  textAlign: "center",
  marginTop: "5px",
  marginBottom: "10px"
}));

const SDivDaisu = styled("div")(() => ({
  fontSize: 70,
  fontWeight: "bold"
}));

const SDivDai = styled("div")(() => ({
  fontSize: 22,
  textAlign: "center"
}));

function DaisuuCard() {
  

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
        <SDivTitle>車検満了日が間近の車両</SDivTitle>
        <SDivDaisu>10</SDivDaisu>
        <SDivDai>台</SDivDai>
      </CardContent>
    </Card>
    </>
  );
}

export default DaisuuCard;