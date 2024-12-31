export type Possibility = {
    numbers: number[];
    id: number;
    isHidden: boolean;
};

export type FrequencyItem = {
    number: string;
    percentage: number;
};

export type SudokuConfig = {
    boxCount: number;
    targetSum: number;
    requiredNumbers: number[];
    invalidNumbers: number[];
};
