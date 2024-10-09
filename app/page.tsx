"use client";

import React, { useRef, useState, useCallback } from "react";
import { CombinationCard } from "@/components/CombinationCard";
import { FrequencyDisplay } from "@/components/FrequencyDisplay";
import { SliderComponent } from "@/components/SliderComponent";
import { CheckboxGroup } from "@/components/CheckboxGroup";

export type Possibility = {
    possibility: Array<number>;
    key: number;
    style: string;
    hidden: boolean;
};

const sudokuNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function App() {
    const amountBoxes = useRef(3);
    const sumBoxes = useRef(19);
    const [required, setRequired] = useState<Array<number>>([]);
    const [invalid, setInvalid] = useState<Array<number>>([]);

    const getPossibilities = useCallback(() => {
        const allPossibilities: Array<Array<number>> = [];
        function setAllCombinations(t: Array<number>, i: number) {
            if (t.length === amountBoxes.current) {
                allPossibilities.push(t);
                return;
            }
            if (i + 1 > sudokuNumbers.length) {
                return;
            }
            setAllCombinations(t.concat(sudokuNumbers[i]), i + 1);
            setAllCombinations(t, i + 1);
        }

        setAllCombinations([], 0);

        let correctPossibilities = allPossibilities.filter(
            (res) => res.reduce((a, b) => a + b, 0) === sumBoxes.current
        );

        correctPossibilities = correctPossibilities.filter(
            (el) => required.every((req) => el.includes(req)) && !invalid.some((inv) => el.includes(inv))
        );

        return correctPossibilities.map((pos, index) => ({
            possibility: pos,
            key: index,
            style: "primary",
            hidden: false,
        }));
    }, [required, invalid]);

    const [possibilities, setPossibilities] = useState<Possibility[]>(() => getPossibilities());

    const handleChangeSlider = useCallback(
        (value: number, id: "amountBoxes" | "sumBoxes") => {
            if (id === "amountBoxes") {
                amountBoxes.current = value;
            } else if (id === "sumBoxes") {
                sumBoxes.current = value;
            }
            setPossibilities(getPossibilities());
        },
        [getPossibilities]
    );

    const handleChangeCheckboxes = useCallback((isChecked: boolean, number: number, type: "required" | "invalid") => {
        const updateArray = (prev: number[]) => {
            if (isChecked) {
                return [...prev, number];
            } else {
                return prev.filter((n) => n !== number);
            }
        };

        if (type === "required") {
            setRequired(updateArray);
        } else if (type === "invalid") {
            setInvalid(updateArray);
        }
    }, []);

    const getFrequencies = useCallback(() => {
        const frequencies = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
        const visiblePossibilities = possibilities.filter((pos) => !pos.hidden);
        const total = visiblePossibilities.length;

        visiblePossibilities.forEach((pos) => {
            pos.possibility.forEach((number) => {
                frequencies[number as keyof typeof frequencies] += 1;
            });
        });

        return Object.entries(frequencies).map(([number, count]) => ({
            number,
            percentage: total === 0 ? 0 : count / total,
        }));
    }, [possibilities]);

    return (
        <div className="flex flex-col gap-4 mx-4 items-center mb-12 justify-center">
            <h1 className="text-4xl mt-4 font-bold">Sudoku Killer Helper</h1>
            <SliderComponent
                label="Amount of squares"
                defaultValue={3}
                min={2}
                max={9}
                onChange={(value) => handleChangeSlider(value, "amountBoxes")}
            />
            <SliderComponent
                label="Sum of boxes"
                defaultValue={19}
                min={3}
                max={45}
                onChange={(value) => handleChangeSlider(value, "sumBoxes")}
            />
            <CheckboxGroup
                label="Required Values"
                numbers={sudokuNumbers}
                onChange={(isChecked, number) => handleChangeCheckboxes(isChecked, number, "required")}
            />
            <CheckboxGroup
                label="Invalid Values"
                numbers={sudokuNumbers}
                onChange={(isChecked, number) => handleChangeCheckboxes(isChecked, number, "invalid")}
            />
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {possibilities.map((possibility, index) => (
                    <CombinationCard
                        key={index}
                        possibility={possibility}
                        index={index}
                        setPossibilities={setPossibilities}
                    />
                ))}
            </div>
            <FrequencyDisplay frequencies={getFrequencies()} />
        </div>
    );
}
