import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        startIcon={<ArrowBackIosNewIcon />}
      >
        Previous
      </Button>

      <Typography>Page {currentPage} </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        endIcon={<ArrowForwardIosIcon />}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
