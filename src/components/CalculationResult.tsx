import { Box, Stack } from '@mui/material';
import React from 'react';
import { useState } from "react";

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
    stones: number;
    stoneForSummon: number;
    desiredNum: number;
    summonRate: number;
}

export const CalculationResult: React.FC<CalculationResultProps> = (props) => {
    let summonable: number = 0
    if (props.stones > 0 && props.stoneForSummon > 0) {
        summonable = Math.trunc(props.stones / props.stoneForSummon)
    }

    const math = require('mathjs')
    const n = summonable
    const k = props.desiredNum
    const p = props.summonRate / 100
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
                    <div>回せる回数･･･</div>
                    
                    {props.desiredNum == 0 ? (
                        <div>1回も出ない確率･･･</div>
                    ) : (
                        <div>
                            <div className="mb-4">{props.desiredNum}個以上出る確率･･･</div>
                            <div>ちょうど{props.desiredNum}個出る確率･･･</div>
                        </div>
                    )}
                </Stack>
                <Stack>
                    <div className="font-bold text-4xl">{summonable}回</div>
                    {props.desiredNum == 0 ? (
                        null
                    ) : (
                        <div className="font-bold text-4xl">{probAtLeastN.toFixed(2)}%</div>
                    )}
                    <div className="font-bold text-4xl">{probJustN.toFixed(2)}%</div>
                </Stack>
            </Box>
        </CalculationResultPresenter>
    );
}