import React from "react";
import { useState } from "react";
import { NumberField } from "../NumberField";
import { Box, Checkbox, FormControlLabel, FormGroup, Stack } from "@mui/material";
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

    const considerPity = () => {
        if (isPityConsidered == false) {
            setIsPityConsidered(true)
        } else {
            setIsPityConsidered(false)
            setPityItemsFromSummon(0)
            setRequiredPityItems(0)
        }
    }

    return (
        <NumberFieldPagePresenter>
            <h1 className="px-4 py-5 bg-zinc-300 font-bold border-b-2 border-black">ガチャ確率計算機</h1>
            <div className="px-4 py-5"></div>
            <FormGroup className="px-16">
                <FormControlLabel control={<Checkbox onChange={considerPity} />} label="天井を考慮" />
            </FormGroup>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'row', 
                    justifyContent: 'center', 
                    gap: 2,
                }}
            >
                <Stack spacing={1}>
                    <div>所持石</div>
                    <NumberField id="stones" unit="個" func={setStones} />
                    <div>目玉の排出率</div>
                    <NumberField id="summonRate" unit="%" func={setSummonRate} />
                    {isPityConsidered && 
                        <div>
                            <div className="py-2">ガチャ1回に付く天井アイテム数</div>
                            <NumberField id="pityItemsFromSummon" unit="個" func={setPityItemsFromSummon} />
                        </div>
                    }
                </Stack>
                <Stack spacing={1}>
                    <div>ガチャ1回に必要な石</div>
                    <NumberField id="stonesForSummon" unit="個" func={setStoneForSummon} />
                    <div>希望個数</div>
                    <NumberField id="desiredNum" unit="個" func={setDesiredNum} />
                    {isPityConsidered && 
                        <div>
                            <div className="py-2">交換に必要な天井アイテム数</div>
                            <NumberField id="requiredPityItems" unit="個" func={setRequiredPityItems} />
                        </div>
                    }
                </Stack>
            </Box>
            <CalculationResult 
                stones={stones} 
                stoneForSummon={stoneForSummon} 
                desiredNum={desiredNum} 
                summonRate={summonRate} 
                isPityConsidered={isPityConsidered}
                pityItemsFromSummon={pityItemsFromSummon}
                requiredPityItems={requiredPityItems}
            />
        </NumberFieldPagePresenter>
    );
}
