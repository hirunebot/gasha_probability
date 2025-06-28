// 共通型定義
export type Result<T, E = string> =
    | { ok: true; value: T }
    | { ok: false; error: E };

// ブランデッド型
export type Branded<T, B> = T & { readonly _brand: B };

export type Stone = Branded<number, "Stone">;
export type Rate = Branded<number, "Rate">;
export type Count = Branded<number, "Count">;
export type Percentage = Branded<number, "Percentage">;
export type CalculationMode = "stoneBase" | "pullBase";

// ヘルパー関数
export const ok = <T>(value: T): Result<T> => ({ ok: true, value });
export const err = <E = string>(error: E): Result<never, E> => ({
    ok: false,
    error,
});

// 型ガード
export const isOk = <T, E>(
    result: Result<T, E>
): result is { ok: true; value: T } => result.ok;

export const isErr = <T, E>(
    result: Result<T, E>
): result is { ok: false; error: E } => !result.ok;
