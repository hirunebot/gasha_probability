import { Alert, AlertTitle } from "@mui/material";
import type React from "react";

interface ErrorMessageProps {
    error: string;
    severity?: "error" | "warning" | "info";
    title?: string;
    className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
    error,
    severity = "error",
    title,
    className = "",
}) => {
    return (
        <Alert severity={severity} className={`${className} my-2`}>
            {title && <AlertTitle>{title}</AlertTitle>}
            {error}
        </Alert>
    );
};

interface FieldErrorProps {
    error?: string;
    fieldName: string;
}

export const FieldError: React.FC<FieldErrorProps> = ({ error, fieldName }) => {
    if (!error) return null;

    return (
        <div className="text-red-600 text-sm mt-1" role="alert" aria-label={`${fieldName}のエラー`}>
            {error}
        </div>
    );
};
