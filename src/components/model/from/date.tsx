import { InputProps, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { InputTextProps } from "./input";

const DateController = ({ label, value, onChange, name }: InputTextProps) => {
  const [defaultVale, setDefault] = useState<any>(value)

  useEffect(() => {
    if (value && !(typeof (value) == "string")) {
      setDefault(`${value.getFullYear()}-${value.getMonth()}-${value.getDay()}`);
    }
  }, [])
  return (
    <TextField
      id="date"
      name={name}
      onChange={onChange}
      label={label}
      type="date"
      defaultValue={defaultVale}
      size="small"
      className={"controller"}
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
}
export default DateController