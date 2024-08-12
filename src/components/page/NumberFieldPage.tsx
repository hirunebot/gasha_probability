import React from "react";
import { useState } from "react";
import { NumberField } from "../NumberField";
import { Box } from "@mui/material";
import { CalculationResult } from "../Result";

export interface NumberFieldPagePresenterProps {
    children: React.ReactNode;
}

export const NumberFieldPagePresenter = (props: NumberFieldPagePresenterProps) => {
    return (
        <div>
            {props.children}
        </div>
    );
}

export const NumberFieldPage = () => {
    const [stones, setStones] = useState(0)
    const [stoneForSummon, setStoneForSummon] = useState(0)
    const [summonRate, setSummonRate] = useState(0)
    const [desiredNum, setDesiredNum] = useState(0)

    return (
        <main>
            <h1 className="px-4 py-5 bg-zinc-300 font-bold">ガシャ確率計算機</h1>
            <div className="px-4 py-5">test</div>
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
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <div>所持石</div>
                    <NumberField id="stones" unit="個" func={setStones} />
                    <div>目玉の排出率</div>
                    <NumberField id="summonRate" unit="%" func={setSummonRate} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <div>ガシャ1回に必要な石</div>
                    <NumberField id="stonesForSummon" unit="個" func={setStoneForSummon} />
                    <div>希望個数</div>
                    <NumberField id="desiredNum" unit="個" func={setDesiredNum} />
                </Box>
            </Box>
            <div className="px-4">
                <button>計算</button>
            </div>
            <CalculationResult stones={stones} stoneForSummon={stoneForSummon} desiredNum={desiredNum} summonRate={summonRate} />
    </main>
    );
}
