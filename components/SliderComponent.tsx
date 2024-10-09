import React from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

interface SliderComponentProps {
  label: string;
  defaultValue: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export const SliderComponent: React.FC<SliderComponentProps> = ({
  label,
  defaultValue,
  min,
  max,
  onChange,
}) => {
  return (
    <>
      <Typography id={`${label.toLowerCase()}-label`} gutterBottom>
        {label}:
      </Typography>
      <Slider
        defaultValue={defaultValue}
        step={1}
        min={min}
        max={max}
        marks
        valueLabelDisplay="on"
        aria-labelledby={`${label.toLowerCase()}-label`}
        onChangeCommitted={(e, value) => onChange(value as number)}
      />
    </>
  );
};