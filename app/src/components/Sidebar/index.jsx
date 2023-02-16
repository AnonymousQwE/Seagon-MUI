import List from "@mui/material/List";
import {
  Button,
  Divider,
  Drawer,
  Fab,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useState } from "react";
import { ShoppingCart } from "@mui/icons-material";

export default function Sidebar() {
  const { cart } = useSelector((state) => state.cart);
  const [openCart, setOpenCart] = useState(false);

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
      <Fab
        sx={{
          display: openCart ? "none" : "flex",
          position: "absolute",
          right: 20,
          bottom: 20,
        }}
        onClick={() => {
          setOpenCart(true);
        }}
        variant="regular"
        color="primary"
        aria-label="cart"
      >
        <ShoppingCart />
      </Fab>
      <SwipeableDrawer
        anchor="left"
        open={openCart}
        onClose={() => {
          setOpenCart(false);
        }}
        onOpen={() => {
          setOpenCart(true);
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: { xs: "100vw", md: "500px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 20,

              fontWeight: "bold",
              marginTop: 1,
            }}
          >
            Корзина
          </Typography>
          <List
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              overflow: "scroll",
            }}
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
                  setOpenCart(false);
                }}
                variant="contained"
              >
                Закрыть
              </Button>
            </Box>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
