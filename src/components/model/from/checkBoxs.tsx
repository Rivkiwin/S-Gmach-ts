import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { InputTextProps } from "./input";



 

const CheckboxController = ({ label, name, onChange,value }: InputTextProps) => {
  return (
    <FormControlLabel
      control={<Checkbox name={name} onChange={onChange} value={value} />}
      label={label}
    />
  );
};


export default CheckboxController;