import { Button } from "@mui/material";
import type React from "react";

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
            <div className="bg-blue-500 px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="hidden sm:flex flex-1"></div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-white text-center tracking-wide flex-1 sm:flex-1 min-w-0">
                        <span className="block truncate">{title}</span>
                    </h1>
                    <div className="hidden sm:flex flex-1 justify-end">
                        {buttonText && onButtonClick && (
                            <Button
                                onClick={onButtonClick}
                                startIcon={buttonIcon}
                                variant="contained"
                                size="small"
                                sx={{
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                                    },
                                }}
                            >
                                <span className="hidden md:inline">{buttonText}</span>
                                <span className="md:hidden">{buttonIcon}</span>
                            </Button>
                        )}
                    </div>
                    {buttonText && onButtonClick && (
                        <div className="sm:hidden ml-2">
                            <Button
                                onClick={onButtonClick}
                                variant="contained"
                                size="small"
                                sx={{
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                                    },
                                    minWidth: "auto",
                                    padding: "6px 8px",
                                }}
                            >
                                {buttonIcon}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
