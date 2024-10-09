import { Posibility } from "@/app/page";
import { useState } from "react";

export const CombinationCard = ({
    possibility,
    index,
    setPossibilities,
}: {
    possibility: Posibility;
    index: number;
    setPossibilities: React.Dispatch<React.SetStateAction<Posibility[]>>;
}) => {
    const handleClick = () => {
        setPossibilities((prevPossibilities) => {
            return prevPossibilities.map((pos, i) => (i === index ? { ...pos, hidden: !pos.hidden } : pos));
        });
    };

    return (
        <div
            className={`flex flex-col items-center p-2 rounded-md px-4 justify-center ${
                possibility.hidden ? "bg-red-500" : "bg-blue-500"
            }`}
            onClick={handleClick}
        >
            <div className="text-white text-center text-xl font-bold">{possibility.possibility.join(" ")}</div>
        </div>
    );
};
