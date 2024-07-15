import { useEffect, useMemo, useState } from "react";

import Produtcs from "../components/products";

import { Product } from "../types/Product.types"
import Base from "./Base";
import Cart from "../components/cart";
import { Card, CardContent, CardHeader, CardMedia, Skeleton } from "@mui/material";

interface FetchProductsInterface {
    setProducts: (products: Product[] ) => void
}

async function fetchProducts( { setProducts }: FetchProductsInterface ) {
    const response = await fetch("https://dummyjson.com/products")
    const data = await response.json()
    setProducts(data.products)
}

function Home() {
    const [open, setOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [products, setProducts] = useState<Product[]>([])
    const [cart, setCart] = useState<Product[]>([])
    const [cartItem, setCartItem] = useState<Product>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchProducts({ setProducts })
        const oldCart = window.localStorage.getItem('cart')
        if(oldCart) setCart(JSON.parse(oldCart))
        setTimeout( () => setLoading(false), 3000) // solo per testare caricamento
    }, [])

    useEffect(() => {
        if(cartItem) setCart(oldCart =>  [...oldCart, cartItem])
    }, [cartItem])

    function handleRemoveItem(id: number) {
        setCart(cart.filter((p: Product) => p.id !== id))
    }
    
    const filteredProducts = useMemo(() => {
        return products.filter( (p: Product) => p.title.toLowerCase().includes(search.toLowerCase()))
    }, [search, products])

    return <Base setSearch={setSearch} setDrawerOpen={setOpen}>
        <Produtcs loading={loading} products={filteredProducts} setCartItem={setCartItem}/>
        <Cart cart={cart} drawerOpen={open} setDrawerOpen={setOpen} handleRemoveItem={handleRemoveItem} />
    </Base>
}

export default Home;