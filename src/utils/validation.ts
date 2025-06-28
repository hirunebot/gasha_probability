import { type Count, err, ok, type Rate, type Result, type Stone } from "../types/common";

const VALIDATION_CONFIG = {
    MAX_STONES: 999999,
    MAX_RATE: 100,
    MIN_RATE: 0.001,
    MAX_COUNT: 9999,
    MAX_PULLS: 9999,
} as const;

const ERROR_MESSAGES = {
    REQUIRED: (field: string) => `${field}は必須項目です`,
    INVALID_NUMBER: (field: string) => `${field}は有効な数値を入力してください`,
    NEGATIVE: (field: string) => `${field}は0以上の値を入力してください`,
    ZERO: (field: string) => `${field}は0より大きい値を入力してください`,
    MAX_EXCEEDED: (field: string, max: number) => `${field}は${max}以下の値を入力してください`,
    RATE_RANGE: () =>
        `排出率は${VALIDATION_CONFIG.MIN_RATE}%〜${VALIDATION_CONFIG.MAX_RATE}%の範囲で入力してください`,
} as const;

const validatePositiveNumber = (
    value: string,
    fieldName: string,
    allowZero = false
): Result<number> => {
    if (!value.trim()) {
        return err(ERROR_MESSAGES.REQUIRED(fieldName));
    }

    const num = Number(value);
    if (isNaN(num)) {
        return err(ERROR_MESSAGES.INVALID_NUMBER(fieldName));
    }

    if (num < 0) {
        return err(ERROR_MESSAGES.NEGATIVE(fieldName));
    }

    if (!allowZero && num === 0) {
        return err(ERROR_MESSAGES.ZERO(fieldName));
    }

    return ok(num);
};

export const validateStones = (value: string): Result<Stone> => {
    const result = validatePositiveNumber(value, "石の数", true);
    if (!result.ok) return result;

    if (result.value > VALIDATION_CONFIG.MAX_STONES) {
        return err(ERROR_MESSAGES.MAX_EXCEEDED("石の数", VALIDATION_CONFIG.MAX_STONES));
    }

    return ok(result.value as Stone);
};

export const validateStonePerPull = (value: string): Result<Stone> => {
    const result = validatePositiveNumber(value, "ガシャ1回に必要な石");
    if (!result.ok) return result;

    if (result.value > VALIDATION_CONFIG.MAX_STONES) {
        return err(
            ERROR_MESSAGES.MAX_EXCEEDED("ガシャ1回に必要な石", VALIDATION_CONFIG.MAX_STONES)
        );
    }

    return ok(result.value as Stone);
};

export const validateStonePerSummon = validateStonePerPull;

export const validatePullRate = (value: string): Result<Rate> => {
    const result = validatePositiveNumber(value, "排出率");
    if (!result.ok) return result;

    if (result.value < VALIDATION_CONFIG.MIN_RATE || result.value > VALIDATION_CONFIG.MAX_RATE) {
        return err(ERROR_MESSAGES.RATE_RANGE());
    }

    return ok(result.value as Rate);
};

export const validateSummonRate = validatePullRate;

export const validateDesiredAmount = (value: string): Result<Count> => {
    const result = validatePositiveNumber(value, "希望個数", true);
    if (!result.ok) return result;

    if (result.value > VALIDATION_CONFIG.MAX_COUNT) {
        return err(ERROR_MESSAGES.MAX_EXCEEDED("希望個数", VALIDATION_CONFIG.MAX_COUNT));
    }

    return ok(result.value as Count);
};

export const validatePulls = (value: string): Result<Count> => {
    const result = validatePositiveNumber(value, "ガシャ回数");
    if (!result.ok) return result;

    if (result.value > VALIDATION_CONFIG.MAX_PULLS) {
        return err(ERROR_MESSAGES.MAX_EXCEEDED("ガシャ回数", VALIDATION_CONFIG.MAX_PULLS));
    }

    return ok(result.value as Count);
};

export const validateSummons = validatePulls;

export const validatePityItems = (value: string): Result<Count> => {
    const result = validatePositiveNumber(value, "天井アイテム数");
    if (!result.ok) return result;

    if (result.value > VALIDATION_CONFIG.MAX_COUNT) {
        return err(ERROR_MESSAGES.MAX_EXCEEDED("天井アイテム数", VALIDATION_CONFIG.MAX_COUNT));
    }

    return ok(result.value as Count);
};

export const validateRequiredPityItems = (value: string): Result<Count> => {
    const result = validatePositiveNumber(value, "交換に必要な天井アイテム数");
    if (!result.ok) return result;

    if (result.value > VALIDATION_CONFIG.MAX_COUNT) {
        return err(
            ERROR_MESSAGES.MAX_EXCEEDED("交換に必要な天井アイテム数", VALIDATION_CONFIG.MAX_COUNT)
        );
    }

    return ok(result.value as Count);
};

export const validateCurrentPityItems = (value: string): Result<Count> => {
    const result = validatePositiveNumber(value, "現在の天井アイテム数", true);
    if (!result.ok) return result;

    if (result.value > VALIDATION_CONFIG.MAX_COUNT) {
        return err(
            ERROR_MESSAGES.MAX_EXCEEDED("現在の天井アイテム数", VALIDATION_CONFIG.MAX_COUNT)
        );
    }

    return ok(result.value as Count);
};

export const getValidationConfig = () => VALIDATION_CONFIG;
