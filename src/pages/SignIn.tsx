import React, {useEffect, useState} from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {login} from "../repositories/AuthRepository";
import {isUserLoggedIn} from "../utils/UserManager";
import {navigateHome} from "../helpers/RouterUtils";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {

    if(isUserLoggedIn()){
        window.location.href = "/"
    }

    const classes = useStyles();

     const [usernameValue, setUsernameValue] = useState("")
     const [passwordValue, setPasswordValue] = useState("")

     const[usernameValid, setUsernameValid] = useState(false)
     const[passwordValid, setPasswordValid] = useState(false)

     const[errorMessage,setErrorMessage] = useState("")

    useEffect(()=>{
       setUsernameValid(usernameValue.trim() !=="")
       setPasswordValid(passwordValue.trim() !=="")

    }, [usernameValue, passwordValue])



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="text"
                        onChange={(event) => setUsernameValue(event.target.value) }
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(event)=>
                            setPasswordValue(event.target.value)
                        }
                        autoComplete="current-password"

                    />
                    <Alert severity="error"
                           hidden = {errorMessage.trim() === ""}

                    >{errorMessage}</Alert>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=> login(usernameValue,passwordValue).then(()=>{
                           navigateHome()
                        }).catch((error)=>{
                            setErrorMessage(error)
                        })}
                        disabled={!(usernameValid && passwordValid)}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link  href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
            </Box>
        </Container>
    );
}
