import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
  TableHead,
} from '@mui/material';
import FilterInput from './components/FilterInput/FilterInput';
import ProductModal from './components/ProductModal/ProductModal';
import Pagination from './components/Pagination/Pagination';
import { fetchProductsList, fetchProductById } from './apiCalls';

const ProductsList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageQuery = parseInt(searchParams.get('page') || '1', 10);
  const idQuery = searchParams.get('id') || '';

  const [currentPage, setCurrentPage] = useState<number>(pageQuery);
  const [filter, setFilter] = useState<string>(idQuery);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null); // Reset error state before each API call
      try {
        if (filter) {
          const data = await fetchProductById(filter);
          if (data.data) {
            setAllProducts([data.data]);
            setTotalPages(1);
          } else {
            setError('No product found with the specified ID.');
          }
        } else {
          const itemsOffset = (currentPage - 1) * 5;
          const virtualCurrentPage = Math.floor(itemsOffset / 6) + 1;
          const pageOffset = itemsOffset % 6;

          const apiResponse = await fetchProductsList(virtualCurrentPage);
          let itemsToDisplay = apiResponse.data.slice(pageOffset, pageOffset + 5);

          if (itemsToDisplay.length < 5 && apiResponse.total_pages > virtualCurrentPage) {
            const nextPageResponse = await fetchProductsList(virtualCurrentPage + 1);
            itemsToDisplay = itemsToDisplay.concat(nextPageResponse.data.slice(0, 5 - itemsToDisplay.length));
          }

          setAllProducts(itemsToDisplay);
          const totalItems = apiResponse.total;
          setTotalPages(Math.ceil(totalItems / 5));
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(`Sorry product with this id does not exist`);
        } else {
          setError('An unexpected error occurred.');
        }
      }
    };

    fetchData();
  }, [currentPage, filter]);

  useEffect(() => {
    if (filter) {
      navigate(`/?page=${currentPage}&id=${filter}`, { replace: true });
    } else {
      navigate(`/?page=${currentPage}`, { replace: true });
    }
  }, [currentPage, filter, navigate]);

  const handleFilterChange = (newFilterValue: string) => {
    setFilter(newFilterValue);
  
    if (newFilterValue) {
      const itemId = parseInt(newFilterValue, 10);
      const itemPage = Math.ceil(itemId / 5); // Calculate the page number based on 5 items per page
  
      setCurrentPage(itemPage);
      navigate(`/?page=${itemPage}&id=${itemId}`, { replace: true });
    } else {
      setCurrentPage(1);
      navigate('/?page=1', { replace: true }); // Reset to the first page if the filter is cleared
    }
  };

  return (
    
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2}>
      <FilterInput value={filter} onChange={handleFilterChange} />
      {error ? (
        <Typography color="error" sx={{ margin: '20px 0', textAlign: 'center' }}>{error}</Typography>
      ) : (
        <Box width="100%" maxWidth="800px"> 
          <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
  <Table>
    <TableHead>
      <TableRow sx={{ '& .MuiTableCell-head': { fontWeight: 'bold', backgroundColor: 'primary.main', color: 'primary.contrastText' } }}>
        <TableCell>ID</TableCell><TableCell>Name</TableCell><TableCell>Year</TableCell><TableCell>Color</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {allProducts.map((product) => (
        <TableRow key={product.id} sx={{ '&:hover': { backgroundColor: 'action.hover', cursor: 'pointer' } }} onClick={() => setSelectedProduct(product)}>
          <TableCell>{product.id}</TableCell><TableCell>{product.name}</TableCell><TableCell>{product.year}</TableCell><TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ bgcolor: product.color, width: 16, height: 16, borderRadius: '50%', mr: 1 }} />
              {product.color}
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
          <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={setCurrentPage} />
        </Box>
      )}
      {selectedProduct && <ProductModal product={selectedProduct} handleClose={() => setSelectedProduct(null)} />}
    </Box>
  );
};

export default ProductsList;
