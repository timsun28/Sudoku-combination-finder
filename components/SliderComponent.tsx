import React from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

interface SliderComponentProps {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
}

export const SliderComponent: React.FC<SliderComponentProps> = ({ label, value, min, max, onChange }) => {
    const id = `${label.toLowerCase()}-label`;

    return (
        <div className="w-full">
            <Typography id={id} gutterBottom>
                {label}: {value}
            </Typography>
            <Slider
                value={value}
                step={1}
                min={min}
                max={max}
                marks
                valueLabelDisplay="auto"
                aria-labelledby={id}
                onChange={(_, value) => onChange(value as number)}
            />
        </div>
    );
};
