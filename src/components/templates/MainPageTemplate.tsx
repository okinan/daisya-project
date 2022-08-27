import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setUid } from "../../features/auth/authSlice";
import { Box } from "@mui/material";
// import { UserImpl } from '@firebase/auth/internal';

const MainPageTemplate = (props: any) => {
  
  const dispatch = useAppDispatch();

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //currentUserのanyをどう対応するか未定
    //currentUserはUserImplの型を利用している気がするが、エラーになる
    onAuthStateChanged(auth, (currentUser: any) => {

      if(currentUser){
        setUser(currentUser);
        dispatch(setUid(currentUser.uid));
        setLoading(false);
      }

    });
  }, []);



  return (
    <>
      {!loading && (
        <>
          {!user ? (
            <Navigate to={`/login`} />
          ) : (
            <>
              <Header />
              {props.Page}
              <Box sx={{ mt: 8 }}></Box>
              <Footer />
            </>
          )}
        </>
      )}
    </>
  );
};

export default MainPageTemplate;
