import React, { useState } from "react"
import { Box, TextField } from '@material-ui/core';


export class InputTextProps {
    name: string = "";
    label?: string;
    value?: any;
    required?: boolean;
    ref?: any;
    onChange: any;
    type?: string;
    defaultVale?: any;
}


const TextArea = ({ name, label, value, required, onChange, type, defaultVale }: InputTextProps) => {

    return (
        <Box sizeWidth="75%">
            <TextField className="w-90" defaultValue={defaultVale} variant="outlined"
                name={name}
                id="outlined-helperText"
                size="small"
                label={label}
                type={type}
                onChange={onChange}
                required={required}
                multiline
            >
            </TextField>
        </Box>
    )
}

export default TextArea;
