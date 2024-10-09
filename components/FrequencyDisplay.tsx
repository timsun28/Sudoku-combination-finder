import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

type FrequencyItem = {
    number: string;
    percentage: number;
};

type FrequencyDisplayProps = {
    frequencies: FrequencyItem[];
};

export const FrequencyDisplay: React.FC<FrequencyDisplayProps> = ({ frequencies }) => {
    return (
        <div className="flex flex-wrap gap-4">
            {frequencies.map(({ number, percentage }) => (
                <div key={number} className="flex flex-col items-center">
                    {number}: {Math.round(percentage * 100)}%{" "}
                    <LinearProgress
                        className="w-16"
                        aria-label={`Chances of finding a ${number} is currently ${percentage * 100}%`}
                        variant="determinate"
                        value={percentage * 100}
                    />
                </div>
            ))}
        </div>
    );
};
