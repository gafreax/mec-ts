import { ChangeEvent, useContext } from "react"
import { AppBar, Button, TextField, Toolbar, Typography } from "@mui/material"
import { ShoppingBasket as ShoppingBasketIcon, Login as LoginIcon, Logout as LogoutIcon, Home as HomeIcon } from "@mui/icons-material"

import './style.scss'
import { Link } from "react-router-dom"
import { UserContext } from "../../context/BaseContext"
const menuItemSyle = {
    color: "white",
    marginLeft: "16px",
}

const displayOnlyOnMedium = {
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
    const user = useContext(UserContext)

    function handleSearch(event: SearchChangeEvent) {
        if(!setSearch || event.currentTarget.value.length < 3) return
        setSearch(event.currentTarget.value)
    }
    function handleShoppingBasketClick() {
        () => setDrawerOpen && setDrawerOpen(true)
    }

    return <AppBar position="static">
        <Toolbar className="toolbar">
            { user ? 
                <Button className="menuButton" onClick={handleShoppingBasketClick}>
                    <ShoppingBasketIcon />
                    <Typography variant="body1" sx={displayOnlyOnMedium}>
                        Carrello
                    </Typography>
                </Button>
            :
                <Link to='/login'>
                    <Button className="menuButton">
                        <LoginIcon />
                        <Typography variant="body1" sx={menuItemSyle}>
                            Login
                        </Typography>
                    </Button>
                </Link>
            }
            { setSearch && <TextField onChange={handleSearch} placeholder="Cerca..." size="small" className="search" sx={searchFieldSize}/>}
            <Link to='/home'>
                <HomeIcon sx={displayOnlyOnSmall}/>
                <Typography variant="h6" sx={displayOnlyOnMedium}>Musa eCommerce</Typography>
            </Link>
            { user &&  <Button className="menuButton">
                <LogoutIcon />
            </Button>
            }
        </Toolbar>
    </AppBar>
}

export default Navbar