import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxGroupProps {
    label: string;
    numbers: number[];
    selectedNumbers: number[];
    onChange: (numbers: number[]) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, numbers, selectedNumbers, onChange }) => {
    const handleChange = (number: number, isChecked: boolean) => {
        if (isChecked) {
            onChange([...selectedNumbers, number]);
        } else {
            onChange(selectedNumbers.filter((n) => n !== number));
        }
    };

    return (
        <div className="space-y-3">
            <Label className="text-base font-medium">{label}</Label>
            <div className="grid grid-cols-5 md:grid-cols-9 gap-2">
                {numbers.map((number) => (
                    <div key={number} className="flex flex-col items-center space-y-2">
                        <Checkbox
                            id={`${label}-${number}`}
                            checked={selectedNumbers.includes(number)}
                            onCheckedChange={(checked) => handleChange(number, checked as boolean)}
                        />
                        <Label
                            htmlFor={`${label}-${number}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                            {number}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    );
};
