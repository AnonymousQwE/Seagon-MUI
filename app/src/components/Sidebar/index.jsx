import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getProducts } from "../../hooks/productsHook";
import { useDispatch } from "react-redux";

const cartItems = [
  {
    title: "Пневмораспределитель 4V210",
    count: 30,
    price: 120000,
    image:
      "https://nevel.uz/upload/products/2022/01/22/2022-01-22-17-01-41-825498-b283b7284aace0e735eb48ca5f39f400.png?_=ozbol",
  },
  {
    title: "Пневмораспределитель 4V310",
    count: 20,
    price: 160000,
    image:
      "https://images.deal.by/341647750_w640_h640_pnevmoraspredelitel-52-g14.jpg",
  },
  {
    title: "Пневмораспределитель 4V410",
    count: 50,
    price: 320000,
    image:
      "https://images.deal.by/341752753_w500_h500_pnevmoraspredelitel-52-g12.jpg",
  },
];

function allPrice() {
  let result = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const curItemsPrice = cartItems[i].count * cartItems[i].price;
    result += curItemsPrice;
  }
  return result;
}

export default function Sidebar() {
  const dispatch = useDispatch();
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
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {cartItems.map((item) => (
            <Box key={item.title}>
              <ListItem
                secondaryAction={
                  <Typography>
                    {(item.count * item.price).toLocaleString("ru")} сум
                  </Typography>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      boxShadow: 6,
                      width: "60px",
                      height: "60px",
                      marginRight: "3px",
                    }}
                    src={item.image}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={`${item.count.toLocaleString(
                    "ru"
                  )} шт | ${item.price.toLocaleString("ru")} сум`}
                />
              </ListItem>
              <Divider />
            </Box>
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
                {allPrice().toLocaleString("ru")} сум
              </Typography>
            </Typography>
            <Button
              onClick={() => {
                console.log("Загрузили продукты");
                dispatch(getProducts());
              }}
              variant="contained"
            >
              Оплата
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
