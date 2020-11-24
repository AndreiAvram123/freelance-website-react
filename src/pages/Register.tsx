import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {register, RegisterResponse} from "../repositories/AuthRepository";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {isEmailValid, isPasswordValid, isUsernameValid} from "../Utils";

enum ErrorMessages{
    ERROR_INVALID_USERNAME = "Invalid username",
    ERROR_INVALID_EMAIL = "Invalid email",
    ERROR_INVALID_PASSWORD = "Invalid password"
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Andrei Avram
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Register() {
    const classes = useStyles();

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [errorMessageEmail, setErrorMessageEmail] = useState("")
    const [errorMessageUsername, setErrorMessageUsername] = useState("")
    const [errorMessagePassword, setErrorMessagePassword] = useState("")

    const [validateEmail,setValidateEmail] = useState(false)
    let  [validateUsername,setValidateUsername] = useState(false)
    let  [validatePassword,setValidatePassword] = useState(false)



    useEffect(()=>{
        if(validateEmail) {
            setErrorMessageEmail("")
            if (!isEmailValid(email)) {
                setErrorMessageEmail(ErrorMessages.ERROR_INVALID_EMAIL)
            }
        }
        if(validateUsername) {
            setErrorMessageUsername("")
            if (!isUsernameValid(username)) {
                setErrorMessageUsername(ErrorMessages.ERROR_INVALID_USERNAME)
            }
        }
        if(validatePassword){
            setErrorMessagePassword("")
            if(!isPasswordValid(password)){
                setErrorMessagePassword(ErrorMessages.ERROR_INVALID_PASSWORD)
            }
        }

    },[username, email, password])


    function areFieldsValid(){
        return isEmailValid(email) && isPasswordValid(password) && isUsernameValid(username)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="text"
                                autoComplete="username"
                                onChange={(event)=>{
                                    setValidateUsername(true)
                                    setUsername(event.target.value)
                                }}
                                helperText={errorMessageUsername}
                                error={errorMessageUsername.trim() !== ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(event) =>{
                                    setValidateEmail(true)
                                    setEmail(event.target.value)
                                }}
                                helperText={errorMessageEmail}
                                error={errorMessageEmail.trim() !== ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(event)=>{
                                    setValidatePassword(true)
                                    setPassword(event.target.value)
                                }}
                                helperText={errorMessagePassword}
                                error={errorMessagePassword.trim() !== ""}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
                            if (areFieldsValid()) {
                                register(username, email, password).then(() => {
                                    window.location.reload()
                                    window.location.href = "/login"
                                }).catch(error => {
                                    switch (error) {
                                        case RegisterResponse.USERNAME_TAKEN : {
                                            setErrorMessageUsername(RegisterResponse.USERNAME_TAKEN)
                                            break;
                                        }
                                        case RegisterResponse.EMAIL_TAKEN : {
                                            setErrorMessageEmail(RegisterResponse.EMAIL_TAKEN)
                                            break;
                                        }
                                    }
                                })
                            }
                        }
                        }
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}