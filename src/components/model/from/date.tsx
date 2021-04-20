import { InputProps, TextField } from "@material-ui/core";
import React from "react";
import { InputTextProps } from "./input";

const DateController = ({ label, value, onChange, name }: InputTextProps) => {
  return (
    <TextField
      id="date"
      name={name}
      onChange={onChange}
      label={label}
      type="date"
      defaultValue="2017-05-24"
      size="small"
      className={"controller"}
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
}
export default DateController