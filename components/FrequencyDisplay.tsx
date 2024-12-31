import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { FrequencyItem } from "@/types/sudoku";

interface FrequencyDisplayProps {
    frequencies: FrequencyItem[];
}

export const FrequencyDisplay: React.FC<FrequencyDisplayProps> = ({ frequencies }) => {
    return (
        <div className="w-full max-w-4xl">
            <h2 className="text-xl font-semibold mb-4">Number Frequencies</h2>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {frequencies.map(({ number, percentage }) => (
                    <div key={number} className="flex flex-col gap-1">
                        <div className="flex justify-between">
                            <span>{number}</span>
                            <span>{Math.round(percentage * 100)}%</span>
                        </div>
                        <LinearProgress
                            variant="determinate"
                            value={percentage * 100}
                            className="h-2"
                            aria-label={`Number ${number} appears in ${Math.round(percentage * 100)}% of combinations`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
