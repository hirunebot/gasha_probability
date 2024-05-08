import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

interface NumberFieldProps {
  label: string;
  unit: string;
}

const NumberField: React.FC<NumberFieldProps> = ({ label,unit }) => {
  return (
    <div className="px-4">
      <span>{label}</span>
      <TextField 
        className="m-3" 
        id="outlined-number" 
        type="number" 
        variant="outlined" 
        InputProps={{
          endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
        }}
      />
    </div>
  );
}

export default NumberField;