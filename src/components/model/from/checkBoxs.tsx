import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { InputTextProps } from "./input";



 

const CheckboxController = ({ label, name, onChange,value ,defaultVale}: InputTextProps) => {
  return (
    <FormControlLabel
      control={<Checkbox checked={defaultVale==value} name={name} onChange={(e)=> {value=e.target.checked; onChange(e)}} value={value} />}
      label={label}
    />
  );
};


export default CheckboxController;