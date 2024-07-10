import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { ShoppingBasket as ShoppingBasketIcon, RemoveCircle as RemoveCircleIcon } from "@mui/icons-material"

import { Product } from "../../types/Product.types"

interface Props {
    cart: Product[],
    drawerOpen: boolean,
    setDrawerOpen: (p: boolean) => void,
    handleRemoveItem: (p: number) => void
}

function Cart({cart, drawerOpen, setDrawerOpen, handleRemoveItem }: Props) {

    return <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
    <List>
        <ListItem>
                <Typography variant="h5" sx={{marginRight: "16px"}}>Carrello</Typography>
                <ListItemIcon>
                    <ShoppingBasketIcon />
                </ListItemIcon>
        </ListItem>
        { cart.map( (p: Product) => <ListItem key={p.id}>
                <ListItemText primary={p.title} />
                <ListItemText secondary={p.price} sx={{marginLeft: "16px", marginRight: "16px" }}/>
                <IconButton onClick={() =>  handleRemoveItem(p.id) }><RemoveCircleIcon /></IconButton>
            </ListItem> )
        }
        <ListItem>
            <ListItemText primary="Totale" />
            <ListItemText sx={{fontWeight: "bold", color: "red", marginLeft: "16px"}}
                primary={cart.reduce((p, c: Product) => p + c.price, 0)} />
        </ListItem>
    </List>
    
    </Drawer>
}

export default Cart