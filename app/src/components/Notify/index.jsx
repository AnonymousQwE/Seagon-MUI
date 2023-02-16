import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCartNotify } from "../../slices/cartSlice";
import { clearNotify } from "../../slices/userSlice";

export default function Notify() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // const notify = [...cart?.notify, ...user?.notify];
    if (cart.notify.length) {
      cart.notify.map((not) =>
        enqueueSnackbar(not.content, {
          TransitionProps: { direction: "down" },
          anchorOrigin: { horizontal: "left", vertical: "top" },
          autoHideDuration: 2000,
          variant: not.type,
        })
      );
      dispatch(clearNotify());
      dispatch(clearCartNotify());
    }
    if (user.notify.length) {
      user.notify.map((not) =>
        enqueueSnackbar(not.content, {
          TransitionProps: { direction: "down" },
          anchorOrigin: { horizontal: "center", vertical: "top" },
          autoHideDuration: 2000,
          variant: not.type,
        })
      );
      dispatch(clearNotify());
      dispatch(clearCartNotify());
    }
  }, [cart.notify, user.notify]);
}
