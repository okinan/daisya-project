import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DaisuuCard from "../molecules/DaisuuCard";
import SyakenCard from "../molecules/SyakenCard";
import AllCarCard from "../molecules/AllCarCard";
import TitleDivider from "../molecules/TitleDivider";

const TopPage = () => {
  return (
    <>
      <TitleDivider title={"車検一覧"}/>
      {/* 車検満了日間近 */}
      <Grid container sx={{ textAlign: "center", mt: 4 }}>
        <Grid item xl={5} lg={4.5} md={4} sm={3} xs={0.5}></Grid>
        <Grid item xl={2} lg={3} md={4} sm={6} xs={11}>
          <DaisuuCard />
        </Grid>
        <Grid item xl={5} lg={4.5} md={4} sm={3} xs={0.5}></Grid>
      </Grid>
      {/* 車検更新対象一覧,全車両一覧 */}
      <Grid container sx={{ textAlign: "center", mt: 4 }}>
        <Grid item xl={3} lg={2} md={1} sm={0.5} xs={0.5}></Grid>
        <Grid item xl={6} lg={8} md={10} sm={11} xs={11}>
          <SyakenCard />
          <Box sx={{ mt: 4 }}></Box>
          <AllCarCard />
        </Grid>
        <Grid item xl={3} lg={2} md={1} sm={0.5} xs={0.5}></Grid>
      </Grid>
    </>
  );
};

export default TopPage;
