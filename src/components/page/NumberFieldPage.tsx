import React from "react";
import { useState } from "react";
import { NumberField } from "../NumberField";
import { Box, Checkbox, FormControlLabel, FormGroup, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { CalculationResult } from "../CalculationResult";
import { StoneBaseForm } from "../StoneBaseForm";
import { SummonBaseForm } from "../SummonBaseForm";

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
    const [stones, setStones] = useState('')
    const [stoneForSummon, setStoneForSummon] = useState('')
    const [summonRate, setSummonRate] = useState('')
    const [desiredNum, setDesiredNum] = useState('1')
    const [isPityConsidered, setIsPityConsidered] = useState(false)
    const [pityItemsFromSummon, setPityItemsFromSummon] = useState('')
    const [requiredPityItems, setRequiredPityItems] = useState('')
    const [calculationMode, setCalculationMode] = useState("stoneBase")
    const [summons, setSummons] = useState('')

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
        setSummons('');
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
                    stones={stones}
                    stoneForSummon={stoneForSummon}
                    desiredNum={desiredNum}
                    summonRate={summonRate}
                    pityItemsFromSummon={pityItemsFromSummon}
                    requiredPityItems={requiredPityItems}
                    setStones={setStones}
                    setStoneForSummon={setStoneForSummon}
                    setSummonRate={setSummonRate}
                    setDesiredNum={setDesiredNum}
                    isPityConsidered={isPityConsidered}
                    setPityItemsFromSummon={setPityItemsFromSummon}
                    setRequiredPityItems={setRequiredPityItems}
                    calculationMode={calculationMode}
                />
            ) : (
                <SummonBaseForm
                    summons={summons}
                    desiredNum={desiredNum}
                    summonRate={summonRate}
                    pityItemsFromSummon={pityItemsFromSummon}
                    requiredPityItems={requiredPityItems}
                    setSummons={setSummons}
                    setSummonRate={setSummonRate}
                    setDesiredNum={setDesiredNum}
                    isPityConsidered={isPityConsidered}
                    setPityItemsFromSummon={setPityItemsFromSummon}
                    setRequiredPityItems={setRequiredPityItems}
                    calculationMode={calculationMode}
                />
            )}
            <CalculationResult 
                stones={Number(stones)} 
                stoneForSummon={Number(stoneForSummon)} 
                desiredNum={Number(desiredNum)} 
                summonRate={Number(summonRate)} 
                isPityConsidered={isPityConsidered}
                pityItemsFromSummon={Number(pityItemsFromSummon)}
                requiredPityItems={Number(requiredPityItems)}
                calculationMode={calculationMode}
                summons={Number(summons)}
            />
        </NumberFieldPagePresenter>
    );
}
