import { InputProps, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { InputTextProps } from "./input";

const DateController = ({ label, value, onChange, name, refInput }: InputTextProps) => {
  const [defaultVale, setDefault] = useState<any>(getDefaultVale())

  function getDefaultVale() {

    if (!value) { value = new Date() }

    if (value && !(typeof (value) == "string")) {
      return `${value.getFullYear()}-${(value.getMonth() + 1) < 10 ? '0' + (value.getMonth() + 1) : value.getMonth() + 1}-${(value.getDate()) < 10 ? '0' + value.getDate() : value.getDate()}`;
    }
    else {
      return value
    }

  }



  useEffect(() => {
    console.log(defaultVale)
  }, [defaultVale])
  return (
    <TextField
      id="date"
      inputRef={input=>{if(refInput)refInput(input,name)}}
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