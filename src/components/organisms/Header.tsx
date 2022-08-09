import React from "react";
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
import axios from "axios";
// import image from "../../../images/logo.png";

const Header = () => {
  // const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const MenuOpen = () => {
    setOpen(!open);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    flexWrap: "nowrap",
    fontSize: "12px",
    color: "#000000",
    fontWeight: "bold",
    alignItems: "center",
  }));

  const logoutSubmit = (e: any) => {
    e.preventDefault();

    axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        window.localStorage.removeItem("auth_token");
        window.localStorage.removeItem("auth_name");
        // history.push("/login");
        window.location.reload();
      }
    });
  };

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
              <img src="../../../" alt="ロゴ" width="80" />
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
                onClick={logoutSubmit}
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
                  xs: "none",
                  sm: "none",
                  md: "block",
                  lg: "block",
                  xl: "block",
                },
              }}
            >
              <div>株式会社 テスト工場</div>
              <div>ログインユーザー</div>
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
              <div>株式会社　テスト工場</div>
              <div>ユーザー名</div>
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
              onClick={logoutSubmit}
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
