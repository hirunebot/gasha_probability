import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { PageHeader } from "../PageHeader";

describe("PageHeader", () => {
    test("タイトルが表示される", () => {
        render(<PageHeader title="テストタイトル" />);

        expect(screen.getByText("テストタイトル")).toBeInTheDocument();
    });

    test("ボタンが表示されクリックできる", () => {
        const mockClick = vi.fn();

        render(
            <PageHeader
                title="テストタイトル"
                buttonText="テストボタン"
                onButtonClick={mockClick}
            />
        );

        const button = screen.getByText("テストボタン");
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(mockClick).toHaveBeenCalledTimes(1);
    });

    test("ボタンなしの場合はボタンが表示されない", () => {
        render(<PageHeader title="テストタイトル" />);

        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    test("レスポンシブクラスが適用されている", () => {
        const { container } = render(<PageHeader title="テストタイトル" />);

        const titleElement = container.querySelector("h1");
        expect(titleElement).toHaveClass("text-xl", "sm:text-2xl", "lg:text-3xl");
    });
});
