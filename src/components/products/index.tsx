import { Grid } from "@mui/material";

import ProductCard from "../product-card";
import { Product } from "../../types/Product.types";
import ProductSkeleton from "../product-skeleton";

interface Props {
    products: Product[],
    loading: boolean,
    setCartItem: (p: Product) => void
}

function Produtcs({ products, setCartItem, loading }: Props) {

    return <Grid container spacing={2}>
        { loading ?
            <>
                <Grid item sx={{ px: { xs: "8px", sm: "2px" } }} xs={12} md={6} lg={4} xl={3} key={'sk1'}>
                    <ProductSkeleton />
                </Grid>
                <Grid item sx={{ px: { xs: "8px", sm: "2px" } }} xs={12} md={6} lg={4} xl={3} key={'sk2'}>
                    <ProductSkeleton />
                </Grid>
                <Grid item sx={{ px: { xs: "8px", sm: "2px" } }} xs={12} md={6} lg={4} xl={3} key={'sk3'}>
                    <ProductSkeleton />
                </Grid>
            </>
            :
            products?.filter(product => product).map(product =>
                <Grid item sx={{ px: { xs: "8px", sm: "2px" } }} xs={12} md={6} lg={4} xl={3} key={product.id}>
                    <ProductCard product={product} setCartItem={setCartItem} />
                </Grid>
            )
        }
    </Grid>
}

export default Produtcs