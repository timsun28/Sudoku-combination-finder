import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

interface CheckboxGroupProps {
    label: string;
    numbers: number[];
    onChange: (isChecked: boolean, number: number) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, numbers, onChange }) => {
    return (
        <FormControl component="fieldset">
            <Typography gutterBottom>{label}:</Typography>
            <FormGroup aria-label="position" row>
                {numbers.map((number) => (
                    <FormControlLabel
                        key={number}
                        value="top"
                        control={<Checkbox color="primary" onChange={(e) => onChange(e.target.checked, number)} />}
                        label={number}
                        labelPlacement="bottom"
                        className="mx-1"
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
};
