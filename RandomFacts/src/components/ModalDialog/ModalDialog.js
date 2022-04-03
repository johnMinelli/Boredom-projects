import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {Button, DialogActions, DialogContent, DialogContentText, Input, TextField} from "@mui/material";
import { collection, getDoc, doc, addDoc, setDoc } from 'firebase/firestore'
import db from "../../firebase.config";


function ModalDialog(props) {
      const { onClose, open } = props;
      let inputValue = "";

      const handleClose = () => {
        onClose();
      };


    async function handleSubmit(){
        let infoRef = doc(db,"/randomfacts/info");
        let max = (await getDoc(infoRef)).data().max;
        setDoc(doc(db, "/randomfacts/"+(max+1)), {text: inputValue});
        setDoc(infoRef, {"max": max+1});
        handleClose();
    }


    function handleChange(s) {
        inputValue = s;
    }

    return (
      <Dialog onClose={handleClose} open={open} className="modal">
        <DialogTitle>Thank you for your contribution!</DialogTitle>
          <DialogContent>
              <DialogContentText style={{marginBottom: 20}}>
                  Please do not abuse 😄 (no spam, dos, troll, ... )
              </DialogContentText>
              <Input multiline={true} autoFocus id="name" onChange={e => handleChange(e.target.value)} style={{ width: "100%" }}></Input>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Send</Button>
          </DialogActions>
      </Dialog>
    );
}

ModalDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default ModalDialog