import { styled } from "@mui/system";

const SHr = styled("hr")(() => ({
  height: "3px",
  width: "50%",
  backgroundColor: "#979393",
  border: "none",
}));

const ScreenTitle = () => {
  return (
    <>
      <SHr />
    </>
  );
};

export default ScreenTitle;
