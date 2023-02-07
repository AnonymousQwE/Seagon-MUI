import "./App.css";
import Header from "./components/Header";
import MainRoutes from "./routes/MainRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import Notify from "./components/Notify";
import { getUserData } from "./hooks/userHook";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { setCategory, setProducts } from "./slices/productsSlice";
import { Fab } from "@mui/material";
import { Shop } from "@mui/icons-material";

function App() {
  const productsRef = collection(db, "products");
  const categoryRef = collection(db, "categories");
  const dispatch = useDispatch();

  function checkCurrentUser() {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(
          getUserData({
            user: {
              id: user.uid,
              email: user.email,
              displayName: user.providerData[0].displayName,
              photoURL: user.providerData[0].photoURL,
            },
          })
        );
        return user;
      } else {
        return {};
      }
    });
  }

  useEffect(() => {
    checkCurrentUser();
    const ubsubCategory = onSnapshot(categoryRef, (snap) => {
      dispatch(
        setCategory(
          snap.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      );
    });

    const unsubProduct = onSnapshot(productsRef, (snap) => {
      dispatch(
        setProducts(
          snap.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      );
    });
    return () => {
      unsubProduct();
      ubsubCategory();
    };
  }, []);

  return (
    <>
      <Notify />
      <Header />
      <MainRoutes />
    </>
  );
}

export default App;
