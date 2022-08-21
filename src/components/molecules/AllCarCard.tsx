import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/system";
import AllCarTable from "./AllCarTable";

const SDiv = styled("div")(() => ({
  fontSize: 22,
  whiteSpace: "nowrap",
  textAlign: "center",
  marginTop: "5px",
  marginBottom: "10px",
}));

function AllCarCard() {
  return (
    <>
      <Card
        variant="outlined"
        style={{
          backgroundColor: "#FDFCFB",
          borderRadius: "24px",
          border: "3px dashed #FFEFD2",
        }}
      >
        <CardContent>
          <SDiv>全車両一覧</SDiv>
          <AllCarTable />
        </CardContent>
      </Card>
    </>
  );
}

export default AllCarCard;
