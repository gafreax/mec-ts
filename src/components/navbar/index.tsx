import { ChangeEvent, useContext } from "react"
import { AppBar, TextField, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { Home as HomeIcon } from "@mui/icons-material"

import './style.scss'
import { CurrentUserContext } from "../../context/BaseContext"
import LoginButtonSection from "./LoginButtonSection"
import LogoutButtonSection from "./LogoutButtonSection"
import CartButtonSection from "./CartButtonSection"


export const displayOnlyOnMedium = {
    color: "white",
    marginLeft: "16px",
    display: {
        xs: "none",
        md: "block"
    }
}

const displayOnlyOnSmall = {
    color: "white",
    marginLeft: "16px",
    display: {
        xs: "block",
        md: "none"
    }  
}

const searchFieldSize = {
    width: {
        xs: "320px",
        sm: "480px",
        md: "640px"
    },
}

interface Props {
    setDrawerOpen?: (p: boolean) => void
    setSearch?: (p: string) => void
}

type SearchChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

function Navbar({ setDrawerOpen, setSearch }: Props) {
    const { user, setUser } = useContext(CurrentUserContext)

    function handleSearch(event: SearchChangeEvent) {
        if(!setSearch || event.currentTarget.value.length < 3) return
        setSearch(event.currentTarget.value)
    }

    function handleShoppingBasketClick() {
        setDrawerOpen && setDrawerOpen(true)
    }

    function handleLogout() {
        setUser && setUser(user => ({ ...user, logged: false }))
    }

    return <AppBar position="static">
        <Toolbar className="toolbar">
            <CartButtonSection logged={user?.logged} shoppingBasketClick={handleShoppingBasketClick} />
            <LoginButtonSection logged={user?.logged} />

            { setSearch && <TextField onChange={handleSearch} placeholder="Cerca..." size="small" className="search" sx={searchFieldSize}/>}
            <Link to='/home' style={{ textDecoration: "none"}}>
                <HomeIcon sx={displayOnlyOnSmall}/>
                <Typography variant="h6" sx={displayOnlyOnMedium}>
                    Musa eCommerce
                </Typography>
            </Link>
            <LogoutButtonSection logout={handleLogout} logged={user?.logged} />
        </Toolbar>
    </AppBar>
}

export default Navbar