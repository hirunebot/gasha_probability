import React from 'react';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useAtom } from 'jotai';
import { summonsNumAtom } from '../stores/atoms';

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
    const [summons] = useAtom(summonsNumAtom);

    const onChangeHandle = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const result = Math.abs(Number(event.target.value)).toString();
        validatedSetState(result)
    }

    const validatedSetState = (result: string) => {
        if (result === "NaN") {
            props.setState("")
        } else {
            props.setState(result)
        }
        if (props.label == "所持石") {
            limitToMaxN(result, 100000);
            intValidation(result);
        } else if (props.label == "ガチャ1回に必要な石" || props.label == "ガチャ回数") {
            limitToMaxN(result, 10000);
            intValidation(result);
        } else if (props.label == "目玉の排出率") {
            limitToMinN(result, 0.01);
            limitToMaxN(result, 100);
        } else if (props.label == "希望個数") {
            limitToMaxN(result, 50);
            intValidation(result);
        } else if (props.label == "ガチャ1回に付く天井アイテム数") {
            limitToMaxN(result, 100);
            intValidation(result);
        } else if (props.label == "交換に必要な天井アイテム数") {
            limitToMaxN(result, 1000000);
            intValidation(result);
        }
    }

    const limitToMaxN = (result: string, maxN: number) => {
        if (Number(result) > maxN) {
            props.setState(result.slice(0, -1))
        }
    }

    const intValidation = (result: string) => {
        if (result.includes(".")) {
            props.setState(result.slice(0, -1))
        }
    }

    const limitToMinN = (result: string, minN: number) => {
        if (Number(result) < minN) {
            props.setState(result.slice(0, -1))
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
                    const invalidKeys = ["e", "E", "-", "+"];
                    if (invalidKeys.includes(event.key) || (props.label !== "目玉の排出率" && event.key === ".")) {
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
