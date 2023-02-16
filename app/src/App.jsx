import "./App.css";
import Header from "./components/Header";
import MainRoutes from "./routes/MainRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import Notify from "./components/Notify";
import { getUserData } from "./hooks/userHook";
import { collection, onSnapshot } from "firebase/firestore";
import { setCategory, setProducts } from "./slices/productsSlice";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);
  const productsRef = collection(db, "products");
  const categoryRef = collection(db, "categories");

  console.log(status);
  function checkCurrentUser() {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        console.log(user.uid);
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
      } else {
        dispatch(
          getUserData({
            user: {
              email: "guest",
              displayName: "Guest",
              photoURL: "Guest",
            },
          })
        );
      }
    });
  }

  function getAllCategory(snap) {
    dispatch(
      setCategory(
        snap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    );
  }

  function getAllProducts(snap) {
    dispatch(
      setProducts(
        snap.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })
      )
    );
  }

  useEffect(() => {
    checkCurrentUser();
    const ubsubCategory = onSnapshot(categoryRef, getAllCategory);

    const unsubProduct = onSnapshot(productsRef, getAllProducts);
    return () => {
      unsubProduct();
      ubsubCategory();
    };
  }, []);

  return (
    <>
      <Notify />

      {status !== "loading" || status === null ? (
        <>
          <Header />
          <MainRoutes />
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: window.innerHeight,
          }}
        >
          <CircularProgress size={80} color="primary" />
        </Box>
      )}
    </>
  );
}

export default App;
