import { ShoppingBasket } from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
// import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles';

import { Product } from "../../types/Product.types";

import "./style.scss"

interface Props {
    product: Product,
    setCartItem: (p: Product) => void
}

const MECCardMedia = styled(CardMedia)`
    height: 300px;
`
const MECCardHeader = styled(CardHeader)`
    & span {
        text-overflow: ${ props => props.islong === "yes" ? 'ellipsis': 'hidden'};
    }
`

function ProductCard({ product, setCartItem }: Props) {
    
    const theme = useTheme()
    const { title, description, thumbnail } = product
    const isMD = useMediaQuery(theme.breakpoints.up('md'));
    const headerCardClassName = isMD ? "cardHeaderMD" : "cardHEaderXs"

    return <Card className="card" sx={{ height:{xs:"420px", md:"600px"} }}>
        <MECCardHeader title={title} className={headerCardClassName} islong={title?.length > 22 ? "yes": "no"} />
        <MECCardMedia component="img" 
            image={thumbnail}
            alt={title}
        />
        <CardContent sx={{ height: "140px", display:{xs:"none", md:"block"}}}>
            <Typography>{description}</Typography>
        </CardContent>
        <CardActions>
            <Button onClick={() => setCartItem(product)}>
                <ShoppingBasket color="primary" sx={{ marginRight: "4px"}}/> Aggiungi
            </Button>
        </CardActions>
    </Card>
}

export default ProductCard