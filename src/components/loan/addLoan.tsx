import { Button, FormControl, Snackbar, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom";
import { Loan, loanControllers } from "../../modles/loan.modle"
import CheckboxController from "../model/from/checkBox";
import DateController from "../model/from/date";
import InputText from "../model/from/input";
import SelectController from "../model/from/select";
import TextArea from "../model/from/texrArea";
import AddBorrower from "./addBorrower";

let newLoan: any = new Loan();
const AddLoan = ({ isShowing, toggle }: any) => {
    const [open, setOpen] = useState(false);
    const [showBorrower, setShow] = useState(false);
    const [month, setMonth] = useState(1);
    const [dateEnd, setDateEnd] = useState(new Date());
    const [trigger, setTrigger] = useState(false);
    const [AutomaticDivision, setDivision] = useState(true);
    const [monthStart, setMonthStart] = useState(new Date());
    const [refs, setRefs] = useState<any>({});
    const _refs: any = {}

    function onMonthChange(month: number) {
        newLoan.numMonth = month;
        if (refs.endDate) {
            let endD = new Date(newLoan.dateStart);
            endD.setMonth(endD.getMonth() + month)
            refs.endDate.value = endD.toISOString().slice(0, 10);
        }
        if (refs.numPayments && month < refs.numPayments.value) {
            refs.numPayments.value = month;
            refs.monthlyRepayments.value = newLoan.amount / refs.numPayments.value;
        }
    }

    const setRef = (ref: any) => {
        if (ref)
            refs[ref?.name] = ref;
        // console.log("ddd")
        // setRefs({..._refs});
    }
    useEffect(() => {
        setRefs(_refs);
        console.log(_refs)
    }, [])

    useEffect(() => {
        try {
            newLoan.dateStart = monthStart;
            let endD = new Date(monthStart);
            endD.setMonth(endD.getMonth() + 1);
            newLoan.numMonth = 1;
            if (refs.endDate && refs.month) {
                refs.endDate.value = endD.toISOString().slice(0, 10);
                refs.month.value = '1'
                refs.monthlyRepayments.value = newLoan.amount;
                refs.numPayments.value = '1';
            }
        }
        catch { }
    }, [monthStart])


    const handleChange = (event: any) => {
        if (event.target.name == "numPayments") {
            if (event.target.value > refs.month.value || event.target.value <= 0) {
                event.target.value = refs.month.value;
            }
            refs.monthlyRepayments.value = newLoan.amount / + refs.numPayments.value;
        }
        newLoan[event.target.name] = event.target.value;
    };

    function setEnd(e: any) {
        try {
            let endDate = new Date(e.target.value);
            endDate.setDate(newLoan.dateStart.getDate());
            e.target.value = endDate.toISOString().split('T')[0];
            let months = (endDate.getFullYear() - newLoan.dateStart.getFullYear()) * 12;
            months -= newLoan.dateStart.getMonth();
            months += endDate.getMonth();
            if (refs.month)
                refs.month.value = months <= 0 ? 1 : months;
            if (refs.numPayments && refs.month.value < refs.numPayments.value) {
                refs.numPayments.value = months <= 0 ? 1 : months;
                refs.monthlyRepayments.value = newLoan.amount / refs.numPayments.value;
            }
        }
        catch { }
    }



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
                            <FormControl className="mr-1">
                                <DateController
                                    name={'startDate'}
                                    label={'תאריך התחלה'}
                                    defaultVale={newLoan.dateStart}
                                    onChange={(e: any) => setMonthStart(new Date(e.target.value))} />
                            </FormControl>
                            <FormControl className="mr-1">
                                <DateController
                                    refInput={setRef}
                                    name={'endDate'}
                                    label={'תאריך סיום'}
                                    value={dateEnd} defaultVale={dateEnd} onChange={setEnd} />
                            </FormControl>
                            <FormControl className="mr-1">
                                <TextField defaultValue={newLoan.numMonth} variant="outlined"
                                    name={"month"}
                                    id="outlined-helperText"
                                    size="small"
                                    label={"מספר חודשים"}
                                    inputRef={input => setRef(input)}
                                    type={'number'}
                                    InputProps={{
                                        inputProps: {
                                            min: 1,
                                        }
                                    }}
                                    onChange={(e) => { onMonthChange(+e.target.value) }}
                                    required={true}
                                />
                            </FormControl>
                            <FormControl className="mr-1">
                                <TextField defaultValue={newLoan.amount} variant="outlined"
                                    name={"monthlyRepayments"}
                                    disabled
                                    id="outlined-helperText"
                                    size="small"
                                    label={"תשלום חודשי"}
                                    inputRef={(input) => setRef(input)}
                                    type={'number'}
                                    InputProps={{
                                        inputProps: {
                                            min: 1,
                                        }
                                    }}
                                    onChange={(e) => { onMonthChange(+e.target.value) }}
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
                                                        <InputText refInput={setRef} name={c.name} defaultVale={newLoan[c.name]} type={c.type} required={c.required} label={c.label} onChange={handleChange} />}
                                                    {c.type == "select" && <SelectController name={c.name} defaultValue={newLoan[c.name]} label={c.label} onChange={handleChange} options={c.options ?? []} />}
                                                </FormControl>
                                            )

                                        })}
                                    </div>)
                            })}
                            {<AddBorrower newLoan={newLoan} setDivision={setDivision} AutomaticDivision={AutomaticDivision} refAmount={refs.amount} />}
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