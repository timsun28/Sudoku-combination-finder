import { useState, useCallback } from "react";
import { Possibility, SudokuConfig } from "@/types/sudoku";
import { generateValidCombinations, calculateFrequencies } from "@/utils/combinations";

const INITIAL_CONFIG: SudokuConfig = {
    boxCount: 3,
    targetSum: 19,
    requiredNumbers: [],
    invalidNumbers: [],
};

const AVAILABLE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const useSudokuKiller = () => {
    const [config, setConfig] = useState<SudokuConfig>(INITIAL_CONFIG);
    const [possibilities, setPossibilities] = useState<Possibility[]>(() =>
        generateValidCombinations(AVAILABLE_NUMBERS, config).map((nums, id) => ({
            numbers: nums,
            id,
            isHidden: false,
        }))
    );

    const updateConfig = useCallback((updates: Partial<SudokuConfig>) => {
        setConfig((prev) => {
            const newConfig = { ...prev, ...updates };
            const newPossibilities = generateValidCombinations(AVAILABLE_NUMBERS, newConfig).map((nums, id) => ({
                numbers: nums,
                id,
                isHidden: false,
            }));
            setPossibilities(newPossibilities);
            return newConfig;
        });
    }, []);

    const togglePossibility = useCallback((id: number) => {
        setPossibilities((prev) => prev.map((pos) => (pos.id === id ? { ...pos, isHidden: !pos.isHidden } : pos)));
    }, []);

    const frequencies = calculateFrequencies(possibilities, AVAILABLE_NUMBERS);

    return {
        config,
        possibilities,
        frequencies,
        updateConfig,
        togglePossibility,
        availableNumbers: AVAILABLE_NUMBERS,
    };
};
