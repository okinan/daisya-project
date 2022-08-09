import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DaisuuCard from "../molecules/DaisuuCard";
import SyakenCard from "../molecules/SyakenCard";

const TopPage = () => {
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
        車検一覧
      </Container>
      <hr
        style={{
          height: "3px",
          width: "50%",
          backgroundColor: "#979393",
          border: "none",
        }}
      />
      {/* 車検満了日が間近の車両 */}
      <Grid container sx={{ textAlign: "center", mt: 4 }}>
        <Grid item xl={5} lg={4.5} md={4} sm={3} xs={0.5}></Grid>
        <Grid item xl={2} lg={3} md={4} sm={6} xs={11}>
          <DaisuuCard />
        </Grid>
        <Grid item xl={5} lg={4.5} md={4} sm={3} xs={0.5}></Grid>
      </Grid>
      {/* 車検更新対象 */}
      <Grid container sx={{ textAlign: "center", mt: 4 }}>
        <Grid item xl={3} lg={2} md={1} sm={0.5} xs={0.5}></Grid>
        <Grid item xl={6} lg={8} md={10} sm={11} xs={11}>
          <SyakenCard />
          <Box sx={{ mt: 4 }}></Box>
          {/* <AllcarCard />　/>*/}
        </Grid>
        <Grid item xl={3} lg={2} md={1} sm={0.5} xs={0.5}></Grid>
      </Grid>
      {/* 全車両一覧 */}
    </>
  );
};

export default TopPage;
