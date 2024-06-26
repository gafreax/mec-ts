import { Grid } from "@mui/material";

import ProductCard from "../product-card";
import { Product } from "../../types/Product.types";

interface Props {
    products: Product[],
    setCartItem: (p: Product) => void
}

function Produtcs({products, setCartItem}: Props) {

    return <Grid container spacing={2}>
            { products?.filter(product => product).map(product => 
                <Grid item sx={{px:{xs:"8px",sm:"2px"}}} xs={12} md={6} lg={4} xl={3} key={product.id}>
                    <ProductCard product={product} setCartItem={setCartItem} />
                </Grid>
            )  
            }
        </Grid> 
}

export default Produtcs