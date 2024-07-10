import { Button, TextField, Paper, Typography } from "@mui/material";
import { useContext } from "react";

import Base from "./Base";
import { UserContext } from "../context/BaseContext";
import { Navigate, redirectDocument } from "react-router-dom";

const inputStyle = {
    marginBottom: "16px",
    marginTop: "16px"
}

function Login() {
    let user = useContext(UserContext)
    
    function handleLogin() {
        user = {
            username: 'topolino',
            token: '123asdas',
            logged: true
        }
        console.log('login', user)
    }
    if(user?.logged) {
        return <Navigate to="/home" />
    }
    return <Base>
        <Paper sx={{display: "flex", flexDirection: "column", padding: "24px"}}>
            <Typography component="h1" variant="h1">
                login
            </Typography>
            <TextField sx={inputStyle} label="username" placeholder="inserisci il nome utente"/>
            <TextField sx={inputStyle} label="password" placeholder="inserisci la password"/>
            <Button onClick={handleLogin}>Login</Button>
        </Paper>
    </Base>
}

export default Login