import { ChangeEvent } from "react"
import { AppBar, Button, TextField, Toolbar, Typography } from "@mui/material"
import { Menu } from "@mui/icons-material"

import './style.scss'

const displayOnlyOnMedium = { display: {
    xs: "none",
    md: "block"
}}

const searchFieldSize = {
    width: {
        xs: "320px",
        sm: "480px",
        md: "640px"
    },
}

interface Props {
    setDrawerOpen?: (p: boolean) => void
    setSearch: (p: string) => void
}

type SearchChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

function Navbar({ setDrawerOpen, setSearch }: Props) {
    function handleSearch(event: SearchChangeEvent) {
        if(event.currentTarget.value === "" && setSearch) setSearch("")
        if(event.currentTarget.value.length < 3) return
        setSearch(event.currentTarget.value)
    }

    return <AppBar position="static">
        <Toolbar className="toolbar">
            <Button className="menuButton" onClick={() => setDrawerOpen && setDrawerOpen(true)}>
                <Menu /><Typography variant="body1" color={"white"} sx={displayOnlyOnMedium}>Menu</Typography>
            </Button>
            <TextField onChange={ handleSearch } placeholder="Cerca..." size="small" className="search" sx={searchFieldSize}/>
            <Typography variant="h6" sx={displayOnlyOnMedium}>Musa eCommerce</Typography>
        </Toolbar>
    </AppBar>
}

export default Navbar