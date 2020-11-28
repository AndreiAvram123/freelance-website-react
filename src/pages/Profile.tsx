import {Button} from "@material-ui/core";
import React from "react";
import {signOut} from "../utils/UserManager";

export default function Profile(){
    return (
        <Button variant="contained" color="primary" onClick={ () =>{
            signOut()
        }}>
            Sign out
        </Button>
    )
}