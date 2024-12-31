import { FrequencyItem, Possibility } from "@/types/sudoku";

/**
 * Generates all possible combinations of numbers that satisfy the Sudoku Killer constraints
 */
export const generateValidCombinations = (
    numbers: number[],
    config: {
        boxCount: number;
        targetSum: number;
        requiredNumbers: number[];
        invalidNumbers: number[];
    }
): number[][] => {
    const allCombinations: number[][] = [];

    const generateCombinations = (current: number[], startIndex: number) => {
        if (current.length === config.boxCount) {
            if (current.reduce((sum, num) => sum + num, 0) === config.targetSum) {
                allCombinations.push([...current]);
            }
            return;
        }

        for (let i = startIndex; i < numbers.length; i++) {
            generateCombinations([...current, numbers[i]], i + 1);
        }
    };

    generateCombinations([], 0);

    return allCombinations.filter(
        (combination) =>
            config.requiredNumbers.every((req) => combination.includes(req)) &&
            !config.invalidNumbers.some((inv) => combination.includes(inv))
    );
};

/**
 * Calculates the frequency of each number in the visible possibilities
 */
export const calculateFrequencies = (possibilities: Possibility[], availableNumbers: number[]): FrequencyItem[] => {
    const visiblePossibilities = possibilities.filter((p) => !p.isHidden);
    const total = visiblePossibilities.length;

    const frequencies = availableNumbers.reduce((acc, num) => {
        const count = visiblePossibilities.reduce((sum, pos) => sum + (pos.numbers.includes(num) ? 1 : 0), 0);
        return [
            ...acc,
            {
                number: num.toString(),
                percentage: total === 0 ? 0 : count / total,
            },
        ];
    }, [] as FrequencyItem[]);

    return frequencies;
};
