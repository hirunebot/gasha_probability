import React from "react";
import { useState } from "react";
import { NumberField } from "../NumberField";
import { Box, Checkbox, FormControlLabel, FormGroup, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { CalculationResult } from "../CalculationResult";

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
    const [stones, setStones] = useState(0)
    const [stoneForSummon, setStoneForSummon] = useState(0)
    const [summonRate, setSummonRate] = useState(0)
    const [desiredNum, setDesiredNum] = useState(1)
    const [isPityConsidered, setIsPityConsidered] = useState(false)
    const [pityItemsFromSummon, setPityItemsFromSummon] = useState(0)
    const [requiredPityItems, setRequiredPityItems] = useState(0)
    const [calculationMode, setCalculationMode] = useState("stoneBase")
    const [summons, setSummons] = useState(0)

    const considerPity = () => {
        if (isPityConsidered == false) {
            setIsPityConsidered(true)
        } else {
            setIsPityConsidered(false)
            setPityItemsFromSummon(0)
            setRequiredPityItems(0)
        }
    }
    const changeMode = (event: SelectChangeEvent) => {
        setStones(0);
        setStoneForSummon(0);
        setSummons(0);
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
                            onChange={changeMode}
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
                <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column', 
                    gap: 1,
                }}
                >
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <NumberField label="所持石" id="stones" unit="個" func={setStones} key={calculationMode} />
                        <NumberField label="ガチャ1回に必要な石" id="stonesForSummon" unit="個" func={setStoneForSummon} key={calculationMode} />
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <NumberField label="目玉の排出率" id="summonRate" unit="%" func={setSummonRate} />
                        <NumberField label="希望個数" id="desiredNum" unit="個" func={setDesiredNum} />
                    </Stack>
                    {isPityConsidered && 
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <NumberField label="ガチャ1回に付く天井アイテム数" id="pityItemsFromSummon" unit="個" func={setPityItemsFromSummon} />
                            <NumberField label="交換に必要な天井アイテム数" id="requiredPityItems" unit="個" func={setRequiredPityItems} />
                        </Stack>
                    }
                </Box>
            ) : (
                <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column', 
                    gap: 1,
                }}
                >
                    <Stack direction="row" spacing={2} justifyContent="center" sx={{position:"relative", right: "131px"}}>
                        <NumberField label="ガチャ回数" id="summons" unit="回" func={setSummons} key={calculationMode} />
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <NumberField label="目玉の排出率" id="summonRate" unit="%" func={setSummonRate} />
                        <NumberField label="希望個数" id="desiredNum" unit="個" func={setDesiredNum} />
                    </Stack>
                    {isPityConsidered && 
                        <Stack direction="row" spacing={2} justifyContent="center">
                            <NumberField label="ガチャ1回に付く天井アイテム数" id="pityItemsFromSummon" unit="個" func={setPityItemsFromSummon} />
                            <NumberField label="交換に必要な天井アイテム数" id="requiredPityItems" unit="個" func={setRequiredPityItems} />
                        </Stack>
                    }
                </Box>
            )}
            <CalculationResult 
                stones={stones} 
                stoneForSummon={stoneForSummon} 
                desiredNum={desiredNum} 
                summonRate={summonRate} 
                isPityConsidered={isPityConsidered}
                pityItemsFromSummon={pityItemsFromSummon}
                requiredPityItems={requiredPityItems}
                summons={summons}
            />
        </NumberFieldPagePresenter>
    );
}
