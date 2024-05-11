import React from 'react';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

interface NumberFieldProps {
  id: string;
  label: string;
  unit: string;
  func: (value: number) => void;
} 

const NumberField: React.FC<NumberFieldProps> = (props) => {
  const ids = "outlined-number" + props.id
  const [value, setValue] = useState<number>(0)
  return (
    <div className="px-4">
      <span>{props.label}</span>
      <TextField 
        className="m-3" 
        id={ids}
        type="number" 
        variant="outlined" 
        InputProps={{
          endAdornment: <InputAdornment position="end">{props.unit}</InputAdornment>,
        }}
        onChange={(event) => {
          setValue(Number(event.target.value))
          props.func(Number(event.target.value))
        }}
      />
    </div>
  );
  // eが入力できてしまうので、そこの対策をしたい
}

export default NumberField;