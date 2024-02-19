import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { ProductItem } from '../../types/ApiResponseProducts'; 

interface ProductModalProps {
  product: ProductItem | null;
  handleClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, handleClose }) => {
  return (
    <Modal open={Boolean(product)} onClose={handleClose} aria-labelledby="product-modal-title" aria-describedby="product-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 }, 
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflow: 'auto', 
          maxHeight: '90vh', 
        }}
      >
        <Typography id="product-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Product Details
        </Typography>
        {product && (
          <Box id="product-modal-description">
            <Typography sx={{ mt: 2 }}>ID: {product.id}</Typography>
            <Typography sx={{ mt: 1 }}>Name: {product.name}</Typography>
            <Typography sx={{ mt: 1 }}>Year: {product.year}</Typography>
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 20, height: 20, bgcolor: product.color, marginRight: 1, borderRadius: '4px' }} />
              <Typography>Color: {product.color}</Typography>
            </Box>
            <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default ProductModal;
