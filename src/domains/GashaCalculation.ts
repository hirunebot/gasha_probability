import {
    Result,
    Stone,
    Rate,
    Count,
    Percentage,
    ok,
    err,
} from "../types/common";
import {
    GashaParameters,
    CalculationResult,
    PityInfo,
    ValidatedInput,
} from "../types/gasha";

const mathUtils = {
    combinations: (n: number, r: number): number => {
        if (r > n || r < 0) return 0;
        if (r === 0 || r === n) return 1;

        let result = 1;
        for (let i = 0; i < Math.min(r, n - r); i++) {
            result = (result * (n - i)) / (i + 1);
        }
        return result;
    },

    pow: (base: number, exponent: number): number => {
        return Math.pow(base, exponent);
    },

    roundToDecimalPlaces: (value: number, places: number): number => {
        const multiplier = Math.pow(10, places);
        return Math.round(value * multiplier) / multiplier;
    },
};

const calculatePityInfo = (
    pulls: Count,
    itemsPerPull: Count,
    requiredItems: Count,
    currentPityItems: Count = 0 as Count
): PityInfo => {
    const totalPityItems = (pulls * itemsPerPull) as Count;
    const allPityItems = (totalPityItems + currentPityItems) as Count;
    const guaranteedHits = Math.trunc(allPityItems / requiredItems) as Count;
    const currentPityHits = Math.trunc(currentPityItems / requiredItems) as Count;

    return {
        totalPityItems,
        guaranteedHits,
        currentPityHits,
    };
};

const calculateBinomialProbability = (
    n: number,
    k: number,
    p: number
): number => {
    if (n < 0 || k < 0 || k > n || p < 0 || p > 1) {
        return 0;
    }

    const combination = mathUtils.combinations(n, k);
    const successProb = mathUtils.pow(p, k);
    const failureProb = mathUtils.pow(1 - p, n - k);

    return combination * successProb * failureProb;
};

export const calculateProbabilityJustN = (
    pulls: Count,
    desiredAmount: Count,
    pullRate: Rate,
    guaranteedHits?: Count
): Result<Percentage> => {
    try {
        const adjustedDesiredAmount = guaranteedHits
            ? Math.max(0, desiredAmount - guaranteedHits)
            : desiredAmount;

        if (
            adjustedDesiredAmount === 0 &&
            guaranteedHits &&
            guaranteedHits > 0
        ) {
            return ok(0 as Percentage);
        }

        if (pulls < adjustedDesiredAmount) {
            return ok(0 as Percentage);
        }

        const gashaProb = pullRate / 100;
        const probability = calculateBinomialProbability(
            pulls,
            adjustedDesiredAmount,
            gashaProb
        );

        const roundedProb = mathUtils.roundToDecimalPlaces(
            probability * 100,
            2
        );
        return ok(roundedProb as Percentage);
    } catch (error) {
        return err(
            `確率計算でエラーが発生しました: ${error instanceof Error ? error.message : "不明なエラー"}`
        );
    }
};

export const calculateProbabilityAtLeastN = (
    pulls: Count,
    desiredAmount: Count,
    pullRate: Rate,
    guaranteedHits?: Count
): Result<Percentage> => {
    try {
        const adjustedDesiredAmount = guaranteedHits
            ? Math.max(0, desiredAmount - guaranteedHits)
            : desiredAmount;

        if (
            adjustedDesiredAmount === 0 &&
            guaranteedHits &&
            guaranteedHits > 0
        ) {
            return ok(100 as Percentage);
        }

        if (pulls < adjustedDesiredAmount) {
            return ok(0 as Percentage);
        }

        const gashaProb = pullRate / 100;
        let cumulativeProb = 0;

        for (let i = 0; i < adjustedDesiredAmount; i++) {
            cumulativeProb += calculateBinomialProbability(
                pulls,
                i,
                gashaProb
            );
        }

        const probability = 1 - cumulativeProb;
        const roundedProb = mathUtils.roundToDecimalPlaces(
            probability * 100,
            2
        );

        return ok(roundedProb as Percentage);
    } catch (error) {
        return err(
            `確率計算でエラーが発生しました: ${error instanceof Error ? error.message : "不明なエラー"}`
        );
    }
};

export const calculatePullsFromStones = (
    stones: Stone,
    stonePerPull: Stone
): Result<Count> => {
    if (stonePerPull === 0) {
        return err("ガシャ1回に必要な石の数が0です");
    }

    const pulls = Math.trunc(stones / stonePerPull);
    return ok(pulls as Count);
};

export const calculateSummonsFromStones = calculatePullsFromStones;

export const calculateGashaProbability = (
    validatedInput: ValidatedInput
): Result<CalculationResult> => {
    try {
        let pulls: Count;

        if (validatedInput.calculationMode === "stoneBase") {
            const pullsResult = calculatePullsFromStones(
                validatedInput.stones,
                validatedInput.stonePerPull
            );
            if (!pullsResult.ok) {
                return pullsResult;
            }
            pulls = pullsResult.value;
        } else {
            if (!validatedInput.pulls) {
                return err("pullBaseモードではガシャ回数が必要です");
            }
            pulls = validatedInput.pulls;
        }

        let pityInfo: PityInfo | undefined;
        let guaranteedHits: Count | undefined;

        if (validatedInput.pityConfig) {
            pityInfo = calculatePityInfo(
                pulls,
                validatedInput.pityConfig.itemsPerPull,
                validatedInput.pityConfig.requiredItems,
                validatedInput.pityConfig.currentPityItems || (0 as Count)
            );
            guaranteedHits = pityInfo.guaranteedHits;
        }

        const probJustNResult = calculateProbabilityJustN(
            pulls,
            validatedInput.desiredAmount,
            validatedInput.pullRate,
            guaranteedHits
        );

        const probAtLeastNResult = calculateProbabilityAtLeastN(
            pulls,
            validatedInput.desiredAmount,
            validatedInput.pullRate,
            guaranteedHits
        );

        if (!probJustNResult.ok) {
            return probJustNResult;
        }

        if (!probAtLeastNResult.ok) {
            return probAtLeastNResult;
        }

        const result: CalculationResult = {
            pulls,
            probJustN: probJustNResult.value,
            probAtLeastN: probAtLeastNResult.value,
            pityInfo,
        };

        return ok(result);
    } catch (error) {
        return err(
            `計算処理でエラーが発生しました: ${error instanceof Error ? error.message : "不明なエラー"}`
        );
    }
};

export const testUtils = {
    mathUtils,
    calculatePityInfo,
    calculateBinomialProbability,
};
