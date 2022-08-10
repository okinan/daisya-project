import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import { Navigate } from "react-router-dom";

const MainPageTemplate = (props: any) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
      setLoading(false);
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
              <Footer />
            </>
          )}
        </>
      )}
    </>
  );
};

export default MainPageTemplate;
