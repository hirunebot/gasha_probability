import React from 'react';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export interface NumberFieldPresenterProps {
    children: React.ReactNode;
}

export const NumberFieldPresenter: React.FC<NumberFieldPresenterProps> = (props) => {
    return (
        <div>
            <span>{props.children}</span>
        </div>
    );
}

export interface NumberFieldProps {
    label: string;
    id: string;
    unit: string;
    func: (value: number) => void;
} 

export const NumberField: React.FC<NumberFieldProps> = (props) => {
    const ids = "outlined-number" + props.id
    return (
        <NumberFieldPresenter>
            <div className="py-1">{props.label}</div>
            <TextField 
                id={ids}
                type="number" 
                variant="outlined"
                onKeyDown={(event) => {
                    if (event.key === "e" || event.key === "E" || event.key === "-" || event.key === "+") {
                        event.preventDefault()
                    }
                }}
                InputProps={{
                    endAdornment: <InputAdornment position="end">{props.unit}</InputAdornment>,
                }}
                onChange={(event) => {
                    props.func(Number(event.target.value))
                }}
            />
        </NumberFieldPresenter>
    );
}
