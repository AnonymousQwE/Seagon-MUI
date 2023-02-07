import { Shop, ShoppingCart } from "@mui/icons-material";
import { Box, Fab, Grid } from "@mui/material";
import { useState } from "react";

import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";

export default function MainPage() {
  const [open, setOpen] = useState(false);
  const { products, category } = useSelector((state) => state.products);

  return (
    <Grid sx={{ height: window.innerHeight - 64 }} container>
      <Grid
        sx={{ height: window.innerHeight - 64, overflow: "hidden" }}
        display={{ md: "block", xs: open ? "block" : "none" }}
        item
        xs={12}
        md={5}
        xl={4}
      >
        <Sidebar setOpen={setOpen} />
      </Grid>
      <Grid
        item
        sx={{
          display: open ? "none" : "block",
          maxHeight: window.innerHeight - 64,
          overflow: "scroll",
          background: "#534000",
        }}
        xs={12}
        md={7}
        xl={8}
      >
        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            gap: 1,
            marginTop: 5,
            marginX: 2,
          }}
        >
          {products.map((prod) => (
            <ProductCard
              key={"prod" + prod.id}
              category={category}
              product={prod}
            />
          ))}
        </Box>
        <Fab
          sx={{
            display: { xs: open ? "none" : "flex", md: "none" },
            position: "absolute",
            right: 20,
            bottom: 20,
          }}
          onClick={() => {
            setOpen(!open);
          }}
          variant="regular"
          color="primary"
          aria-label="cart"
        >
          <ShoppingCart />
        </Fab>
      </Grid>
    </Grid>
  );
}
