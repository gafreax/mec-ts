import { useState } from "react";
import { Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { ShoppingBasket } from "@mui/icons-material"

import Navbar from "../components/navbar"
import { Product } from "../types/Product.types"
import Produtcs from "../components/products";

interface Props {
    products: Product[]
}

function Home({ products }: Props) {
    const [open, setOpen] = useState(false)
    return <Grid container spacing={2} fixed="true">
        <Grid item xs={12}>
            <Navbar setDrawerOpen={setOpen} />
        </Grid>
        <Grid item xs={0} md={2}></Grid>
        <Grid item xs={12} md={8}>
            {/* <Produtcs />  // questo per usarlo con redux*/}
            {/* {products?.map((p: Product) => <div key={p.id}>{p.title}</div>)} // stampa solo titolo */}
            <Produtcs products={products} />
        </Grid>
        <Grid item xs={0} md={2}></Grid>
        <Drawer open={open} onClose={() => setOpen(false)}>
            <List>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <ShoppingBasket />
                        </ListItemIcon>
                        <ListItemText primary="Carrello" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    </Grid>
}

export default Home;