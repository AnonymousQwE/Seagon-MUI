import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Delete } from "@mui/icons-material";
import { removeToCart } from "../../slices/cartSlice";
import { Box } from "@mui/system";
import { Divider, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <Box>
      <ListItem
        secondaryAction={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography fontSize={{ xs: 13, md: 15 }}>
              {(item.count * item.price).toLocaleString("ru")} сум
            </Typography>
            <IconButton
              onClick={() => {
                dispatch(removeToCart(item));
              }}
            >
              <Delete sx={{ fontSize: { xs: 40, md: 30 } }} />
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
            <Typography fontSize={{ xs: 12, md: 12, lg: 17 }}>
              {item.count.toLocaleString("ru")} шт |
              {item.price.toLocaleString("ru")} сум
            </Typography>
          }
        />
      </ListItem>
      <Divider />
    </Box>
  );
}
