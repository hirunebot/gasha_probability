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
    state: string
    setState: (value: string) => void;
} 

export const NumberField: React.FC<NumberFieldProps> = (props) => {
    const id = "outlined-basic" + props.id
    const onChangeHandle = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const result = Math.abs(Number(event.target.value)).toString();
        if (result === "NaN") {
            props.setState("")
        } else {
            props.setState(result)
        }
    }
    return (
        <NumberFieldPresenter>
            <div className="py-1">{props.label}</div>
            <TextField 
                id={id}
                type="number"
                value={props.state}
                variant="outlined"
                onKeyDown={(event) => {
                    if (event.key === "e" || event.key === "E" || event.key === "-" || event.key === "+") {
                        event.preventDefault()
                    }
                }}
                InputProps={{
                    endAdornment: <InputAdornment position="end">{props.unit}</InputAdornment>,
                }}
                onChange={onChangeHandle}
            />
        </NumberFieldPresenter>
    );
}
