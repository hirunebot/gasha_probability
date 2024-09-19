import { atom } from "jotai";

export const stonesAtom = atom("");
export const stoneForSummonAtom = atom("");
export const desiredAmountAtom = atom("1");
export const summonRateAtom = atom("");
export const pityItemsFromSummonAtom = atom("");
export const requiredPityItemsAtom = atom("");
export const calculationModeAtom = atom("stoneBase");

export const stonesNumAtom = atom((get) => Number(get(stonesAtom)));
export const stoneForSummonNumAtom = atom((get) => Number(get(stoneForSummonAtom)));
export const desiredAmountNumAtom = atom((get) => Number(get(desiredAmountAtom)));
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
    (get, set, num: string) => {
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
            set(summonsAtom, num);
        }
    },
);
export const summonsNumAtom = atom((get) => Number(get(calculateSummonsAtom)));
