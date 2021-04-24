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
    defaultValue:any;
}

const SelectController = ({ name, label, onChange, options, value ,defaultValue}: selectProps) => {
    console.log(options)
    return (
        <FormControl size="small" variant="outlined" className="formControl">
            <InputLabel htmlFor="outlined-age-native-simple">{label}</InputLabel>
            <Select
                native
                value={value}
                label={label}
                onChange={(e)=>{debugger;onChange(e)}}
                defaultValue={defaultValue}
                inputProps={{
                    name: name,
                    id: 'outlined-age-native-simple',
                }}
            >
                <option aria-label="None" value="" />
                {options.map(option => {
                    debugger
                    return (
                        <option value={option.value}>{option.label} </option>
                    )
                })
                }
            </Select>
        </FormControl>
    )
}
export default SelectController