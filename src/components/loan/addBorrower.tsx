import React, { useState } from 'react'
import { Box, Button, Icon, TextField } from '@material-ui/core'
import ReactDOM from 'react-dom'
import useModal from '../model/useModel'
import UsersList from '../users/usersList'
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import { t } from '../model/t'
import { LoanService } from '../../services/loan.service'

const loanService = new LoanService();
const AddBorrower = ({ newLoan }: any) => {
    const [Borrowers, setBorrowers] = useState<any>({});
    const [Selected, setSelected] = useState<any>({});
    const { isShowing, toggle } = useModal();
    function onSelectBorrower(user: any) {
        debugger
        console.log(user);
        let b = { ...Selected };
        if (b[user._id]) {
            delete b[user._id]
        }
        else {
            b[user._id] = {
                name: user.name
            }
        }
        setSelected(b);
    }
    function add() {
        console.log(newLoan);
        loanService.add(newLoan).then(
            res => console.log(res)
        )
    }

    function addBorrowers() {
        setBorrowers({ ...Borrowers, ...Selected });
        setSelected([])
        toggle();
    }

    function deleteBorrowers(id: string) {
        let b = { ...Borrowers };
        delete b[id];
        setBorrowers({ ...b });
    }

    return (
        isShowing ? ReactDOM.createPortal(
            <React.Fragment>
                <div className="model-w">
                    <div className="card mt-12">
                        <div className="txt-left m-1"><Button variant="outlined" color="primary" onClick={toggle}>
                            <span aria-hidden="true">&times;</span></Button>
                            <Button variant="outlined" color="primary" onClick={addBorrowers}>הוסף</Button>
                        </div>

                        <UsersList onSelect={onSelectBorrower} />
                    </div>
                </div>
            </React.Fragment>, document.body) :
            <div className="m-1" >
                <Button variant="contained" color="primary" onClick={toggle}>הוסף לווים</Button>
                {Object.keys(Borrowers).map((b: any) => {
                    return (
                        <div className="w-90 m-u">
                            <HighlightOffSharpIcon onClick={() => deleteBorrowers(b)} className="vl-middle" color="primary" style={{ fontSize: 30 }} />
                            <Box className="inline mr-1" width="20%">
                                <TextField className="mr-1" variant="outlined"
                                    id="outlined-helperText"
                                    size="small"
                                    label={'סכום'}
                                    type='number'
                                    onChange={(e) => Borrowers[b].amount = e.target.value}
                                />
                            </Box>
                            <Box className="inline mr-1" width="50%">
                                <TextField fullWidth defaultValue={Borrowers[b].remarks} variant="outlined"
                                    name={'remarks'}
                                    id="outlined-helperText"
                                    size="small"
                                    label={"הערות"}
                                    onChange={(e) => Borrowers[b].remarks = e.target.value}
                                />
                            </Box>
                            <p className="inline mr-1">{Borrowers[b].name}</p>

                        </div>
                    )
                })}
                {<Button disabled={Object.keys(Borrowers).length == 0} variant="contained" onClick={() => add()} color="primary">{t.save}</Button>
                }
            </div>)
}
export default AddBorrower