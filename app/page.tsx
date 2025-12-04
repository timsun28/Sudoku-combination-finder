"use client";

import React from "react";
import { useSudokuKiller } from "@/hooks/useSudokuKiller";
import { CombinationCard } from "@/components/CombinationCard";
import { FrequencyDisplay } from "@/components/FrequencyDisplay";
import { SliderComponent } from "@/components/SliderComponent";
import { CheckboxGroup } from "@/components/CheckboxGroup";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SudokuKillerHelper() {
    const { config, possibilities, frequencies, updateConfig, togglePossibility, availableNumbers } = useSudokuKiller();

    return (
        <div className="px-6 py-10 sm:px-10 lg:px-12">
            <div className="mx-auto max-w-6xl space-y-8">
                <div className="flex flex-col space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Killer Sudoku Solver</h1>
                    <p className="text-muted-foreground text-lg">Find valid combinations for your Killer Sudoku cages.</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-4 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuration</CardTitle>
                                <CardDescription>Set the parameters for the cage.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
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

                                <Separator />

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
                            </CardContent>
                        </Card>
                    </div>

                <div className="lg:col-span-8 space-y-0">
                    <Card className="border-none shadow-none bg-transparent">
                            <CardHeader className="px-0 pt-0">
                                <CardTitle>Combinations</CardTitle>
                                <CardDescription>
                                    Found {possibilities.length} possible combinations. Click to toggle validity.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-0">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {possibilities.map((possibility) => (
                                        <CombinationCard
                                            key={possibility.id}
                                            possibility={possibility}
                                            onToggle={() => togglePossibility(possibility.id)}
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Separator className="my-0" />

                        <FrequencyDisplay frequencies={frequencies} />
                    </div>
                </div>
            </div>
        </div>
    );
}
