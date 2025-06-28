import { atom } from "jotai";
import { CalculationMode, Stone, Rate, Count } from "../types/common";
import { InputState, ValidatedInput, CalculationResult } from "../types/gasha";
import { calculateGashaProbability } from "../domains/GashaCalculation";
import { validationErrorsAtom } from "../hooks/useValidation";
import {
    validateStones,
    validateStonePerPull,
    validatePullRate,
    validateDesiredAmount,
    validatePulls,
    validatePityItems,
    validateRequiredPityItems,
    validateCurrentPityItems,
} from "../utils/validation";

export const inputStateAtom = atom<InputState>({
    stones: "",
    stonePerPull: "",
    pullRate: "",
    desiredAmount: "1",
    calculationMode: "stoneBase",
    isPityEnabled: false,
    pityItemsPerPull: "",
    pityRequiredItems: "",
    currentPityItems: "0",
    pulls: "",
});

export const stonesAtom = atom(
    (get) => get(inputStateAtom).stones,
    (get, set, value: string) => {
        const currentState = get(inputStateAtom);
        set(inputStateAtom, { ...currentState, stones: value });
    }
);

export const stoneForPullAtom = atom(
    (get) => get(inputStateAtom).stonePerPull,
    (get, set, value: string) => {
        const currentState = get(inputStateAtom);
        set(inputStateAtom, { ...currentState, stonePerPull: value });
    }
);

export const stoneForSummonAtom = stoneForPullAtom;

export const pullRateAtom = atom(
    (get) => get(inputStateAtom).pullRate,
    (get, set, value: string) => {
        const currentState = get(inputStateAtom);
        set(inputStateAtom, { ...currentState, pullRate: value });
    }
);

export const summonRateAtom = pullRateAtom;

export const desiredAmountAtom = atom(
    (get) => get(inputStateAtom).desiredAmount,
    (get, set, value: string) => {
        const currentState = get(inputStateAtom);
        set(inputStateAtom, { ...currentState, desiredAmount: value });
    }
);

export const calculationModeAtom = atom(
    (get) => get(inputStateAtom).calculationMode,
    (get, set, value: CalculationMode) => {
        const currentState = get(inputStateAtom);
        set(inputStateAtom, { ...currentState, calculationMode: value });
    }
);

export const isPityConsideredAtom = atom(
    (get) => get(inputStateAtom).isPityEnabled,
    (get, set, value: boolean) => {
        const currentState = get(inputStateAtom);
        set(inputStateAtom, { ...currentState, isPityEnabled: value });
    }
);

export const pityItemsFromPullAtom = atom(
    (get) => get(inputStateAtom).pityItemsPerPull,
    (get, set, value: string) => {
        const currentState = get(inputStateAtom);
        set(inputStateAtom, { ...currentState, pityItemsPerPull: value });
    }
);

export const pityItemsFromSummonAtom = pityItemsFromPullAtom;

export const requiredPityItemsAtom = atom(
    (get) => get(inputStateAtom).pityRequiredItems,
    (get, set, value: string) => {
        const currentState = get(inputStateAtom);
        set(inputStateAtom, { ...currentState, pityRequiredItems: value });
    }
);

export const currentPityItemsAtom = atom(
    (get) => get(inputStateAtom).currentPityItems,
    (get, set, value: string) => {
        const currentState = get(inputStateAtom);
        set(inputStateAtom, { ...currentState, currentPityItems: value });
    }
);

export const pullsAtom = atom(
    (get) => get(inputStateAtom).pulls,
    (get, set, value: string) => {
        const currentState = get(inputStateAtom);
        set(inputStateAtom, { ...currentState, pulls: value });
    }
);

export const summonsAtom = pullsAtom;

export const validatedInputAtom = atom((get) => {
    const inputState = get(inputStateAtom);

    const stonesResult = validateStones(inputState.stones);
    const stonePerPullResult = validateStonePerPull(
        inputState.stonePerPull
    );
    const pullRateResult = validatePullRate(inputState.pullRate);
    const desiredAmountResult = validateDesiredAmount(inputState.desiredAmount);

    const results = [
        stonesResult,
        stonePerPullResult,
        pullRateResult,
        desiredAmountResult,
    ];

    let pullsResult;
    if (inputState.calculationMode === "pullBase") {
        pullsResult = validatePulls(inputState.pulls);
        results.push(pullsResult);
    }

    let pityItemsResult;
    let requiredPityItemsResult;
    let currentPityItemsResult;
    if (inputState.isPityEnabled) {
        pityItemsResult = validatePityItems(inputState.pityItemsPerPull);
        requiredPityItemsResult = validateRequiredPityItems(
            inputState.pityRequiredItems
        );
        currentPityItemsResult = validateCurrentPityItems(
            inputState.currentPityItems
        );
        results.push(pityItemsResult, requiredPityItemsResult, currentPityItemsResult);
    }

    const failedResult = results.find((result) => !result.ok);
    if (failedResult) {
        return failedResult;
    }

    const validatedInput: ValidatedInput = {
        stones: stonesResult.ok ? stonesResult.value : (0 as Stone),
        stonePerPull: stonePerPullResult.ok
            ? stonePerPullResult.value
            : (0 as Stone),
        pullRate: pullRateResult.ok ? pullRateResult.value : (0 as Rate),
        desiredAmount: desiredAmountResult.ok
            ? desiredAmountResult.value
            : (0 as Count),
        calculationMode: inputState.calculationMode,
    };

    if (inputState.calculationMode === "pullBase" && pullsResult?.ok) {
        validatedInput.pulls = pullsResult.value;
    }

    if (
        inputState.isPityEnabled &&
        pityItemsResult?.ok &&
        requiredPityItemsResult?.ok &&
        currentPityItemsResult?.ok
    ) {
        validatedInput.pityConfig = {
            itemsPerPull: pityItemsResult.value,
            requiredItems: requiredPityItemsResult.value,
            currentPityItems: currentPityItemsResult.value,
        };
    }

    return { ok: true, value: validatedInput };
});

export const calculationResultAtom = atom((get) => {
    const validatedInputResult = get(validatedInputAtom);

    if (!validatedInputResult.ok) {
        return validatedInputResult;
    }

    return calculateGashaProbability(
        validatedInputResult.value as ValidatedInput
    );
});

export const pullsNumAtom = atom((get) => {
    const result = get(calculationResultAtom);
    if (!result.ok) return 0;
    return (result.value as CalculationResult).pulls;
});

export const summonsNumAtom = pullsNumAtom;

export const probJustNAtom = atom((get) => {
    const result = get(calculationResultAtom);
    if (!result.ok) return 0;
    return (result.value as CalculationResult).probJustN;
});

export const probAtLeastNAtom = atom((get) => {
    const result = get(calculationResultAtom);
    if (!result.ok) return 0;
    return (result.value as CalculationResult).probAtLeastN;
});

export const pityItemsAtom = atom((get) => {
    const result = get(calculationResultAtom);
    if (!result.ok) return 0;
    const calcResult = result.value as CalculationResult;
    return calcResult.pityInfo?.totalPityItems || 0;
});

export const hitsFromPityAtom = atom((get) => {
    const result = get(calculationResultAtom);
    if (!result.ok) return 0;
    const calcResult = result.value as CalculationResult;
    return calcResult.pityInfo?.guaranteedHits || 0;
});

export const stonesNumAtom = atom((get) => {
    const stonesStr = get(stonesAtom);
    const result = validateStones(stonesStr);
    return result.ok ? result.value : 0;
});

export const stoneForPullNumAtom = atom((get) => {
    const stoneForPullStr = get(stoneForPullAtom);
    const result = validateStonePerPull(stoneForPullStr);
    return result.ok ? result.value : 0;
});

export const stoneForSummonNumAtom = stoneForPullNumAtom;

export const pullRateNumAtom = atom((get) => {
    const pullRateStr = get(pullRateAtom);
    const result = validatePullRate(pullRateStr);
    return result.ok ? result.value : 0;
});

export const summonRateNumAtom = pullRateNumAtom;

export const desiredAmountNumAtom = atom((get) => {
    const desiredAmountStr = get(desiredAmountAtom);
    const result = validateDesiredAmount(desiredAmountStr);
    return result.ok ? result.value : 0;
});

export const pityItemsFromPullNumAtom = atom((get) => {
    const pityItemsStr = get(pityItemsFromPullAtom);
    const result = validatePityItems(pityItemsStr);
    return result.ok ? result.value : 0;
});

export const pityItemsFromSummonNumAtom = pityItemsFromPullNumAtom;

export const requiredPityItemsNumAtom = atom((get) => {
    const requiredPityItemsStr = get(requiredPityItemsAtom);
    const result = validateRequiredPityItems(requiredPityItemsStr);
    return result.ok ? result.value : 0;
});

export const currentPityItemsNumAtom = atom((get) => {
    const currentPityItemsStr = get(currentPityItemsAtom);
    const result = validateCurrentPityItems(currentPityItemsStr);
    return result.ok ? result.value : 0;
});

export const calculatePullsAtom = atom(
    (get) => {
        const inputState = get(inputStateAtom);
        if (inputState.calculationMode === "stoneBase") {
            const stones = get(stonesNumAtom);
            const stoneForPull = get(stoneForPullNumAtom);
            if (stoneForPull === 0) {
                return "";
            }
            return String(Math.trunc(stones / stoneForPull));
        } else {
            return inputState.pulls;
        }
    },
    (get, set, inputtedPulls: string) => {
        const inputState = get(inputStateAtom);
        if (inputState.calculationMode === "stoneBase") {
            const stones = get(stonesNumAtom);
            const stoneForPull = get(stoneForPullNumAtom);
            if (stoneForPull === 0) {
                set(pullsAtom, "");
            } else {
                set(pullsAtom, String(Math.trunc(stones / stoneForPull)));
            }
        } else {
            set(pullsAtom, inputtedPulls);
        }
    }
);

export const calculateSummonsAtom = calculatePullsAtom;

export const hasErrorsAtom = atom((get) => {
    const errors = get(validationErrorsAtom);
    return Object.keys(errors).length > 0;
});

export const errorMessageAtom = atom((get) => {
    const result = get(calculationResultAtom);
    if (!result.ok) {
        return (result as { ok: false; error: string }).error;
    }
    return null;
});
