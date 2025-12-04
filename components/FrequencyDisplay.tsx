import React from "react";
import { Progress } from "@/components/ui/progress";
import { FrequencyItem } from "@/types/sudoku";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FrequencyDisplayProps {
    frequencies: FrequencyItem[];
    className?: string;
}

export const FrequencyDisplay: React.FC<FrequencyDisplayProps> = ({ frequencies, className }) => {
    return (
        <Card className={cn("w-full", className)}>
            <CardHeader>
                <CardTitle>Number Frequencies</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
                    {frequencies.map(({ number, percentage }) => (
                        <div key={number} className="flex flex-col gap-2">
                            <div className="flex justify-between items-end">
                                <span className="text-lg font-bold">{number}</span>
                                <span className="text-sm text-muted-foreground">{Math.round(percentage * 100)}%</span>
                            </div>
                            <Progress value={percentage * 100} className="h-2" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
