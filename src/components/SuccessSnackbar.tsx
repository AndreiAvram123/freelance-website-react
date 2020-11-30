import {Alert} from "@material-ui/lab";
import {Snackbar} from "@material-ui/core";
import React from "react";

export default function SuccessSnackbar(active:boolean){
    return(
        <Snackbar open={active} autoHideDuration={6000} >
            <Alert severity="success">
                This is a success message!
            </Alert>
        </Snackbar>
    )
}