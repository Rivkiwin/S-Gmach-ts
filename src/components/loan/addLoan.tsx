import { Button, FormControl, Snackbar, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { AnyAaaaRecord } from "node:dns";
import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom";
import { Loan, loanControllers } from "../../modles/loan.modle"
import CheckboxController from "../model/from/checkBoxs";
import DateController from "../model/from/date";
import InputText from "../model/from/input";
import SelectController from "../model/from/select";
import TextArea from "../model/from/texrArea";
import { t } from "../model/t";
import UsersList from "../users/usersList";
import AddBorrower from "./addBorrower";

let newLoan: any = new Loan();
const AddLoan = ({ isShowing, toggle }: any) => {
    const [open, setOpen] = useState(false);
    const [showBorrower, setShow] = useState(false);
    const [month, setMonth] = useState(1);
    const [dateEnd, setDateEnd] = useState(new Date());
    const [trigger, setTrigger] = useState(false);
    const [monthStart, setMonthStart] = useState(new Date());

    let numMonthRef :any= {};
    let endRef:any = {};
    function onMonthChange(month: number) {

    }
    function setRef(ref: any) {

        endRef = ref;
    }
    useEffect(() => {
        newLoan.dateStart = monthStart;
        let endD = new Date(monthStart);
        debugger
        endD.setMonth(endD.getMonth() + 1);
        newLoan.numMonth = 1;
        if (endRef && numMonthRef) {
            endRef.value = endD.toISOString().slice(0,10);
            numMonthRef.value='1'
        }
   
        setTrigger(!trigger);


    }, [monthStart])


    const handleChange = (event: any) => {
        newLoan[event.target.name] = event.target.value;
    };
    function setEnd(e: any) {
        let endDate = new Date(e.target.value);
        console.log(endRef);
        debugger
        endDate.setDate(newLoan.dateStart.getDate());
        e.target.value = endDate.toISOString().split('T')[0];
        setTrigger(!trigger);
    }

    useEffect(() => {
        let endDate = dateEnd;
        var months;
        months = (endDate.getFullYear() - newLoan.dateStart.getFullYear()) * 12;
        months -= newLoan.dateStart.getMonth();
        months += endDate.getMonth();
        console.log(months <= 0 ? 1 : months);
        setDateEnd(endDate);
    }, [dateEnd])

    return (
        isShowing ? ReactDOM.createPortal(
            <React.Fragment>
                <div className="model-w">
                    <div className="card mt-12 m-1">
                        <div className="txt-left">
                            <Button variant="outlined" color="primary" onClick={toggle}>
                                <span aria-hidden="true">&times;</span></Button>
                        </div>
                        <form id="form" className={"from w-90 m-u"} noValidate autoComplete="off">
                            <FormControl >
                                <DateController
                                    name={'startDate'}
                                    label={'תאריך התחלה'}
                                    defaultVale={newLoan.dateStart}
                                    onChange={(e: any) => setMonthStart(new Date(e.target.value))} />
                            </FormControl>
                            <FormControl className="mr-1">
                                <DateController refInput={setRef} name={'endDate'} label={'תאריך סיום'} value={dateEnd} defaultVale={dateEnd} onChange={setEnd} />
                            </FormControl>
                            <FormControl className="mr-1">
                                <TextField defaultValue={newLoan.numMonth} variant="outlined"
                                    name={"month"}
                                    id="outlined-helperText"
                                    size="small"
                                    label={"מספר חודשים"}
                                    inputRef={input => (numMonthRef = input)}
                                    type={'number'}
                                    InputProps={{
                                        inputProps: {
                                            min: 1,
                                        }
                                    }}
                                    onChange={(e) => newLoan.numMonth = +e.target.value}
                                    required={true}
                                />
                            </FormControl>

                            {loanControllers.map((row, index) => {
                                return (
                                    <div >
                                        {row.map((c) => {
                                            return (
                                                <FormControl className={`formControl ${c.type == "textArea" ? 'w-90 m-u' : ''}`} key={index}>
                                                    {c.type == "checkBox" && <CheckboxController name={c.name} label={c.label} value={"true"} defaultVale={newLoan[c.name]} onChange={handleChange} />}
                                                    {c.type == "textArea" && <TextArea name={c.name} defaultVale={newLoan[c.name]} type={c.type} required={c.required} label={c.label} onChange={handleChange} />}
                                                    {c.type == "date" && <DateController name={c.name} label={c.label} defaultVale={newLoan[c.name]} value={newLoan[c.name]} onChange={handleChange} />}
                                                    {(c.type == "text" || c.type == "email" || c.type == "number") &&
                                                        <InputText name={c.name} defaultVale={newLoan[c.name]} type={c.type} required={c.required} label={c.label} onChange={handleChange} />}
                                                    {c.type == "select" && <SelectController name={c.name} defaultValue={newLoan[c.name]} label={c.label} onChange={handleChange} options={c.options ?? []} />}
                                                </FormControl>
                                            )

                                        })}
                                    </div>)
                            })}
                            <AddBorrower newLoan={newLoan} />
                        </form>
                    </div>
                    <Snackbar open={open} autoHideDuration={6000} >
                        <Alert onClose={() => setOpen(false)} severity="success">
                            add success!
                </Alert>
                    </Snackbar>
                </div>
            </React.Fragment>, document.body) : null)

}

export default AddLoan