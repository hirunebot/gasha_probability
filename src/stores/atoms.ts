import { atom } from "jotai";

export const stonesAtom = atom("");
export const stoneForSummonAtom = atom("");
export const desiredAmountAtom = atom("1");
export const summonRateAtom = atom("");
export const isPityConsideredAtom = atom(false);
export const pityItemsFromSummonAtom = atom("");
export const requiredPityItemsAtom = atom("");
export const calculationModeAtom = atom("stoneBase");

export const stonesNumAtom = atom((get) => Number(get(stonesAtom)));
export const stoneForSummonNumAtom = atom((get) => Number(get(stoneForSummonAtom)));
export const pityItemsAtom = atom(
    (get) => {
        const pityItemsFromSummon = get(pityItemsFromSummonNumAtom);
        const summons = get(summonsNumAtom);
        const pityItems = pityItemsFromSummon * summons;
        return pityItems;
    },
);
export const hitsFromPityAtom = atom(
    (get) => {
        const requiredPityItems = get(requiredPityItemsNumAtom);
        if (requiredPityItems === 0) {
            return 0;
        } else {
            const pityItems = get(pityItemsAtom);
            const requiredPityItems = get(requiredPityItemsNumAtom);
            const hitsFromPity = Math.trunc(pityItems / requiredPityItems);
            return hitsFromPity;
        }
    },
);
export const desiredAmountNumAtom = atom(
    (get) => {
        const isPityConsidered = get(isPityConsideredAtom);
        const requiredPityItems = get(requiredPityItemsNumAtom);
        if (isPityConsidered && requiredPityItems > 0) {
            const desiredAmount = Number(get(desiredAmountAtom));
            const hitsFromPity = get(hitsFromPityAtom);
            // 天井分を引き算
            let desiredAmountWithPity = desiredAmount - hitsFromPity;
            if (desiredAmountWithPity < 0) {
                desiredAmountWithPity = 0;
            }
            return desiredAmountWithPity;
        } else {
            return Number(get(desiredAmountAtom));
        }
    },
);
export const summonRateNumAtom = atom((get) => Number(get(summonRateAtom)));
export const pityItemsFromSummonNumAtom = atom((get) => Number(get(pityItemsFromSummonAtom)));
export const requiredPityItemsNumAtom = atom((get) => Number(get(requiredPityItemsAtom)));

export const summonsAtom = atom("");
export const calculateSummonsAtom = atom(
    (get) => {
        const calculationMode = get(calculationModeAtom);
        if (calculationMode === "stoneBase") {
            const stones = get(stonesNumAtom);
            const stoneForSummon = get(stoneForSummonNumAtom);
            if (stoneForSummon === 0) {
                return '';  
            } else {
                return String(Math.trunc(stones / stoneForSummon));
            }
        } else if (calculationMode === "summonBase") {
            return get(summonsAtom);
        }
        return '';
    },
    (get, set, inputtedSummons: string) => {
        const calculationMode = get(calculationModeAtom);
        if (calculationMode === "stoneBase") {
            const stoneForSummon = get(stoneForSummonNumAtom);
            if (stoneForSummon === 0) {
                set(summonsAtom, '');
            } else {
                const stones = get(stonesNumAtom);
                set(summonsAtom, String(Math.trunc(stones / stoneForSummon)));
            }
        } else if (calculationMode === "summonBase") {
            set(summonsAtom, inputtedSummons);
        }
    },
);
export const summonsNumAtom = atom((get) => Number(get(calculateSummonsAtom)));

const math = require('mathjs');
export const probJustNAtom = atom(
    (get) => {
        const desiredAmount = get(desiredAmountNumAtom);
        const summons = get(summonsNumAtom);
        const summonRate = get(summonRateNumAtom);
        const hitsFromPity = get(hitsFromPityAtom);
        const gachaProb = summonRate / 100;
        let probJustN = 0;
        if (summons >= desiredAmount) {
            probJustN = math.combinations(summons, desiredAmount) * math.pow(gachaProb, desiredAmount) * math.pow(1 - gachaProb, summons - desiredAmount);
            // 小数点第二位まで表示
            probJustN = Math.round(probJustN * 10000) / 100;
        }
        if (desiredAmount == 0 && hitsFromPity > 0) {
            // 天井で確定入手
            probJustN = 0;
        }
        return probJustN;
    },
);
export const probAtLeastNAtom = atom(
    (get) => {
        const desiredAmount = get(desiredAmountNumAtom);
        const summons = get(summonsNumAtom);
        const summonRate = get(summonRateNumAtom);
        const gachaProb = summonRate / 100;
        let probAtLeastN = 0;
        if (summons >= desiredAmount) {
            for (let i = 0; i < desiredAmount; i++) {
                probAtLeastN += math.combinations(summons, i) * math.pow(gachaProb, i) * math.pow(1 - gachaProb, summons - i);
            }
            // 小数点第二位まで表示
            probAtLeastN = Math.round((1 - probAtLeastN) * 10000) / 100;
        }
        return probAtLeastN;
    }
);
