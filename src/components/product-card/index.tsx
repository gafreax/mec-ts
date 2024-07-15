import { ShoppingBasket } from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, CardMediaOwnProps, Typography } from "@mui/material"
import styled from '@emotion/styled'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles';

import { Product } from "../../types/Product.types";

import "./style.scss"
import { useContext } from "react";
import { CurrentUserContext } from "../../context/BaseContext";

interface Props {
    product: Product,
    setCartItem: (p: Product) => void
}

const MECCardMedia = styled(CardMedia)<CardMediaOwnProps>`
    height: 300px;
`

interface MECCardHeaderProps { islong: string }

const MECCardHeader = styled(CardHeader)<MECCardHeaderProps>`
    & span {
        text-overflow: ${ props => props.islong === "yes" ? 'ellipsis': 'hidden'};
    }
`

function ProductCard({ product, setCartItem }: Props) {
    const { user } = useContext(CurrentUserContext)
    const theme = useTheme()
    const isMD = useMediaQuery(theme.breakpoints.up('md'))
    const headerCardClassName = isMD ? "cardHeaderMD" : "cardHEaderXs"
    const { title, description, thumbnail } = product

    return <Card className="card" sx={{ height:{xs:"420px", md:"600px"} }}>
        <MECCardHeader title={title} className={headerCardClassName} islong={title?.length > 20 ? "yes": "no"} />
        <MECCardMedia
            image={thumbnail}
            title={title}
        />
        <CardContent sx={{ height: "140px", display:{xs:"none", md:"block"}}}>
            <Typography>{description}</Typography>
        </CardContent>
        <CardActions>
            <Button onClick={() => setCartItem(product)} disabled={!user?.logged}>
                <ShoppingBasket color={ user?.logged ? "primary" : "disabled"} sx={{ marginRight: "16px"}}/> Aggiungi
            </Button>
        </CardActions>
    </Card>
}

export default ProductCard