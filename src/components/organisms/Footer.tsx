import React from "react";
import { styled } from "@mui/system";

const Sfooter = styled("footer")(() => ({
  backgroundColor: "#ffefd2",
  coler: "#000000",
  textAlign: "center",
  padding: "20px 0",
  width: "100%",
  position: "fixed",
  bottom: "0",
  right:"0"
}));

const Footer = () => {
  return <Sfooter>&copy; Copyright kouse & misuzu</Sfooter>;
};

export default Footer;