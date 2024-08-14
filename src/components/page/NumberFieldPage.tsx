import React from "react";
import { useState } from "react";
import { NumberField } from "../NumberField";
import { Box, Stack } from "@mui/material";
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

    return (
        <NumberFieldPagePresenter>
            <h1 className="px-4 py-5 bg-zinc-300 font-bold border-b-2 border-black">ガシャ確率計算機</h1>
            <div className="px-4 py-5"></div>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'row', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Stack spacing={1}>
                    <div>所持石</div>
                    <NumberField id="stones" unit="個" func={setStones} />
                    <div>目玉の排出率</div>
                    <NumberField id="summonRate" unit="%" func={setSummonRate} />
                </Stack>
                <Stack spacing={1}>
                    <div>ガシャ1回に必要な石</div>
                    <NumberField id="stonesForSummon" unit="個" func={setStoneForSummon} />
                    <div>希望個数</div>
                    <NumberField id="desiredNum" unit="個" func={setDesiredNum} />
                </Stack>
            </Box>
            <CalculationResult 
                stones={stones} 
                stoneForSummon={stoneForSummon} 
                desiredNum={desiredNum} 
                summonRate={summonRate} 
            />
        </NumberFieldPagePresenter>
    );
}
