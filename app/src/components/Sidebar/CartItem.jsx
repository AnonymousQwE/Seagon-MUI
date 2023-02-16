import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Add, Delete, Remove } from "@mui/icons-material";
import { changeCountToCart, removeToCart } from "../../slices/cartSlice";
import { Box } from "@mui/system";
import { Divider, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import CartItemEdit from "./CartItemEdit";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <Box
      onClick={() => {
        setOpenEdit(true);
      }}
    >
      <CartItemEdit
        id={item.id}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
      />
      <ListItem
        secondaryAction={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box width={95}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <IconButton
                  sx={{
                    display: {
                      md: "flex",
                      xs: "none",
                    },
                  }}
                  onClick={() => {
                    dispatch(changeCountToCart({ id: item.id, count: 1 }));
                  }}
                >
                  <Add fontSize="small" />
                </IconButton>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                  fontSize={{ xs: 20, md: 18 }}
                >
                  {item.count.toLocaleString("ru")}
                </Typography>
                <IconButton
                  sx={{
                    display: {
                      md: item.count > 1 ? "flex" : "none",
                      xs: "none",
                    },
                  }}
                  onClick={() => {
                    dispatch(changeCountToCart({ id: item.id, count: -1 }));
                  }}
                >
                  <Remove fontSize="small" />
                </IconButton>
              </Box>
              <Typography textAlign={"center"} fontSize={{ xs: 14, md: 13 }}>
                {(item.count * item.price).toLocaleString("ru")} сум
              </Typography>
            </Box>
            <IconButton
              sx={{ fontSize: { xs: 40, md: 30 } }}
              onClick={() => {
                dispatch(removeToCart(item));
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        }
      >
        <ListItemAvatar sx={{ display: { xs: "none", md: "block" } }}>
          <Avatar
            sx={{
              boxShadow: 6,
              width: "60px",
              height: "60px",
              marginRight: 2,
            }}
            src={item.image}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography fontSize={{ xs: 14, md: 12, lg: 16 }}>
              {item.category + " " + item.title}
            </Typography>
          }
          secondary={
            <Typography fontSize={{ xs: 10, md: 12, lg: 14 }}>
              {item.price.toLocaleString("ru")} сум
            </Typography>
          }
        />
      </ListItem>
      <Divider />
    </Box>
  );
}
