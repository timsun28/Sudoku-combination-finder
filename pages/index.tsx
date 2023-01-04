import React, { useRef, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import LinearProgress from "@mui/material/LinearProgress";

type Posibility = {
    possibility: Array<number>;
    key: number;
    style: string;
    hidden?: boolean;
};

export default function App() {
    const sudokuNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // const [amountBoxes, setAmountBoxes] = useState(3);
    const amountBoxes = useRef(3);
    const sumBoxes = useRef(19);
    // const [sumBoxes, setSumBoxes] = useState(19);
    const [required, setRequired] = useState([]);
    const [invalid, setInvalid] = useState([]);
    const [possibilities, setPossibilities] = useState<Posibility[]>(() => getPossibilities());

    function getPossibilities() {
        const allPossibilities = [];
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

        let correctPossibilities: Array<Array<number>> = [];
        allPossibilities.forEach((res) => {
            if (res.reduce((a, b) => a + b, 0) === sumBoxes.current) {
                correctPossibilities.push(res);
            }
        });

        required.forEach((req) => {
            correctPossibilities = correctPossibilities.filter((el) => el.includes(req));
        });

        invalid.forEach((req) => {
            correctPossibilities = correctPossibilities.filter((el) => !el.includes(req));
        });
        const mappedCorrectPossibilities = correctPossibilities.map((pos, index) => {
            return { possibility: pos, key: index, style: "primary" };
        });
        return mappedCorrectPossibilities;
    }

    function handleChangeSlider(value: number | number[], id: "amountBoxes" | "sumBoxes") {
        if (Array.isArray(value)) return;
        if (id === "amountBoxes") {
            amountBoxes.current = value;
        } else if (id === "sumBoxes") {
            sumBoxes.current = value;
        }
        setPossibilities(getPossibilities());
    }

    function handleChangeCheckboxes(isChecked: boolean, number: number, type: "required" | "invalid") {
        const currentArray = type === "required" ? required : invalid;
        if (isChecked) {
            currentArray.push(number);
        } else {
            const index = currentArray.indexOf(number);
            if (index !== -1) currentArray.splice(index, 1);
        }

        if (type === "required") {
            setRequired(currentArray);
        } else if (type === "invalid") {
            setInvalid(currentArray);
        }
        setPossibilities(getPossibilities());
    }

    function toggleBackgroundColorPaper(paperId: number) {
        const clickedPossibilityIndex = possibilities.findIndex((pos) => {
            return pos.key === paperId;
        });
        possibilities[clickedPossibilityIndex].hidden = !possibilities[clickedPossibilityIndex].hidden;
        setPossibilities([...possibilities]);
    }

    function getCheckboxes(type: "required" | "invalid") {
        return sudokuNumbers.map((number) => {
            return (
                <FormControlLabel
                    value="top"
                    control={
                        <Checkbox
                            color="primary"
                            onChange={(e) => handleChangeCheckboxes(e.target.checked, number, type)}
                        />
                    }
                    label={number}
                    key={number}
                    labelPlacement="bottom"
                />
            );
        });
    }

    function getCombinationCards() {
        return possibilities.map((data) => {
            const color = data.hidden ? "#AA3939" : "#3f51b5";
            return (
                <Grid key={data.key} item xs={4}>
                    <Paper
                        style={{ color: "white", backgroundColor: color, padding: 15, textAlign: "center" }}
                        onClick={() => {
                            toggleBackgroundColorPaper(data.key);
                        }}
                    >
                        <b>{data.possibility.join(" ")}</b>
                    </Paper>
                </Grid>
            );
        });
    }

    function getFrequencies() {
        const frequencies = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
        const visiblePossibilities = possibilities.filter((pos) => !pos.hidden);
        const total = visiblePossibilities.length;

        visiblePossibilities.forEach((pos) => {
            pos.possibility.forEach((number) => {
                frequencies[number] += 1;
            });
        });

        return Object.keys(frequencies).map((freq) => {
            const percentage = frequencies[freq] === 0 ? 0 : frequencies[freq] / total;
            return (
                <Grid key={freq} item xs={4}>
                    {freq}: {Math.round(percentage * 100)} %{" "}
                    <LinearProgress
                        aria-label={`Chances of finding a ${freq} is currently ${percentage * 100}%`}
                        key={freq}
                        variant="determinate"
                        value={percentage * 100}
                    />
                </Grid>
            );
        });
    }

    return (
        <Container fixed={false} maxWidth={"md"} style={{ marginBottom: "2rem" }}>
            <h1>Sudoku Killer Helper</h1>
            <Typography id="amount-of-squares-label" gutterBottom>
                Amount of squares:
            </Typography>
            <Slider
                defaultValue={3}
                step={1}
                min={2}
                max={9}
                marks
                valueLabelDisplay={"on"}
                aria-labelledby={"amount-of-squares-label"}
                onChangeCommitted={(e, value) => handleChangeSlider(value, "amountBoxes")}
            />
            <Typography id="sum-of-boxes-label" gutterBottom>
                Sum of boxes:
            </Typography>
            <Slider
                defaultValue={19}
                step={1}
                min={3}
                max={45}
                marks
                valueLabelDisplay={"on"}
                aria-labelledby={"sum-of-boxes-label"}
                onChangeCommitted={(e, value) => handleChangeSlider(value, "sumBoxes")}
            />
            <FormControl component="fieldset">
                <Typography gutterBottom>Required Values:</Typography>
                <FormGroup aria-label="position" row>
                    {getCheckboxes("required")}
                </FormGroup>
            </FormControl>
            <FormControl component="fieldset">
                <Typography gutterBottom>Invalid Values:</Typography>
                <FormGroup aria-label="position" row>
                    {getCheckboxes("invalid")}
                </FormGroup>
            </FormControl>
            <div style={{ flexGrow: 1, paddingTop: 20 }}>
                <Grid container spacing={3}>
                    {getCombinationCards()}
                </Grid>
            </div>
            <div style={{ flexGrow: 1, paddingTop: 20 }}>
                <Grid container spacing={3}>
                    {getFrequencies()}
                </Grid>
            </div>
        </Container>
    );
}
