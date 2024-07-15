import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"

import { Login as LoginIcon } from "@mui/icons-material"

interface LoginButtonSectionProps {
    logged?: boolean
}

const menuItemSyle = {
    color: "white",
    marginLeft: "16px",
}

function LoginButtonSection({ logged }: LoginButtonSectionProps) {
    if(!logged) {
        return <Link to='/login'>
            <Button className="menuButton">
                <LoginIcon />
                <Typography variant="body1" sx={menuItemSyle}>
                    Login
                </Typography>
            </Button>
        </Link>
    }
}

export default LoginButtonSection