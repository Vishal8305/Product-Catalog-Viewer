import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
  styled
} from '@mui/material';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#f0f0f0' : '#333',
  color: theme.palette.text.primary,
  fontWeight: 'bold',
  fontSize: '16px',
}));


const ProductDetails = ({ product, setSelectedProduct }) => {
  return (
    <div>
      <Typography variant="h4">{product.title}</Typography>
      <img
        src={product.images[0]}
        alt={product.title}
        style={{ width: 200, height: 200, marginBottom: 10 }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Sr No.</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Discount</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Rating</StyledTableCell>
              <StyledTableCell align="center">Return Policy</StyledTableCell>
              <StyledTableCell align="center">Stock</StyledTableCell>
              <StyledTableCell align="center">Warranty</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={product.name}>
              <TableCell align="center">{product.id}</TableCell>
              <TableCell align="center">{product.category}</TableCell>
              <TableCell align="center">{product.discountPercentage}%</TableCell>
              <TableCell align="center">{product.price} $</TableCell>
              <TableCell align="center">{product.rating}/5</TableCell>
              <TableCell align="center">{product.returnPolicy}</TableCell>
              <TableCell align="center">{product.stock}</TableCell>
              <TableCell align="center">{product.warrantyInformation}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => setSelectedProduct(null)} variant="contained" sx={{ marginTop: '20px' }}>Back</Button>
    </div>
  );
};

export default ProductDetails;
