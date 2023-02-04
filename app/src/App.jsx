import "./App.css";
import Header from "./components/Header";
import MainRoutes from "./routes/MainRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setUser } from "./slices/userSlice";
import { Link } from "react-router-dom";
import { Alert, AlertTitle, Button, Container, Snackbar } from "@mui/material";
import Notify from "./components/Notify";

function App() {
  const dispatch = useDispatch();
  const { user, notify } = useSelector((state) => state.user);

  function checkCurrentUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            id: user.uid,
            email: user.email,
            displayName: user.providerData[0].displayName,
            photoURL: user.providerData[0].photoURL,
          })
        );
        return user;
      } else {
        return {};
      }
    });
  }
  useEffect(checkCurrentUser, [dispatch]);

  return (
    <>
      <Notify notify={notify} />
      <Header />
      <MainRoutes />

      {/* <button
        onClick={() => {
          console.log(user);
        }}
      >
        ЧЕЕЕК
      </button>
      <br />
      <Link to={"admin"}>АДМИН</Link>
      <br />
      <Link to={"/"}>/</Link>
      <br />
      <Link to={"/auth"}>AUTH</Link> */}
    </>
  );
}

export default App;
