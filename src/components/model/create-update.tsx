import React, { useState } from 'react';
import { Button, createStyles, FormControlLabel, FormLabel, Input, InputLabel, makeStyles, Switch, TextField, Theme } from '@material-ui/core';
import ReactDOM from 'react-dom';
import { FormControl } from '@material-ui/core';
import InputText from './from/input';
import FormCheckBox from './from/checkBoxs';
import CheckboxController from './from/checkBoxs';
import SelectController from './from/select';
import DateController from './from/date';
import { t } from './t';
import { SHARE_ENV } from 'node:worker_threads';
import TextArea from './from/texrArea';

export interface controller {
    name: string,
    type: string,
    default?: string,
    label?: string,
    required?: boolean;
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
    const handleChange = (event: any) => {
        debugger
        doc[event.target.name] = event.target.value;
    };

    const save = () => {
        let isValid = false;

    }

    return (isShowing ? ReactDOM.createPortal(
        <React.Fragment>
            <div className="model-w">
                <div className="card mt-12">
                    <div className="txt-left"><Button variant="outlined" color="primary" onClick={hide}>
                        <span aria-hidden="true">&times;</span></Button></div>
                    <form id="form" className={"from"} noValidate autoComplete="off">

                        {rows.map((row, index) => {
                            return (
                                <div >
                                    {row.map((c) => {
                                        return (
                                            <FormControl className={`formControl ${c.type == "textArea"?'w-90 m-u':''}`} key={index}>
                                                {c.type == "checkBox" && <CheckboxController name={c.name} label={c.label} value={"true"}  defaultVale={doc[c.name]} onChange={handleChange} />}
                                                {c.type == "date" && <DateController name={c.name} label={c.label} defaultVale={doc[c.name]} value={doc[c.name]} onChange={handleChange} />}
                                                {(c.type == "text" || c.type == "email" || c.type == "number") &&
                                                    <InputText name={c.name} defaultVale={doc[c.name]} type={c.type} required={c.required} label={c.label} onChange={handleChange} />}
                                                {c.type == "select" && <SelectController name={c.name}    defaultValue={doc[c.name]} label={c.label} onChange={handleChange} options={c.options ?? []} />}
                                                {c.type == "textArea" && <TextArea  name={c.name} defaultVale={doc[c.name]} type={c.type} required={c.required} label={c.label} onChange={handleChange}  />}
                                            </FormControl>
                                        )

                                    })}
                                </div>)
                        })}
                        <Button variant="contained" onClick={() => OnSubmit(doc)} color="primary">{t.save}</Button>
                    </form>

                </div>
            </div>
        </React.Fragment>, document.body) : null)
})

export default CreatUpdate;


