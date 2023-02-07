import { Alert, Slide, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCartNotify } from "../../slices/cartSlice";
import { clearNotify } from "../../slices/userSlice";

export default function Notify() {
  const dispatch = useDispatch();
  const { notify } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const [type, setType] = useState("success");
  const [message, setMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
  }

  useEffect(() => {
    notify.forEach((not) => {
      setType(not.type);
      setMessage(not.content);
      setOpen(true);
      if (notify.length !== 0) {
        dispatch(clearNotify());
      }
    });
    cart.notify.forEach((not) => {
      setType(not.type);
      setMessage(not.content);
      setOpen(true);
      console.log(message);
      if (cart.notify.length !== 0) {
        dispatch(clearCartNotify());
      }
    });
  }, [notify, cart.notify]);
  return Boolean(open) ? (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      TransitionComponent={TransitionDown}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  ) : (
    ""
  );
}
