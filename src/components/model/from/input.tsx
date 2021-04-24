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
    defaultVale?:any;
}


const InputText = ({ name, label, value, required, onChange, type,defaultVale }: InputTextProps) => {

    return (

        <TextField defaultValue={defaultVale} variant="outlined"
            name={name}
            id="outlined-helperText"
            size="small"
            label={label}
            type={type}
            onChange={onChange}
            required={required}
        >
        </TextField>
    )
}

export default InputText;


