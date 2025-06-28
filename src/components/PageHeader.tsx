import React from "react";
import { Button } from "@mui/material";

export interface PageHeaderProps {
    title: string;
    buttonIcon?: React.ReactNode;
    buttonText?: string;
    onButtonClick?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    buttonIcon,
    buttonText,
    onButtonClick,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1"></div>
                    <h1 className="text-3xl font-light text-white text-center tracking-wide flex-1">
                        {title}
                    </h1>
                    <div className="flex-1 flex justify-end">
                        {buttonText && onButtonClick && (
                            <Button
                                onClick={onButtonClick}
                                startIcon={buttonIcon}
                                variant="contained"
                                sx={{
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(255, 255, 255, 0.3)",
                                    },
                                }}
                            >
                                {buttonText}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};