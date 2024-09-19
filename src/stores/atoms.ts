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
