import { useEffect, useMemo, useState } from "react";
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { ShoppingBasket as ShoppingBasketIcon, RemoveCircle } from "@mui/icons-material"

import Produtcs from "../components/products";

import { Product } from "../types/Product.types"
import Base from "./Base";
import Cart from "../components/cart";

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

    useEffect(() => {
        fetchProducts({ setProducts })
        const oldCart = window.localStorage.getItem('cart')
        if(oldCart) setCart(JSON.parse(oldCart))
    }, [])

    useEffect(() => {
        if(cart) {
            window.localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart])

    useEffect(() => {
        if(cartItem) setCart(oldCart => [...oldCart, cartItem])
    }, [cartItem])

    const filteredProducts = useMemo(() => {
        return products.filter( (p: Product) => p.title.toLowerCase().includes(search.toLowerCase()))
    }, [search, products])

    function handleRemoveItem(id: number) {
        setCart(cart.filter((p: Product) => p.id !== id))
    }

    return <Base setSearch={setSearch} setDrawerOpen={setOpen}>
            <Produtcs products={filteredProducts} setCartItem={setCartItem}/>
            <Cart cart={cart} drawerOpen={open} setDrawerOpen={setOpen} handleRemoveItem={handleRemoveItem} />
    </Base>
}

export default Home;