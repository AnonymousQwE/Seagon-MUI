import * as React from "react";
import List from "@mui/material/List";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import CartItem from "./CartItem";

export default function Sidebar({ setOpen }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  function allPrice() {
    let result = 0;
    for (let i = 0; i < cart.length; i++) {
      const curItemsPrice = cart[i].count * cart[i].price;
      result += curItemsPrice;
    }
    return result;
  }

  return (
    <>
      <Box
        sx={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
        >
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </List>
        <Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginX: 2,
              marginY: 2,
            }}
          >
            <Typography>
              Итого:
              <Typography variant="span" sx={{ fontWeight: 800 }}>
                {cart ? allPrice().toLocaleString("ru") : 0} сум
              </Typography>
            </Typography>

            <Button
              sx={{
                display: { xs: "block", md: "none" },
              }}
              onClick={async () => {
                setOpen(false);
              }}
              variant="contained"
            >
              Закрыть
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
