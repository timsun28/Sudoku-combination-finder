import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

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
        <FormControl component="fieldset" className="w-full">
            <Typography gutterBottom>{label}</Typography>
            <FormGroup row className="grid grid-cols-5 md:grid-cols-9 justify-center gap-2">
                {numbers.map((number) => (
                    <FormControlLabel
                        key={number}
                        sx={{
                            margin: 0,
                        }}
                        control={
                            <Checkbox
                                checked={selectedNumbers.includes(number)}
                                onChange={(e) => handleChange(number, e.target.checked)}
                                color="primary"
                            />
                        }
                        label={number}
                        labelPlacement="bottom"
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
};
