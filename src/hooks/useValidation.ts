import { atom, useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import { isErr, isOk, type Result } from "../types/common";
import type { InputState, ValidatedInput } from "../types/gasha";
import {
    validateDesiredAmount,
    validatePityItems,
    validatePullRate,
    validatePulls,
    validateRequiredPityItems,
    validateStonePerPull,
    validateStones,
} from "../utils/validation";

export const validationErrorsAtom = atom<Record<string, string>>({});

export const hasValidationErrorsAtom = atom((get) => {
    const errors = get(validationErrorsAtom);
    return Object.keys(errors).length > 0;
});

type ValidationFunction = (value: string) => Result<any>;

const validationFunctions: Record<string, ValidationFunction> = {
    stones: validateStones,
    stonePerPull: validateStonePerPull,
    pullRate: validatePullRate,
    desiredAmount: validateDesiredAmount,
    pulls: validatePulls,
    pityItemsPerPull: validatePityItems,
    pityRequiredItems: validateRequiredPityItems,
};

export const useValidation = () => {
    const [errors, setErrors] = useAtom(validationErrorsAtom);

    const validateField = useCallback(
        (fieldName: string, value: string): Result<any> => {
            const validator = validationFunctions[fieldName];
            if (!validator) {
                console.warn(`Unknown field for validation: ${fieldName}`);
                return { ok: true, value };
            }

            const result = validator(value);

            setErrors((prev) => {
                const newErrors = { ...prev };
                if (isErr(result)) {
                    newErrors[fieldName] = result.error;
                } else {
                    delete newErrors[fieldName];
                }
                return newErrors;
            });

            return result;
        },
        [setErrors]
    );

    const validateMultipleFields = useCallback(
        (fields: Record<string, string>) => {
            const results: Record<string, Result<any>> = {};
            let hasErrors = false;

            Object.entries(fields).forEach(([fieldName, value]) => {
                const result = validateField(fieldName, value);
                results[fieldName] = result;
                if (isErr(result)) {
                    hasErrors = true;
                }
            });

            return { results, hasErrors };
        },
        [validateField]
    );

    const getFieldError = useCallback(
        (fieldName: string) => {
            return errors[fieldName];
        },
        [errors]
    );

    const clearAllErrors = useCallback(() => {
        setErrors({});
    }, [setErrors]);

    const clearFieldError = useCallback(
        (fieldName: string) => {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
        },
        [setErrors]
    );

    const hasErrors = useMemo(() => {
        return Object.keys(errors).length > 0;
    }, [errors]);

    const getErrorList = useCallback(() => {
        return Object.entries(errors).map(([field, error]) => ({
            field,
            error,
        }));
    }, [errors]);

    return {
        validateField,
        validateMultipleFields,
        getFieldError,
        clearAllErrors,
        clearFieldError,
        hasErrors,
        errors,
        getErrorList,
    };
};

export const useInputValidation = () => {
    const { validateMultipleFields } = useValidation();

    const validateInputState = useCallback(
        (inputState: InputState): Result<ValidatedInput> => {
            const baseFields = {
                stones: inputState.stones,
                stonePerPull: inputState.stonePerPull,
                pullRate: inputState.pullRate,
                desiredAmount: inputState.desiredAmount,
            };

            const fieldsToValidate =
                inputState.calculationMode === "pullBase"
                    ? { ...baseFields, pulls: inputState.pulls }
                    : baseFields;

            if (inputState.isPityEnabled) {
                (fieldsToValidate as any).pityItemsPerPull = inputState.pityItemsPerPull;
                (fieldsToValidate as any).pityRequiredItems = inputState.pityRequiredItems;
            }

            const { results, hasErrors } = validateMultipleFields(fieldsToValidate);

            if (hasErrors) {
                const errorMessages = Object.values(results)
                    .filter(isErr)
                    .map((result) => result.error)
                    .join(", ");
                return { ok: false, error: errorMessages };
            }

            const validatedInput: ValidatedInput = {
                stones: results.stones.ok ? results.stones.value : 0,
                stonePerPull: results.stonePerPull.ok ? results.stonePerPull.value : 0,
                pullRate: results.pullRate.ok ? results.pullRate.value : 0,
                desiredAmount: results.desiredAmount.ok ? results.desiredAmount.value : 0,
                calculationMode: inputState.calculationMode,
            };

            if (inputState.calculationMode === "pullBase" && results.pulls?.ok) {
                validatedInput.pulls = results.pulls.value;
            }

            if (
                inputState.isPityEnabled &&
                results.pityItemsPerPull?.ok &&
                results.pityRequiredItems?.ok
            ) {
                validatedInput.pityConfig = {
                    itemsPerPull: results.pityItemsPerPull.value,
                    requiredItems: results.pityRequiredItems.value,
                };
            }

            return { ok: true, value: validatedInput };
        },
        [validateMultipleFields]
    );

    return { validateInputState };
};
