import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import ListRow from "./ListRow";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

export default function AdminProductList() {
  const { products, category } = useSelector((state) => state.products);

  const getCurrentCat = (id) => {
    const newCat = category.find((item) => {
      return item.id == id;
    });
    return newCat.title;
  };

  return (
    <TableContainer sx={{ height: window.innerHeight - 120 }} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Storage</TableCell>
            <TableCell align="right">Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <ListRow
              key={row.id}
              row={{
                ...row,
                category: getCurrentCat(row.category),
                categoryId: row.category,
              }}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
