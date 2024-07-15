import { Button } from "@mui/material"
import { Logout as LogoutIcon } from "@mui/icons-material"

interface LogoutButtonSectionProps {
    logged?: boolean,
    logout: () => void
}

function LogoutButtonSection({ logged, logout }: LogoutButtonSectionProps) {
    if(logged) {
        return <Button className="menuButton" onClick={logout}>
            <LogoutIcon />
        </Button>
    }
}

export default LogoutButtonSection