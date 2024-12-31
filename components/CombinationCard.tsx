import React from "react";
import { Possibility } from "@/types/sudoku";

interface CombinationCardProps {
    possibility: Possibility;
    onToggle: () => void;
}

export const CombinationCard: React.FC<CombinationCardProps> = ({ possibility, onToggle }) => {
    const { numbers, isHidden } = possibility;

    return (
        <button
            onClick={onToggle}
            className={`
                p-4 rounded-lg transition-colors duration-200
                ${isHidden ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}
                focus:outline-none focus:ring-2 focus:ring-offset-2
                ${isHidden ? "focus:ring-red-500" : "focus:ring-blue-500"}
            `}
        >
            <div className="text-white text-xl font-bold">{numbers.join(" ")}</div>
        </button>
    );
};
