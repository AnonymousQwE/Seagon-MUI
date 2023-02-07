import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { ProductionQuantityLimits } from "@mui/icons-material";

export default function ProductCard({ product, category }) {
  const dispatch = useDispatch();
  return (
    <Card
      onClick={() => {
        const prod = {
          count: 1,
          ...product,
          category: category.find((cat) => cat.id == product.category).title,
        };

        dispatch(addToCart(prod));
      }}
      sx={{ background: "gray", maxWidth: 240 }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="p" component="div">
            {category.find((cat) => cat.id == product.category).title +
              " " +
              product.title}
          </Typography>
          <Typography variant="body">
            {product.price.toLocaleString("ru") + " сум"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
