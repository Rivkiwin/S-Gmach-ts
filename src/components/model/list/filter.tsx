import { FormControl } from "@material-ui/core";
import React, { useEffect, useState } from "react"
import DateController from "../from/date";
import InputText from "../from/input";

function getNextDay(date: Date) {
     date.setDate(date.getDate() + 1)
    return date;
}

const Filter = ({ onChange, name, id, type }: any) => {
    const [Value, setValue] = useState('');
    return (
        <div className="filter inline mr-1">
            <FormControl className="formControl ">
                {type == "date" && <DateController  name={id} label={name} onChange={(e: any) => { let date = new Date(e.target.value); onChange({ $gte: e.target.value, $lte:getNextDay(date) }) }} />}
                {(type == "string" || type == "email" || type == "number") &&
                    <InputText  name={id} type={type} label={name} onChange={(e: any) => onChange({ $regex: e.target.value.trim() })} />}
            </FormControl>
            {/* <input type={type} onChange={(e) => onChange(e.target.value)}></input> */}
        </div>
    )
}
export default Filter