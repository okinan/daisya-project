import { Typography } from "@mui/material";
import { Container, styled } from "@mui/system";

const SHr = styled("hr")(() => ({
  height: "3px",
  width: "50%",
  backgroundColor: "#979393",
  border: "none",
}));

type Props = {
  title: string
}

const TitleDivider = ({title}: Props) => {
  return (
    <>
      <Typography 
      variant="h4" 
      sx={{
        textAlign: "center",
        mt: 3,
        mb: 2,
        color: "#000000",
        fontWeight: "bold",
        variant: "body1",
        fontSize: "h1"
        }}>
          {title}
      </Typography>
      <SHr />
    </>
  );
};

export default TitleDivider;
