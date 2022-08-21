import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import { styled as muistyled } from "@mui/material/styles";
import { useAppSelector } from "../../app/hooks";
import { selectAlert1, selectAlert2, selectAlert3, selectAlert4, selectAlert5, selectDocId } from "../../features/alert/alertSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";

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
  fontSize: 20,
  textAlign: "center",
  marginTop: "5px",
  marginBottom: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function AlertCard() {

  const alert1 = useAppSelector(selectAlert1);
  const alert2 = useAppSelector(selectAlert2);
  const alert3 = useAppSelector(selectAlert3);
  const alert4 = useAppSelector(selectAlert4);
  const alert5 = useAppSelector(selectAlert5);
  const docId = useAppSelector(selectDocId);

  const changeAlert = async (e:any) => {

    const colName:string = e.target.name;
    const checked:boolean = e.target.checked;

    try{

      const alertDocmentRef = doc(db, 'alert', docId);
      await updateDoc(alertDocmentRef,{
        [colName]: checked
      });

    } catch(err){
        console.log(err);
        alert("更新失敗!管理者に連絡してください。");
        return
    }

  }

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
                  checked={alert1}
                  onChange={changeAlert}
                  name={"alert1"}
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
                  checked={alert2}
                  onChange={changeAlert}
                  name={"alert2"}
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
                  checked={alert3}
                  onChange={changeAlert}
                  name={"alert3"}
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
                  checked={alert4}
                  onChange={changeAlert}
                  name={"alert4"}
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
                  checked={alert5}
                  onChange={changeAlert}
                  name={"alert5"}
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
