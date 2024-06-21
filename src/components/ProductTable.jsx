import React, { useEffect, useState } from "react";
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton"; 
import axios from "axios";
import ProductDetails from "./ProductDetails";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f0f0f0",
    color: theme.palette.text.primary,
    fontWeight: "bold",
    fontSize: "16px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
}));

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  console.log(products,'products')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logic for pagination
  const indexOfLastProduct = page * rowsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - rowsPerPage;
  const paginatedProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      {selectedProduct ? (
        <ProductDetails
          product={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      ) : (
        <>
          <Box
            sx={(theme) => ({
              p: "10px 20px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "end",
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
              },
            })}
          >
            <Box
              sx={(theme) => ({
                width: "100%",
                textAlign: "start",
                [theme.breakpoints.down("sm")]: {
                  textAlign: "center",
                },
              })}
            >
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Product Catalog Viewer
              </Typography>
            </Box>

            <TextField
              fullWidth
              sx={{ maxWidth: { sm: "100%", md: "300px" } }}
              size="small"
              id="outlined-basic"
              placeholder="Search Products..."
              variant="outlined"
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell align="center">Sr No.</StyledTableCell>
                  <StyledTableCell align="center">Image</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  // Skeleton loader for table rows
                  Array.from(Array(rowsPerPage)).map((_, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell colSpan={4} align="center">
                        <Skeleton animation="wave" />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  paginatedProducts.map((product, index) => (
                    <StyledTableRow
                      key={product.name}
                      onClick={() => handleRowClick(product)}
                      sx={{ cursor: "pointer" }}
                    >
                      <StyledTableCell align="center">
                        {indexOfFirstProduct + index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          style={{ width: 50, height: 30, borderRadius: "50%" }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">{product.title}</StyledTableCell>
                      <StyledTableCell align="center">{product.price}</StyledTableCell>
                    </StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {!loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Pagination
                count={Math.ceil(filteredProducts.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
              />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default ProductTable;
