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
        probJustN = Math.round(probJustN * 100000) / 1000
    }
    let probAtLeastN = 0
    if (n >= k) {
        for (let i = 0; i < k; i++) {
            probAtLeastN += math.combinations(n, i) * math.pow(p, i) * math.pow(1 - p, n - i)
        }
        probAtLeastN = Math.round((1 - probAtLeastN) * 100000) / 1000
    }
    return (
        <CalculationResultPresenter>
            {summonable}連可
            <br />{props.desiredNum}個以上出る確率は{probAtLeastN}%
            <br />ちょうど{props.desiredNum}回出る確率は{probJustN}%
        </CalculationResultPresenter>
    );
}