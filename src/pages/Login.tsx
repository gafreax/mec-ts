import { Button, TextField, Paper, Typography, Alert } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { Error as ErrorIcon } from '@mui/icons-material';
import { Navigate } from "react-router-dom";

import Base from "./Base";
import { CurrentUserContext } from "../context/BaseContext";
import { SetUser, User } from "../types/User.types";

interface LoginInterface {
    user: User,
    setUser:  SetUser
}

async function login( { user, setUser }: LoginInterface) {
    const { username, password  } = user
    try {
        const body = JSON.stringify({ username, password })
        console.log(" il body che invieremo sara ", body)
        const data = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        })
        const json = await data.json()
        console.log(json)
        if(!json.token) {
            throw new Error("Autenticazione errata")
        }
        setUser({username, password, token: json.token, logged: true })
    } catch (error) {
        const errorMessage = (error as Error).message
        console.error("err mesg", errorMessage)
        setUser( (user:User) => ({...user, error: errorMessage}))
    }
}

const inputStyle = {
    marginBottom: "16px",
    marginTop: "16px"
}

// ulteriori dettagli sulla api qui: https://dummyjson.com/docs/auth#auth-login
// utente di esempio: username: emilys, password: emilyspass
function Login() {
    const { user, setUser } = useContext(CurrentUserContext)
    const userRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()

    function handleLogin() {
        if(setUser === undefined) { // utile solo a far un check
            return
        }
        if(!userRef?.current?.value || !passwordRef?.current?.value) {
            setUser( (user: User) => ({...user, error: "Utente o Password errati"}))
            return
        }
        login({ setUser, user: { 
            username: userRef.current.value,
            password: passwordRef.current.value,
            logged: false
        }})
    }

    if(user?.logged) {
        return <Navigate to="/home" />
    }

    return <Base>
        <Paper sx={{display: "flex", flexDirection: "column", padding: "24px"}}>
            <Typography component="h1" variant="h1">
                login
            </Typography>
            { user?.error && 
            <Alert icon={<ErrorIcon />} severity="error" sx={{marginY: "16px"}}>
                Errore: { user.error }
            </Alert> 
            }
            <TextField required inputRef={userRef} name="username" sx={inputStyle} label="username" placeholder="inserisci il nome utente"/>
            <TextField required type="password" inputRef={passwordRef} name="password" sx={inputStyle} label="password" placeholder="inserisci la password"/>
            <Button onClick={handleLogin}>
                Login
            </Button>
        </Paper>
    </Base>
}

export default Login