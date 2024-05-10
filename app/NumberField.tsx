import React from 'react';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

interface NumberFieldProps {
  id: string;
  label: string;
  unit: string;
}

const NumberField: React.FC<NumberFieldProps> = ({ id,label,unit }) => {
  const ids = "outlined-number" + {id}
  const [value, setValue] = useState<number>(0)
  return (
    <div className="px-4">
      <span>{label}</span>
      <TextField 
        className="m-3" 
        id={ids}
        type="number" 
        variant="outlined" 
        InputProps={{
          endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
        }}
        onChange={(event) => setValue(Number(event.target.value))}
      />
      <p>{value}</p>
    </div>
  );
}

export default NumberField;