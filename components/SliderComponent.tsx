import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface SliderComponentProps {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
}

export const SliderComponent: React.FC<SliderComponentProps> = ({ label, value, min, max, onChange }) => {
    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between items-center">
                <Label className="text-base font-medium">{label}</Label>
                <span className="text-sm font-mono bg-secondary px-2 py-1 rounded-md min-w-8 text-center">{value}</span>
            </div>
            <Slider
                value={[value]}
                min={min}
                max={max}
                step={1}
                onValueChange={(vals) => onChange(vals[0])}
                className="py-2"
            />
        </div>
    );
};
