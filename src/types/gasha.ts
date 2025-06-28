import type { CalculationMode, Count, Percentage, Rate, Stone } from "./common";

export interface GashaParameters {
    stones: Stone;
    stonePerPull: Stone;
    pullRate: Rate;
    desiredAmount: Count;
    pityConfig?: PityConfiguration;
}

export interface PityConfiguration {
    itemsPerPull: Count;
    requiredItems: Count;
    currentPityItems?: Count;
}

export interface PityInfo {
    totalPityItems: Count;
    guaranteedHits: Count;
    currentPityHits: Count;
}

export interface CalculationResult {
    pulls: Count;
    probJustN: Percentage;
    probAtLeastN: Percentage;
    pityInfo?: PityInfo;
}

export interface InputState {
    stones: string;
    stonePerPull: string;
    pullRate: string;
    desiredAmount: string;
    calculationMode: CalculationMode;
    isPityEnabled: boolean;
    pityItemsPerPull: string;
    pityRequiredItems: string;
    currentPityItems: string;
    pulls: string;
}

export interface ValidatedInput {
    stones: Stone;
    stonePerPull: Stone;
    pullRate: Rate;
    desiredAmount: Count;
    calculationMode: CalculationMode;
    pityConfig?: PityConfiguration;
    pulls?: Count;
}
