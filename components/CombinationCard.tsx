import React from "react";
import { Possibility } from "@/types/sudoku";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface CombinationCardProps {
    possibility: Possibility;
    onToggle: () => void;
}

export const CombinationCard: React.FC<CombinationCardProps> = ({ possibility, onToggle }) => {
    const { numbers, isHidden } = possibility;

    return (
        <Card
            onClick={onToggle}
            className={cn(
                "p-4 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center",
                isHidden
                    ? "bg-destructive/10 border-destructive/20 hover:bg-destructive/20"
                    : "bg-primary/5 border-primary/20 hover:bg-primary/10 hover:border-primary/30"
            )}
        >
            <div
                className={cn(
                    "text-xl font-bold tracking-widest",
                    isHidden ? "text-destructive line-through opacity-70" : "text-primary"
                )}
            >
                {numbers.join(" ")}
            </div>
        </Card>
    );
};
