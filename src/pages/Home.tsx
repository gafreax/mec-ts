import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { ShoppingBasket, RemoveCircle } from "@mui/icons-material"

import Navbar from "../components/navbar"
import Produtcs from "../components/products";

import { Product } from "../types/Product.types"

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
    // const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [cart, setCart] = useState<Product[]>([])
    const [cartItem, setCartItem] = useState<Product>()

    useEffect(() => {
        fetchProducts({ setProducts })
        const oldCart = window.localStorage.getItem('cart')
        console.log("first")
        if(oldCart) setCart(JSON.parse(oldCart))
    }, [])

    useEffect(() => {
        if(cart) {
            console.log("third = update local storage")
            window.localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart])

    useEffect(() => {
        console.log("fourth = update cart")
        if(cartItem) setCart([...cart, cartItem])
    }, [cartItem])  

    // useEffect(() => {
    //     setFilteredProducts( 
    //         products.filter((p: Product) => p.title.toLowerCase().includes(search.toLowerCase()))
    //     )
    // }, [search])

    const filteredProducts = useMemo(() => {
        return products.filter( (p: Product) => p.title.toLowerCase().includes(search.toLowerCase()))
    }, [search, products])

    function handleRemoveItem(id: number) {
        setCart(cart.filter((p: Product) => p.id !== id))
    }

    return <Grid container spacing={2} fixed="true">
        <Grid item xs={12}>
            <Navbar setDrawerOpen={setOpen} setSearch={setSearch}/>
        </Grid>
        <Grid item xs={0} md={2}></Grid>
        <Grid item xs={12} md={8}>
            {/* <Produtcs />  // questo per usarlo con redux*/}
            {/* {products?.map((p: Product) => <div key={p.id}>{p.title}</div>)} // stampa solo titolo */}
            <Produtcs products={filteredProducts} setCartItem={setCartItem}/>
        </Grid>
        <Grid item xs={0} md={2}></Grid>
        <Drawer open={open} onClose={() => setOpen(false)}>
            <List>
                <ListItem>
                        <Typography variant="h5" sx={{marginRight: "16px"}}>Carrello</Typography>
                        <ListItemIcon>
                            <ShoppingBasket />
                        </ListItemIcon>
                </ListItem>
                { cart.map( (p: Product) => <ListItem key={p.id}>
                        <ListItemText primary={p.title} />
                        <ListItemText secondary={p.price} sx={{marginLeft: "16px", marginRight: "16px" }}/>
                        <IconButton onClick={() => handleRemoveItem(p.id) }><RemoveCircle /></IconButton>
                    </ListItem> )
                }
                <ListItem>
                    <ListItemText primary="Totale" />
                    <ListItemText sx={{fontWeight: "bold", color: "red", marginLeft: "16px"}}
                        primary={cart.reduce((p, c: Product) => p + c.price, 0)} />
                </ListItem>
            </List>
            
        </Drawer>
    </Grid>
}

export default Home;