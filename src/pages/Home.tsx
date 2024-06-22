import React from "react";
import { Product } from "../types/Product.types"

interface Props {
    products: Product[]
}

function Home({ products }: Props) { 
    return <>
        <h1>Home</h1>
        { products?.map((product: Product) => <div key={product.id}>{product.title}</div>) }
    </>
}

export default Home;