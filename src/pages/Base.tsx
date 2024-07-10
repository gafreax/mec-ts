import { Grid } from "@mui/material"
import Navbar from "../components/navbar"

interface Props {
    children: JSX.Element,
    setSearch?: (p: string) => void,
    setDrawerOpen?: (p: boolean) => void
}

function Base({children, setSearch, setDrawerOpen }: Props) {

    return <Grid container spacing={2} fixed="true">
        <Grid item xs={12}>
            <Navbar setDrawerOpen={setDrawerOpen} setSearch={setSearch}/>
        </Grid>
        <Grid item xs={0} md={2}></Grid>
        <Grid item xs={12} md={8}>
            {children}
        </Grid>
        <Grid item xs={0} md={2}></Grid>
    </Grid>
}

export default Base