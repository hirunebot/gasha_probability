import React, { useCallback } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { useValidation } from "../../hooks/useValidation";
import { FieldError } from "./ErrorMessage";

interface ValidatedNumberFieldProps {
    label: string;
    id: string;
    unit?: string;
    state?: string;
    setState?: (value: string) => void;
    value?: string;
    onChange?: (value: string) => void;
    fieldName?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

const getFieldNameFromLabel = (label: string): string => {
    const labelMap: Record<string, string> = {
        "所持石": "stones",
        "ガシャ1回に必要な石": "stonePerPull",
        "目玉の排出率": "pullRate",
        "希望個数": "desiredAmount",
        "ガシャ回数": "pulls",
        "ガシャ1回に付く天井アイテム数": "pityItemsPerPull",
        "交換に必要な天井アイテム数": "pityRequiredItems",
        "現在の天井アイテム数": "currentPityItems",
    };
    return labelMap[label] || label.toLowerCase().replace(/\s+/g, '');
};

export const ValidatedNumberField: React.FC<ValidatedNumberFieldProps> = ({
    label,
    id,
    unit,
    state,
    setState,
    value,
    onChange,
    fieldName,
    placeholder,
    disabled = false,
    required = false,
    className = "",
}) => {
    const currentValue = state !== undefined ? state : (value || "");
    const currentOnChange = setState || onChange;
    const currentFieldName = fieldName || getFieldNameFromLabel(label);
    
    const { validateField, getFieldError } = useValidation();
    const error = getFieldError(currentFieldName);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value;
            
            const result = Math.abs(Number(newValue)).toString();
            const finalValue = result === "NaN" ? "" : result;
            
            currentOnChange?.(finalValue);

            if (finalValue.trim()) {
                validateField(currentFieldName, finalValue);
            }
        },
        [currentOnChange, currentFieldName, validateField]
    );

    const handleBlur = useCallback(() => {
        validateField(currentFieldName, currentValue);
    }, [currentFieldName, currentValue, validateField]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        const invalidKeys = ["e", "E", "-", "+"];
        if (invalidKeys.includes(event.key) || (currentFieldName !== "pullRate" && event.key === ".")) {
            event.preventDefault();
        }
    }, [currentFieldName]);

    return (
        <div className="flex flex-col">
            <div className="pb-1 text-sm text-slate-600 font-medium">{label}</div>
            <TextField
                id={id}
                value={currentValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                error={!!error}
                type="number"
                InputProps={{
                    inputProps: {
                        min: 0,
                        step: currentFieldName === "pullRate" ? 0.001 : 1,
                    },
                    endAdornment: unit ? (
                        <InputAdornment position="end">{unit}</InputAdornment>
                    ) : undefined,
                }}
                variant="outlined"
                size="medium"
                fullWidth
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: "rgb(14 165 233)",
                        },
                        "&.Mui-error": {
                            "& fieldset": {
                                borderColor: "#ef4444",
                            },
                        },
                    },
                }}
            />
            <FieldError error={error} fieldName={label} />
        </div>
    );
};
