import React, { useState, useEffect } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/FirebaseConfig";
import {
  collection,
  doc,
  onSnapshot
} from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectComName, selectUid, selectUserName, setAdmin, setComName, setUserName } from "../../features/auth/authSlice";
import { setAlert1, setAlert2, setAlert3, setAlert4, setAlert5, setDocId } from "../../features/alert/alertSlice";
import { setAllCar, setSyakenCar, setSyakenDaisu } from "../../features/car/carSlice";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  //Reduxから取得
  const uid = useAppSelector(selectUid);
  const userName = useAppSelector(selectUserName);
  const comName = useAppSelector(selectComName);

  // 日付をYYYY-MM-DDの書式で返す
  const formatDate = (dt: Date) => {
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth()+1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
  }

  //〇ヶ月後の日付を取得する
  const getNextMonthDate = (date:any, months:any) => {

    // 基準の年月日を取得
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
  
    // 基準の年月からDateオブジェクトを生成
    const nextDate = new Date(year, month);
    // 月の設定を変更
    nextDate.setMonth(nextDate.getMonth() + months);
    // 末日を取得
    const lastDay = new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0).getDate();
    // 元の日にちが該当月に無い場合はその月の末日を設定する
    if(lastDay < day) {
        nextDate.setDate(lastDay);
    } else {
        nextDate.setDate(day);
    }
    return nextDate;

  }

  //初期処理
  useEffect(() => {

    //ユーザー情報を取得する
    const userDocmentRef = doc(db, 'user', uid);
    onSnapshot(userDocmentRef, (querySnapshot: any) => {

      const userData = querySnapshot.data();

      //データ取得チェック
      if((typeof userData === 'undefined')){
        alert("ユーザー情報が存在しません。管理者に連絡してください。");
        logout();
      }

      //Reduxに設定
      dispatch(setAdmin(userData.admin));
      dispatch(setUserName(userData.userName));
      dispatch(setComName(userData.comName));

    });

     //現在日と1か月後を取得
     const today = new Date();
     const oneMonthLater = getNextMonthDate(today,1);

    //車両情報を取得する
    const carCollectionRef = collection(db, 'companyCar');

    onSnapshot(carCollectionRef, (querySnapshot: any) => {

      //全ての車両情報を取得
      const allCarData = querySnapshot.docs.map((doc: any) => {

        const data: any = doc.data();

        data.carComDay = formatDate(new Date(data.carComDay.seconds*1000));   //公式のtoDate()だとエラーになる
        
        data['id'] = doc.id;

        return data;
      });

      //車検満了日が古い順にソートする
      const allCarDataSort = allCarData.sort(function(a:any, b:any) {
        return (a.carComDay < b.carComDay) ? -1 : 1;  //オブジェクトの昇順ソート
      });

      //車検満了日 <= 現在日から1ヶ月以内の車両情報を取得する
      const syakenCarData = allCarDataSort.filter((data: any)=>{

        const carComDay = new Date(data.carComDay);

        //現在日だった場合の対応
        const todayFlg:boolean = today.getFullYear() === carComDay.getFullYear() && today.getMonth() === carComDay.getMonth() && today.getDate() === carComDay.getDate();

        //現在日 <= 車検満了日 <= 現在日から1か月後の場合
        if( todayFlg || ((today.getTime() < carComDay.getTime()) && (carComDay.getTime() <= oneMonthLater.getTime()))){
          
          //現在日から残りの日数を計算する
          const deadLine: number = Math.floor((carComDay.getTime() - today.getTime()) / 86400000) + 1;
          data.deadLine = `${deadLine}日`;
          return true;
          
          //車検満了日 < 現在日の場合
        }else if(carComDay.getTime() < today.getTime()){
          data.deadLine = "×";
          return true;
        }

        return false;
      })

      //Reduxに設定
      dispatch(setSyakenCar(syakenCarData));
      dispatch(setAllCar(allCarDataSort));
      dispatch(setSyakenDaisu(syakenCarData.length));

    });

    //アラート情報を取得する
    const userCollectionRef = collection(db, 'alert');
    onSnapshot(userCollectionRef, (querySnapshot: any) => {

      const alertData = querySnapshot.docs.map((doc:any) => ({...doc.data(), id: doc.id }));

      //データ取得チェック
      if(!alertData.length){
        alert("アラート情報が存在しません。管理者に連絡してください。");
        logout();
      }

      //Reduxに設定
      dispatch(setAlert1(alertData[0].alert1));
      dispatch(setAlert2(alertData[0].alert2));
      dispatch(setAlert3(alertData[0].alert3));
      dispatch(setAlert4(alertData[0].alert4));
      dispatch(setAlert5(alertData[0].alert5));
      dispatch(setDocId(alertData[0].id));

    });

  }, []);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const MenuOpen = () => {
    setOpen(!open);
  };

  const DrawerHeader = styled("div")(() => ({
    display: "flex",
    flexWrap: "nowrap",
    fontSize: "12px",
    color: "#000000",
    fontWeight: "bold",
    alignItems: "center",
  }));

  return (
    <>
      <Box>
        <CssBaseline />
        <AppBar
          position="static"
          style={{ color: "#000000", backgroundColor: "#FFE5B6" }}
        >
          <Toolbar>
            <Box
              sx={{
                display: {
                  xs: "flex",
                  sm: "flex",
                  md: "none",
                  lg: "none",
                  xl: "none",
                },
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={MenuOpen}
                edge="start"
              >
                <MenuIcon fontSize="large" style={{ color: "#000000" }} />
              </IconButton>
            </Box>
            <Container
              sx={{
                display: {
                  xs: "block",
                  sm: "block",
                  md: "none",
                  lg: "none",
                  xl: "none",
                },
                textAlign: "center",
              }}
            >
              <img src="images/logo.png" alt="ロゴ" width="80" />
            </Container>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                  lg: "flex",
                  xl: "flex",
                },
              }}
            >
              <Box sx={{ ml: 3, mr: 3 }}>
                <img src="images/logo.png" alt="ロゴ" width="80" />
              </Box>
              <Link to="/" style={{ textDecoration: "none" }}>
                <ListItemButton>
                  <ListItemIcon>
                    <DirectionsCarIcon
                      fontSize="large"
                      style={{ color: "#000000" }}
                    />
                    <Box sx={{ mr: 1 }}></Box>
                    <ListItemText
                      primary="車検一覧"
                      primaryTypographyProps={{
                        color: "#000000",
                        fontWeight: "bold",
                        variant: "body1",
                        fontSize: "h6.fontSize",
                      }}
                    />
                  </ListItemIcon>
                </ListItemButton>
              </Link>
              <Box sx={{ mr: 1 }}></Box>
              <Link to="/alert" style={{ textDecoration: "none" }}>
                <ListItemButton>
                  <ListItemIcon>
                    <NotificationsActiveIcon
                      fontSize="large"
                      style={{ color: "#000000" }}
                    />
                    <Box sx={{ mr: 1 }}></Box>
                    <ListItemText
                      primary="通知設定"
                      primaryTypographyProps={{
                        color: "#000000",
                        fontWeight: "bold",
                        variant: "body1",
                        fontSize: "h6.fontSize",
                      }}
                    />
                  </ListItemIcon>
                </ListItemButton>
              </Link>
              <Box sx={{ mr: 1 }}></Box>
              <Link
                to="/login"
                onClick={logout}
                style={{ textDecoration: "none" }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon fontSize="large" style={{ color: "#000000" }} />
                    <Box sx={{ mr: 1 }}></Box>
                    <ListItemText
                      primary="ログアウト"
                      primaryTypographyProps={{
                        color: "#000000",
                        fontWeight: "bold",
                        variant: "body1",
                        fontSize: "h6.fontSize",
                      }}
                    />
                  </ListItemIcon>
                </ListItemButton>
              </Link>
            </Box>
            <div style={{ flexGrow: 1 }}></div>
            <Box
              sx={{
                color: "##000000",
                fontWeight: "bold",
                variant: "body1",
                fontSize: "h6.fontSize",
                textAlign: "left",
                float: "right",
                display: {
                  // xs: "none",
                  sm: "none",
                  md: "block",
                  // lg: "block",
                  // xl: "block",
                },
              }}
            >
              <div>{comName}</div>
              <div>{userName}</div>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "#FFEFD2",
              width: 240,
            },
          }}
          anchor="left"
          open={open}
          onClose={MenuOpen}
        >
          <DrawerHeader>
            <Box
              sx={{
                display: "block",
                color: "##000000",
                fontWeight: "bold",
                variant: "body1",
                fontSize: "h6.fontSize",
                textAlign: "center",
                mt: 2,
                ml: 2,
                mr: 2,
                mb: 1,
              }}
            >
              <div>{comName}</div>
              <div>{userName}</div>
            </Box>
          </DrawerHeader>
          <Divider />
          <List>
            <Link to="/" onClick={MenuOpen} style={{ textDecoration: "none" }}>
              <ListItemButton>
                <ListItemIcon>
                  <DirectionsCarIcon
                    fontSize="large"
                    style={{ color: "#000000" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="車検一覧"
                  primaryTypographyProps={{
                    color: "#000000",
                    fontWeight: "bold",
                    variant: "body1",
                    fontSize: "h6.fontSize",
                  }}
                />
              </ListItemButton>
            </Link>
            <Link
              to="/alert"
              onClick={MenuOpen}
              style={{ textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <NotificationsActiveIcon
                    fontSize="large"
                    style={{ color: "#000000" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="通知設定"
                  primaryTypographyProps={{
                    color: "#000000",
                    fontWeight: "bold",
                    variant: "body1",
                    fontSize: "h6.fontSize",
                  }}
                />
              </ListItemButton>
            </Link>
            <Link
              to="/login"
              onClick={logout}
              style={{ textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon fontSize="large" style={{ color: "#000000" }} />
                </ListItemIcon>
                <ListItemText
                  primary="ログアウト"
                  primaryTypographyProps={{
                    color: "#000000",
                    fontWeight: "bold",
                    variant: "body1",
                    fontSize: "h6.fontSize",
                  }}
                />
              </ListItemButton>
            </Link>
          </List>
          <Divider />
        </Drawer>
      </Box>
    </>
  );
};

export default Header;
