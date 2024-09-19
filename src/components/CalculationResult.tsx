import { Box, Stack } from '@mui/material';
import { useAtom } from 'jotai';
import React from 'react';
import { calculationModeAtom, desiredAmountNumAtom, pityItemsFromSummonNumAtom, requiredPityItemsNumAtom, summonRateNumAtom, summonsNumAtom } from '../stores/atoms';

export interface CalculationResultPresenterProps {
    children: React.ReactNode;
}

export const CalculationResultPresenter: React.FC<CalculationResultPresenterProps> = (props) => {
    return (
        <h1 className="text-center py-10">
            <span>{props.children}</span>
        </h1>
    );
}

export interface CalculationResultProps {
    isPityConsidered: boolean;
    calculationMode: string;
    summons: number;
}

export const CalculationResult: React.FC<CalculationResultProps> = (props) => {
    const [desiredAmount, setDesiredAmount] = useAtom(desiredAmountNumAtom);
    const [summonRate, setSummonRate] = useAtom(summonRateNumAtom);
    const [pityItemsFromSummon, setPityItemsFromSummon] = useAtom(pityItemsFromSummonNumAtom);
    const [requiredPityItems, setRequiredPityItems] = useAtom(requiredPityItemsNumAtom);
    const [summons, calculateSummons] = useAtom(summonsNumAtom);
    const [calculationMode, setCalculationMode] = useAtom(calculationModeAtom);

    let pityItems: number = 0
    let hitsFromPity: number = 0
    let desiredNum: number = desiredAmount
    if (props.isPityConsidered && requiredPityItems > 0) {
        pityItems = pityItemsFromSummon * summons
        hitsFromPity = Math.trunc(pityItems / requiredPityItems)
        // 天井の分を引き算
        desiredNum = desiredAmount - hitsFromPity
        if (desiredNum < 0) {
            desiredNum = 0
        }
    }

    const math = require('mathjs')
    const n = summons
    const k = desiredNum
    const p = summonRate / 100
    let probJustN = 0
    if (n >= k) {
        probJustN = math.combinations(n, k) * math.pow(p, k) * math.pow(1 - p, n - k)
        probJustN = Math.round(probJustN * 10000) / 100
    }
    let probAtLeastN = 0
    if (n >= k) {
        for (let i = 0; i < k; i++) {
            probAtLeastN += math.combinations(n, i) * math.pow(p, i) * math.pow(1 - p, n - i)
        }
        probAtLeastN = Math.round((1 - probAtLeastN) * 10000) / 100
    }
    if (desiredNum == 0 && hitsFromPity > 0) {
        // 天井で確定入手
        probJustN = 0
    }
    return (
        <CalculationResultPresenter>
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
                <Stack spacing={2}>
                    {calculationMode === "stoneBase" && <div>回せる回数･･･</div>}
                    {props.isPityConsidered && 
                        <div>
                            <div className="pb-4">天井アイテム数･･･</div>
                            <div>交換できる数･･･</div>
                        </div>
                        }
                    {desiredNum == 0 ? (
                        <div>
                            <div className="mb-4">{desiredNum}個以上出る確率･･･</div>
                            <div>1回も出ない確率･･･</div>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-4">{desiredNum}個以上出る確率･･･</div>
                            <div>ちょうど{desiredNum}個出る確率･･･</div>
                        </div>
                    )}
                </Stack>
                <Stack>
                    {calculationMode === "stoneBase" && 
                        <div className="font-bold text-4xl">{summons}回</div>
                    }
                    {props.isPityConsidered && 
                        <div>
                            <div className="font-bold text-4xl">{pityItems}個</div>
                            <div className="font-bold text-4xl">{hitsFromPity}個</div>
                        </div>
                    }
                    <div className="font-bold text-4xl">{probAtLeastN.toFixed(2)}%</div>
                    <div className="font-bold text-4xl">{probJustN.toFixed(2)}%</div>
                </Stack>
            </Box>
        </CalculationResultPresenter>
    );
}