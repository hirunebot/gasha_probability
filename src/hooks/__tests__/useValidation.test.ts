import { act, renderHook } from "@testing-library/react";
import { createStore, Provider } from "jotai";
import type React from "react";
import { createElement } from "react";
import { describe, expect, test } from "vitest";
import { useInputValidation, useValidation } from "../useValidation";

const wrapper = ({ children }: { children: React.ReactNode }) => {
    const store = createStore();
    return createElement(Provider, { store }, children);
};

describe("useValidation", () => {
    test("初期状態ではエラーがない", () => {
        const { result } = renderHook(() => useValidation(), { wrapper });

        expect(result.current.hasErrors).toBe(false);
        expect(Object.keys(result.current.errors)).toHaveLength(0);
    });

    test("有効な値の検証が成功する", () => {
        const { result } = renderHook(() => useValidation(), { wrapper });

        act(() => {
            const validationResult = result.current.validateField("stones", "15000");
            expect(validationResult.ok).toBe(true);
        });

        expect(result.current.hasErrors).toBe(false);
    });

    test("無効な値の検証が失敗する", () => {
        const { result } = renderHook(() => useValidation(), { wrapper });

        act(() => {
            const validationResult = result.current.validateField("stones", "-100");
            expect(validationResult.ok).toBe(false);
        });

        expect(result.current.hasErrors).toBe(true);
        expect(result.current.getFieldError("stones")).toBeDefined();
    });

    test("複数フィールドの検証", () => {
        const { result } = renderHook(() => useValidation(), { wrapper });

        act(() => {
            const validationResult = result.current.validateMultipleFields({
                stones: "15000",
                stonePerPull: "300",
                pullRate: "3.0",
                desiredAmount: "1",
            });

            expect(validationResult.hasErrors).toBe(false);
            expect(validationResult.results.stones.ok).toBe(true);
            expect(validationResult.results.stonePerPull.ok).toBe(true);
        });
    });

    test("エラークリア機能", () => {
        const { result } = renderHook(() => useValidation(), { wrapper });

        act(() => {
            // まずエラーを発生させる
            result.current.validateField("stones", "-100");
        });

        expect(result.current.hasErrors).toBe(true);

        act(() => {
            result.current.clearAllErrors();
        });

        expect(result.current.hasErrors).toBe(false);
    });
});

describe("useInputValidation", () => {
    test("有効な入力状態の検証", () => {
        const { result } = renderHook(() => useInputValidation(), { wrapper });

        act(() => {
            const inputState = {
                stones: "15000",
                stonePerPull: "300",
                pullRate: "3.0",
                desiredAmount: "1",
                calculationMode: "stoneBase" as const,
                isPityEnabled: false,
                pulls: "50",
                pityItemsPerPull: "1",
                pityRequiredItems: "300",
                currentPityItems: "0",
            };

            const validationResult = result.current.validateInputState(inputState);
            expect(validationResult.ok).toBe(true);
        });
    });

    test("無効な入力状態の検証", () => {
        const { result } = renderHook(() => useInputValidation(), { wrapper });

        act(() => {
            const inputState = {
                stones: "-100", // 無効な値
                stonePerPull: "300",
                pullRate: "3.0",
                desiredAmount: "1",
                calculationMode: "stoneBase" as const,
                isPityEnabled: false,
                pulls: "50",
                pityItemsPerPull: "1",
                pityRequiredItems: "300",
                currentPityItems: "0",
            };

            const validationResult = result.current.validateInputState(inputState);
            expect(validationResult.ok).toBe(false);
        });
    });
});
