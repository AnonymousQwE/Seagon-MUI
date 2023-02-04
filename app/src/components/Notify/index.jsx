import { Alert, Slide, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotify } from "../../slices/userSlice";

export default function Notify({ notify }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("success");
  const [message, setMessage] = useState("");
  const [read, setRead] = useState(false);

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
      setOpen(true);
      setType(not.type);
      setMessage(not.content);
    });

    if (notify.length !== 0) {
      dispatch(clearNotify());
    }
  }, [notify]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionComponent={TransitionDown}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
