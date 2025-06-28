import { describe, test, expect } from "vitest";
import {
    calculateGashaProbability,
    calculateProbabilityJustN,
    calculateProbabilityAtLeastN,
    calculatePullsFromStones,
    testUtils,
} from "../GashaCalculation";
import { ValidatedInput } from "../../types/gasha";
import { Stone, Rate, Count } from "../../types/common";

const { mathUtils, calculatePityInfo, calculateBinomialProbability } =
    testUtils;

describe("GashaCalculation", () => {
    describe("mathUtils", () => {
        test("combinations計算が正しい", () => {
            expect(mathUtils.combinations(10, 3)).toBeCloseTo(120);
            expect(mathUtils.combinations(5, 0)).toBe(1);
            expect(mathUtils.combinations(5, 5)).toBe(1);
            expect(mathUtils.combinations(3, 5)).toBe(0);
        });

        test("pow計算が正しい", () => {
            expect(mathUtils.pow(2, 3)).toBe(8);
            expect(mathUtils.pow(10, 0)).toBe(1);
            expect(mathUtils.pow(0.5, 2)).toBe(0.25);
        });

        test("roundToDecimalPlaces計算が正しい", () => {
            expect(mathUtils.roundToDecimalPlaces(3.14159, 2)).toBe(3.14);
            expect(mathUtils.roundToDecimalPlaces(2.5, 0)).toBe(3);
        });
    });

    describe("calculatePityInfo", () => {
        test("天井情報の計算が正しい", () => {
            const result = calculatePityInfo(
                100 as Count,
                1 as Count,
                10 as Count
            );

            expect(result.totalPityItems).toBe(100);
            expect(result.guaranteedHits).toBe(10);
        });

        test("余りが出る場合の天井計算", () => {
            const result = calculatePityInfo(
                105 as Count,
                1 as Count,
                10 as Count
            );

            expect(result.totalPityItems).toBe(105);
            expect(result.guaranteedHits).toBe(10);
        });
    });

    describe("calculateBinomialProbability", () => {
        test("二項分布の計算が正しい", () => {
            const result = calculateBinomialProbability(10, 1, 0.1);
            expect(result).toBeGreaterThan(0);
            expect(result).toBeLessThan(1);
        });

        test("不正な入力では0を返す", () => {
            expect(calculateBinomialProbability(-1, 1, 0.1)).toBe(0);
            expect(calculateBinomialProbability(10, 11, 0.1)).toBe(0);
            expect(calculateBinomialProbability(10, 1, -0.1)).toBe(0);
            expect(calculateBinomialProbability(10, 1, 1.1)).toBe(0);
        });
    });

    describe("calculatePullsFromStones", () => {
        test("石からガシャ回数を正しく計算", () => {
            const result = calculatePullsFromStones(
                3000 as Stone,
                300 as Stone
            );
            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBe(10);
            }
        });

        test("ゼロ除算エラーをハンドリング", () => {
            const result = calculatePullsFromStones(3000 as Stone, 0 as Stone);
            expect(result.ok).toBe(false);
        });
    });

    describe("calculateProbabilityJustN", () => {
        test("基本的な確率計算", () => {
            const result = calculateProbabilityJustN(
                10 as Count,
                1 as Count,
                10 as Rate
            );

            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBeGreaterThan(0);
                expect(result.value).toBeLessThan(100);
            }
        });

        test("天井考慮時の確率計算", () => {
            const result = calculateProbabilityJustN(
                10 as Count,
                1 as Count,
                10 as Rate,
                1 as Count
            );

            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBe(0);
            }
        });
    });

    describe("calculateGachaProbability", () => {
        test("stoneBaseモードでの完全な計算", () => {
            const input: ValidatedInput = {
                stones: 3000 as Stone,
                stonePerPull: 300 as Stone,
                pullRate: 3 as Rate,
                desiredAmount: 1 as Count,
                calculationMode: "stoneBase",
            };

            const result = calculateGashaProbability(input);
            expect(result.ok).toBe(true);

            if (result.ok) {
                expect(result.value.pulls).toBe(10);
                expect(result.value.probJustN).toBeGreaterThan(0);
                expect(result.value.probAtLeastN).toBeGreaterThan(0);
                expect(result.value.pityInfo).toBeUndefined();
            }
        });

        test("pullBaseモードでの計算", () => {
            const input: ValidatedInput = {
                stones: 0 as Stone,
                stonePerPull: 0 as Stone,
                pullRate: 3 as Rate,
                desiredAmount: 1 as Count,
                calculationMode: "pullBase",
                pulls: 20 as Count,
            };

            const result = calculateGashaProbability(input);
            expect(result.ok).toBe(true);

            if (result.ok) {
                expect(result.value.pulls).toBe(20);
                expect(result.value.probJustN).toBeGreaterThan(0);
                expect(result.value.probAtLeastN).toBeGreaterThan(0);
            }
        });

        test("天井ありでの計算", () => {
            const input: ValidatedInput = {
                stones: 6000 as Stone,
                stonePerPull: 300 as Stone,
                pullRate: 3 as Rate,
                desiredAmount: 1 as Count,
                calculationMode: "stoneBase",
                pityConfig: {
                    itemsPerPull: 1 as Count,
                    requiredItems: 10 as Count,
                },
            };

            const result = calculateGashaProbability(input);
            expect(result.ok).toBe(true);

            if (result.ok) {
                expect(result.value.pulls).toBe(20);
                expect(result.value.pityInfo).toBeDefined();
                expect(result.value.pityInfo?.totalPityItems).toBe(20);
                expect(result.value.pityInfo?.guaranteedHits).toBe(2);
            }
        });
    });
});
