import React from "react";
import { useState } from "react";
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from "@mui/material";
import { Help } from "@mui/icons-material";
import { CalculationResult, StoneBaseForm, PullBaseForm } from "../normalCalculation";
import { HelpPage } from "./HelpPage";
import { PageHeader } from "../PageHeader";
import { useAtom } from "jotai";
import {
    calculatePullsAtom,
    calculationModeAtom,
    isPityConsideredAtom,
    pityItemsFromPullAtom,
    requiredPityItemsAtom,
    currentPityItemsAtom,
    stoneForPullAtom,
    stonesAtom,
} from "../../stores/atoms";

export interface NumberFieldPagePresenterProps {
    children: React.ReactNode;
}

export const NumberFieldPagePresenter = (
    props: NumberFieldPagePresenterProps
) => {
    return (
        <div className="min-h-screen bg-blue-50">
            <div className="container mx-auto px-4 py-4 pb-12 max-w-4xl">
                {props.children}
            </div>
        </div>
    );
};

export const NumberFieldPage = () => {
    const [showHelp, setShowHelp] = useState(false);
    const [, setStones] = useAtom(stonesAtom);
    const [, setStoneForPull] = useAtom(stoneForPullAtom);
    const [isPityConsidered, setIsPityConsidered] =
        useAtom(isPityConsideredAtom);
    const [, setPityItemsFromPull] = useAtom(pityItemsFromPullAtom);
    const [, setRequiredPityItems] = useAtom(requiredPityItemsAtom);
    const [, setCurrentPityItems] = useAtom(currentPityItemsAtom);
    const [calculationMode, setCalculationMode] = useAtom(calculationModeAtom);
    const [, calculatePulls] = useAtom(calculatePullsAtom);

    const considerPity = () => {
        if (isPityConsidered == false) {
            setIsPityConsidered(true);
        } else {
            setIsPityConsidered(false);
            setPityItemsFromPull("");
            setRequiredPityItems("");
            setCurrentPityItems("0");
        }
    };
    const changeCalculationMode = (event: SelectChangeEvent) => {
        setStones("");
        setStoneForPull("");
        calculatePulls("");
        setCalculationMode(event.target.value as "stoneBase" | "pullBase");
    };

    if (showHelp) {
        return <HelpPage onBack={() => setShowHelp(false)} />;
    }

    return (
        <NumberFieldPagePresenter>
            <PageHeader
                title="ガシャ確率計算機"
                buttonIcon={<Help />}
                buttonText="使い方"
                onButtonClick={() => setShowHelp(true)}
            />

            <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-5 p-6">
                <h2 className="text-xl font-light text-slate-700 mb-6">
                    計算設定
                </h2>
                <FormGroup>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <div className="flex items-center">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={considerPity}
                                        sx={{ color: "rgb(14 165 233)" }}
                                    />
                                }
                                label="天井システムを考慮する"
                                className="text-slate-600 text-lg"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-slate-600 font-medium text-lg whitespace-nowrap">
                                計算方法:
                            </span>
                            <Select
                                onChange={changeCalculationMode}
                                defaultValue={"stoneBase"}
                                id="calculationMode"
                                size="medium"
                                className="flex-1"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                            borderColor: "rgb(14 165 233)",
                                        },
                                    },
                                }}
                            >
                                <MenuItem value={"stoneBase"}>
                                    所持石から計算
                                </MenuItem>
                                <MenuItem value={"pullBase"}>
                                    ガシャ回数から計算
                                </MenuItem>
                            </Select>
                        </div>
                    </div>
                </FormGroup>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-blue-100 mb-5 p-6">
                <h2 className="text-xl font-light text-slate-700 mb-6">
                    入力パラメータ
                </h2>
                {calculationMode === "stoneBase" ? (
                    <StoneBaseForm />
                ) : (
                    <PullBaseForm />
                )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-8">
                <h2 className="text-xl font-light text-slate-700 mb-6">
                    計算結果
                </h2>
                <CalculationResult />
            </div>
        </NumberFieldPagePresenter>
    );
};
