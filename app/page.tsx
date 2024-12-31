"use client";

import React from "react";
import { useSudokuKiller } from "@/hooks/useSudokuKiller";
import { CombinationCard } from "@/components/CombinationCard";
import { FrequencyDisplay } from "@/components/FrequencyDisplay";
import { SliderComponent } from "@/components/SliderComponent";
import { CheckboxGroup } from "@/components/CheckboxGroup";

export default function SudokuKillerHelper() {
    const { config, possibilities, frequencies, updateConfig, togglePossibility, availableNumbers } = useSudokuKiller();

    return (
        <div className="flex flex-col gap-6 mx-auto max-w-4xl p-4">
            <h1 className="text-5xl font-bold">Sudoku Killer Helper</h1>

            <div className="space-y-6">
                <SliderComponent
                    label="Number of Squares"
                    value={config.boxCount}
                    min={2}
                    max={9}
                    onChange={(value) => updateConfig({ boxCount: value })}
                />

                <SliderComponent
                    label="Target Sum"
                    value={config.targetSum}
                    min={3}
                    max={45}
                    onChange={(value) => updateConfig({ targetSum: value })}
                />

                <CheckboxGroup
                    label="Required Numbers"
                    numbers={availableNumbers}
                    selectedNumbers={config.requiredNumbers}
                    onChange={(numbers) => updateConfig({ requiredNumbers: numbers })}
                />

                <CheckboxGroup
                    label="Invalid Numbers"
                    numbers={availableNumbers}
                    selectedNumbers={config.invalidNumbers}
                    onChange={(numbers) => updateConfig({ invalidNumbers: numbers })}
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {possibilities.map((possibility) => (
                    <CombinationCard
                        key={possibility.id}
                        possibility={possibility}
                        onToggle={() => togglePossibility(possibility.id)}
                    />
                ))}
            </div>

            <FrequencyDisplay frequencies={frequencies} />
        </div>
    );
}
