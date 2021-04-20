// import classes from "*.module.css";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import React from "react";
import { InputTextProps } from "./input";

export class selectProps implements InputTextProps {
    name: string = "";
    label?: string | undefined;
    value?: string | undefined;
    required?: boolean | undefined;
    ref?: any;
    onChange: any;
    options: { label: string, value: string }[] = [];
}

const SelectController = ({ name, label, onChange, options, value }: selectProps) => {
    return (
        <FormControl variant="outlined" className="formControl">
            <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
            <Select
                native
                value={value}
                label={label}
                // size="small"
                onChange={onChange}
                inputProps={{
                    name: name,
                    id: 'outlined-age-native-simple',
                }}
            >
                <option aria-label="None" value="" />
                {options.map(option => {
                    debugger
                    return (
                        <option value={option.value}>{option.label}</option>
                    )
                })
                }
            </Select>
        </FormControl>
    )
}
export default SelectController