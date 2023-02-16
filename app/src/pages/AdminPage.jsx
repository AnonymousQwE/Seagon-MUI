import React from "react";
import ProductList from "../components/AdminProductList";
import BottomNav from "../components/AdminProductList/BottomNav";

export default function AdminPage() {
  return (
    <>
      <ProductList />
      <BottomNav />
    </>
  );
}
