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
    isPityConsidered: boolean;
    pityItemsFromSummon: number;
    requiredPityItems: number;
    summons: number;
}

export const CalculationResult: React.FC<CalculationResultProps> = (props) => {
    let summonable: number = props.summons
    if (props.stones > 0 && props.stoneForSummon > 0) {
        summonable = Math.trunc(props.stones / props.stoneForSummon)
    }
    let pityItems: number = 0
    let hitsFromPity: number = 0
    let desiredNum: number = props.desiredNum
    if (props.isPityConsidered && props.requiredPityItems > 0) {
        pityItems = props.pityItemsFromSummon * summonable
        hitsFromPity = Math.trunc(pityItems / props.requiredPityItems)
        desiredNum = props.desiredNum - hitsFromPity
        if (desiredNum < 0) {
            desiredNum = 0
        }
    }

    const math = require('mathjs')
    const n = summonable
    const k = desiredNum
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
                    <div>回せる回数･･･</div>
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
                    <div className="font-bold text-4xl">{summonable}回</div>
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