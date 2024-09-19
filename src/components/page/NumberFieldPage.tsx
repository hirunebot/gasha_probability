import React from "react";
import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { CalculationResult } from "../CalculationResult";
import { StoneBaseForm } from "../StoneBaseForm";
import { SummonBaseForm } from "../SummonBaseForm";
import { useAtom } from "jotai";
import { calculateSummonsAtom, calculationModeAtom, desiredAmountAtom, pityItemsFromSummonAtom, requiredPityItemsAtom, stoneForSummonAtom, stonesAtom, summonRateAtom } from "../../stores/atoms";

export interface NumberFieldPagePresenterProps {
    children: React.ReactNode;
}

export const NumberFieldPagePresenter = (props: NumberFieldPagePresenterProps) => {
    return (
        <div className="w-[744px] my-0 mx-auto">
            {props.children}
        </div>
    );
}

export const NumberFieldPage = () => {
    const [stones, setStones] = useAtom(stonesAtom)
    const [stoneForSummon, setStoneForSummon] = useAtom(stoneForSummonAtom)
    const [summonRate, setSummonRate] = useAtom(summonRateAtom)
    const [desiredAmount, setDesiredAmount] = useAtom(desiredAmountAtom)
    const [isPityConsidered, setIsPityConsidered] = useState(false)
    const [pityItemsFromSummon, setPityItemsFromSummon] = useAtom(pityItemsFromSummonAtom)
    const [requiredPityItems, setRequiredPityItems] = useAtom(requiredPityItemsAtom)
    const [calculationMode, setCalculationMode] = useAtom(calculationModeAtom)
    const [summons, calculateSummons] = useAtom(calculateSummonsAtom)

    const considerPity = () => {
        if (isPityConsidered == false) {
            setIsPityConsidered(true)
        } else {
            setIsPityConsidered(false)
            setPityItemsFromSummon('')
            setRequiredPityItems('')
        }
    }
    const changeCalculationMode = (event: SelectChangeEvent) => {
        setStones('');
        setStoneForSummon('');
        calculateSummons('');
        setCalculationMode(event.target.value as string);
    }

    return (
        <NumberFieldPagePresenter>
            <h1 className="px-4 py-5 bg-zinc-300 font-bold border-b-2 border-black">ガチャ確率計算機</h1>
            <div className="px-4 py-5"></div>
            <FormGroup className="px-16">
                <FormControlLabel control={<Checkbox onChange={considerPity} />} label="天井を考慮" />
                <FormControlLabel 
                    control={
                        <Select 
                            onChange={changeCalculationMode}
                            defaultValue={"stoneBase"}
                            id="calculationMode"
                        >
                            <MenuItem value={"stoneBase"}>所持石</MenuItem>
                            <MenuItem value={"summonBase"}>ガチャ回数</MenuItem>
                        </Select>
                    } 
                    label="から計算" 
                    />
            </FormGroup>
            {calculationMode == "stoneBase" ? (
                <StoneBaseForm
                    isPityConsidered={isPityConsidered}
                />
            ) : (
                <SummonBaseForm
                    isPityConsidered={isPityConsidered}
                />
            )}
            <CalculationResult 
                isPityConsidered={isPityConsidered}
                calculationMode={calculationMode}
                summons={Number(summons)}
            />
        </NumberFieldPagePresenter>
    );
}
