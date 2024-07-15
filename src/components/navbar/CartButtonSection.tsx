import { Button, Typography } from "@mui/material"
import { ShoppingBasket as ShoppingBasketIcon, } from "@mui/icons-material"

import { displayOnlyOnMedium  } from "."

interface CartButtonSectionProps {
    logged?: boolean,
    shoppingBasketClick: () => void
}

function CartButtonSection({ logged, shoppingBasketClick}: CartButtonSectionProps) {
    if (logged) {
        return <Button className="menuButton" onClick={shoppingBasketClick}>
            <ShoppingBasketIcon />
            <Typography variant="body1" sx={displayOnlyOnMedium}>
                Carrello
            </Typography>
        </Button>
    }
}

export default CartButtonSection