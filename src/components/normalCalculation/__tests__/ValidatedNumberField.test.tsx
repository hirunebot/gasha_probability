import { fireEvent, render, screen } from "@testing-library/react";
import { createStore, Provider } from "jotai";
import { describe, expect, test, vi } from "vitest";
import { ValidatedNumberField } from "../ValidatedNumberField";

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const store = createStore();
    return <Provider store={store}>{children}</Provider>;
};

describe("ValidatedNumberField", () => {
    test("正常に表示される", () => {
        const mockSetState = vi.fn();

        render(
            <TestWrapper>
                <ValidatedNumberField
                    label="所持石"
                    id="test-field"
                    unit="個"
                    state="100"
                    setState={mockSetState}
                />
            </TestWrapper>
        );

        expect(screen.getByText("所持石")).toBeInTheDocument();
        expect(screen.getByDisplayValue("100")).toBeInTheDocument();
        expect(screen.getByText("個")).toBeInTheDocument();
    });

    test("値の変更時にsetStateが呼ばれる", () => {
        const mockSetState = vi.fn();

        render(
            <TestWrapper>
                <ValidatedNumberField
                    label="所持石"
                    id="input-field"
                    unit="個"
                    state="100"
                    setState={mockSetState}
                />
            </TestWrapper>
        );

        const input = screen.getByRole("spinbutton");
        fireEvent.change(input, { target: { value: "200" } });

        expect(mockSetState).toHaveBeenCalledWith("200");
    });

    test("必須フィールドが適切に設定される", () => {
        const mockSetState = vi.fn();

        render(
            <TestWrapper>
                <ValidatedNumberField
                    label="所持石"
                    id="required-field"
                    unit="個"
                    state="100"
                    setState={mockSetState}
                    required
                />
            </TestWrapper>
        );

        const input = screen.getByRole("spinbutton");
        expect(input).toHaveAttribute("required");
    });

    test("バリデーションエラーのある値が表示される", () => {
        const mockSetState = vi.fn();

        render(
            <TestWrapper>
                <ValidatedNumberField
                    label="所持石"
                    id="error-field"
                    unit="個"
                    state="-100"
                    setState={mockSetState}
                />
            </TestWrapper>
        );

        // バリデーションエラーは内部で自動的に処理される
        expect(screen.getByDisplayValue("-100")).toBeInTheDocument();
    });

    test("プレースホルダーが表示される", () => {
        const mockSetState = vi.fn();

        render(
            <TestWrapper>
                <ValidatedNumberField
                    label="所持石"
                    id="placeholder-field"
                    unit="個"
                    state=""
                    setState={mockSetState}
                    placeholder="石の数を入力してください"
                />
            </TestWrapper>
        );

        expect(screen.getByPlaceholderText("石の数を入力してください")).toBeInTheDocument();
    });

    test("無効化された状態が正しく動作する", () => {
        const mockSetState = vi.fn();

        render(
            <TestWrapper>
                <ValidatedNumberField
                    label="所持石"
                    id="disabled-field"
                    unit="個"
                    state="100"
                    setState={mockSetState}
                    disabled
                />
            </TestWrapper>
        );

        const input = screen.getByRole("spinbutton");
        expect(input).toBeDisabled();
    });
});
