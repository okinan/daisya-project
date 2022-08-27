import Grid from "@mui/material/Grid";
import TitleDivider from "../molecules/TitleDivider";
import AlertCard from "../molecules/AlertCard";

const AlertPage = () => {
  return (
    <>
      <TitleDivider title={"通知設定"}/>
      <Grid container sx={{ textAlign: "center", mt: 4, mb: 45 }}>
        <Grid item xl={5} lg={4.5} md={4} sm={3} xs={0.5}></Grid>
        <Grid item xl={2} lg={3} md={4} sm={6} xs={11}>
          <AlertCard />
        </Grid>
        <Grid item xl={5} lg={4.5} md={4} sm={3} xs={0.5}></Grid>
      </Grid>
    </>
  );
};

export default AlertPage;
