import React, { useState } from 'react';
import { createStyles, FormControlLabel, FormLabel, Input, InputLabel, makeStyles, Switch, TextField, Theme } from '@material-ui/core';
import ReactDOM from 'react-dom';
import { FormControl } from '@material-ui/core';

// import { makeStyles } from '@material-ui/core/styles';
// import FilledInput from '@material-ui/core/FilledInput';
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputText from './from/input';
import FormCheckBox from './from/checkBoxs';
import CheckboxController from './from/checkBoxs';
import SelectController from './from/select';
import DateController from './from/date';

export interface controller {
    name: string,
    type: string,
    default?: string,
    label?: string,
    options?: any;

}

class AppProps {
    isShowing: boolean | undefined;
    hide: any | undefined;
    OnSubmit: any;
    type: string | undefined;
    header: string | undefined;
    rows: controller[][] = [];
    doc: any
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);
const CreatUpdate = (({ isShowing, hide, OnSubmit, type, header, rows, doc }: AppProps) => {

    const [_doc, SetDoc] = useState({ ...doc });
    const classes = useStyles();
    const User = {
        name: "ron"
    }
    const handleChange = (event:any) => {
        debugger
        doc[event.target.name] = event.target.value;
        debugger
    };

    return (isShowing ? ReactDOM.createPortal(
        <React.Fragment>
            <div className="model-w">
                <div className="card mt-12">
                    <div className="txt-left"><button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </button></div>
                    <form id="form" className={"from"} noValidate autoComplete="off">

                        {rows.map((row, index) => {
                            return (
                                <div >
                                    {row.map((c) => {
                                        debugger
                                        return (
                                            <FormControl className="formControl" key={index}>
                                                {c.type == "checkBox" && <CheckboxController name={c.name} label={c.label} value={"true"} onChange={handleChange} />}
                                                {c.type == "date" && <DateController name={c.name} label={c.label} value={"true"} onChange={handleChange} />}
                                                {(c.type == "text" || c.type == "email" || c.type == "number") && <InputText name={c.name} type={c.type} label={c.label} onChange={handleChange} />}
                                                {c.type == "select" && <SelectController name={c.name} label={c.label} onChange={handleChange} options={c.options ?? []} />}
                                            </FormControl>
                                        )

                                    })}
                                </div>)
                        })}

                        <button type="submit" onClick={() => OnSubmit(doc)}>save</button>
                    </form>

                </div>
            </div>
        </React.Fragment>, document.body) : null)
})

export default CreatUpdate;


