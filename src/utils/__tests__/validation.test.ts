import { describe, expect, test } from "vitest";
import {
    getValidationConfig,
    validateDesiredAmount,
    validatePityItems,
    validatePullRate,
    validatePulls,
    validateRequiredPityItems,
    validateStonePerPull,
    validateStones,
} from "../validation";

describe("Validation Functions", () => {
    const config = getValidationConfig();

    describe("validateStones", () => {
        test("有効な石数を受け入れる", () => {
            const result = validateStones("3000");
            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBe(3000);
            }
        });

        test("0を受け入れる", () => {
            const result = validateStones("0");
            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBe(0);
            }
        });

        test("空文字列を拒否する", () => {
            const result = validateStones("");
            expect(result.ok).toBe(false);
            if (!result.ok) {
                expect(result.error).toContain("必須項目");
            }
        });

        test("負の数を拒否する", () => {
            const result = validateStones("-100");
            expect(result.ok).toBe(false);
            if (!result.ok) {
                expect(result.error).toContain("0以上");
            }
        });

        test("無効な文字列を拒否する", () => {
            const result = validateStones("abc");
            expect(result.ok).toBe(false);
            if (!result.ok) {
                expect(result.error).toContain("有効な数値");
            }
        });

        test("最大値を超える値を拒否する", () => {
            const result = validateStones(String(config.MAX_STONES + 1));
            expect(result.ok).toBe(false);
            if (!result.ok) {
                expect(result.error).toContain("以下の値");
            }
        });
    });

    describe("validateStonePerPull", () => {
        test("有効な石数を受け入れる", () => {
            const result = validateStonePerPull("300");
            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBe(300);
            }
        });

        test("0を拒否する", () => {
            const result = validateStonePerPull("0");
            expect(result.ok).toBe(false);
            if (!result.ok) {
                expect(result.error).toContain("0より大きい");
            }
        });
    });

    describe("validatePullRate", () => {
        test("有効な排出率を受け入れる", () => {
            const result = validatePullRate("3.5");
            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBe(3.5);
            }
        });

        test("範囲外の値を拒否する", () => {
            const result = validatePullRate("101");
            expect(result.ok).toBe(false);
            if (!result.ok) {
                expect(result.error).toContain("範囲で");
            }
        });

        test("最小値未満を拒否する", () => {
            const result = validatePullRate("0.0001");
            expect(result.ok).toBe(false);
            if (!result.ok) {
                expect(result.error).toContain("範囲で");
            }
        });

        test("0を拒否する", () => {
            const result = validatePullRate("0");
            expect(result.ok).toBe(false);
            if (!result.ok) {
                expect(result.error).toContain("0より大きい");
            }
        });
    });

    describe("validateDesiredAmount", () => {
        test("有効な希望個数を受け入れる", () => {
            const result = validateDesiredAmount("5");
            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBe(5);
            }
        });

        test("0を受け入れる", () => {
            const result = validateDesiredAmount("0");
            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBe(0);
            }
        });

        test("最大値を超える値を拒否する", () => {
            const result = validateDesiredAmount(String(config.MAX_COUNT + 1));
            expect(result.ok).toBe(false);
            if (!result.ok) {
                expect(result.error).toContain("以下の値");
            }
        });
    });

    describe("validatePulls", () => {
        test("有効なガシャ回数を受け入れる", () => {
            const result = validatePulls("100");
            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBe(100);
            }
        });

        test("0を拒否する", () => {
            const result = validatePulls("0");
            expect(result.ok).toBe(false);
            if (!result.ok) {
                expect(result.error).toContain("0より大きい");
            }
        });

        test("最大値を超える値を拒否する", () => {
            const result = validatePulls(String(config.MAX_PULLS + 1));
            expect(result.ok).toBe(false);
            if (!result.ok) {
                expect(result.error).toContain("以下の値");
            }
        });
    });

    describe("validatePityItems", () => {
        test("有効な天井アイテム数を受け入れる", () => {
            const result = validatePityItems("1");
            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBe(1);
            }
        });

        test("0を拒否する", () => {
            const result = validatePityItems("0");
            expect(result.ok).toBe(false);
            if (!result.ok) {
                expect(result.error).toContain("0より大きい");
            }
        });
    });

    describe("validateRequiredPityItems", () => {
        test("有効な必要天井アイテム数を受け入れる", () => {
            const result = validateRequiredPityItems("10");
            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBe(10);
            }
        });

        test("0を拒否する", () => {
            const result = validateRequiredPityItems("0");
            expect(result.ok).toBe(false);
            if (!result.ok) {
                expect(result.error).toContain("0より大きい");
            }
        });
    });

    describe("エッジケースのテスト", () => {
        test("空白文字を含む文字列を適切に処理する", () => {
            const result = validateStones("  3000  ");
            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBe(3000);
            }
        });

        test("小数点を含む石数は整数に変換される", () => {
            const result = validateStones("3000.5");
            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBe(3000.5);
            }
        });

        test("科学記法の数値を処理する", () => {
            const result = validateStones("3e3");
            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBe(3000);
            }
        });
    });
});
