import React, { useState } from "react"
import { TextField } from '@material-ui/core';


export class InputTextProps {
    name: string = "";
    label?: string;
    value?: any;
    required?: boolean;
    ref?: any;
    onChange: any;
    type?: string;
}


const InputText = ({ name, label, value, required, onChange, type }: InputTextProps) => {

    return (

        <TextField defaultValue={value} variant="outlined"
           name={name}
            id="outlined-helperText"
            size="small"
            label={label}
            type={type}
            onChange={onChange}
        >

        </TextField>
    )
}

export default InputText;


