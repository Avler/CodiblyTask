import React from 'react';
import { TextField } from '@mui/material';

interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ value, onChange }) => {
  return (
    <TextField
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))} 
      placeholder="Filter by ID"
      variant="outlined"
      margin="normal"
      label="Product ID Filter"
      InputLabelProps={{
        shrink: true,
      }}
      sx={{
        marginBottom: 2,
      }}
    />
  );
};

export default FilterInput;
