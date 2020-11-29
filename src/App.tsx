
import './App.css';
import React, {useEffect, useState} from "react";
import SignIn from "./components/SignIn";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import SideDrawer from "./components/SideDrawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import ExpandedProduct from "./pages/ExpandedProduct";
import Profile from "./pages/Profile";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Cart from "./pages/Cart";
import {ProductImage, ProductModel} from "./repositories/ProductRepository";
import CartContext from "./contexts/CartContext";
import {getCartItems, persistItem, removeItem} from "./components/StorageHandler";


export default function  App(){
    let drawerWidth = 240;
    let useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appBar: {
                zIndex: theme.zIndex.drawer + 1,
            },
            drawer: {
                width: drawerWidth,
                flexShrink: 0,
            },
            drawerPaper: {
                width: drawerWidth,
            },
            drawerContainer: {
                overflow: 'auto',
            },
            content: {
                flexGrow: 1,
                padding: theme.spacing(3),
            },
            root: {
                flexGrow: 1,
            },
            paper: {
                height: 140,
                width: 100,
            },
            control: {
                padding: theme.spacing(2),
            },
            wrapperRightActions :{
                marginLeft : "auto",
                cursor : "pointer"
            },
            imageUser :{
                marginLeft: "30px",
                maxWidth : "50px"
            }

        }),
    );
    const classes = useStyles();
    let initialState:Array<ProductModel> = []
    const [products,setProducts] = useState(initialState)

    const addProduct= (newProduct :ProductModel) =>{
        setProducts([...products,newProduct])
        persistItem(newProduct)
    }
    const removeProduct = (toRemove:ProductModel)=>{
        let copy = [...products]
        let index = copy.indexOf(toRemove)
        if(index !== -1){
            copy.splice(index,1)
            setProducts(copy)
            removeItem(toRemove)
        }

    }

   useEffect(()=>{
       let persistedItems = getCartItems()
       setProducts(persistedItems)
   },[])


        if(localStorage.getItem("token") === null){
            return (<div>
                  <Router>
                      <Switch>
                          <Route path=  "/register" exact component={() => <Register />} />
                          <Route path = "/*" exact component={()=> <SignIn />} />
                      </Switch>
                  </Router>
            </div>
            )
        }

        return (
            <Router>
                <Switch>
                    <CartContext.Provider value={{products: products,setProducts: setProducts, addProduct: addProduct, removeProduct:removeProduct}}>
                <div style={{display:"flex"}}>
                    <SideDrawer />
                    <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" noWrap>
                                Freelance website
                            </Typography>
                            <div className={classes.wrapperRightActions} >
                                <ShoppingBasketIcon onClick={()=>window.location.href = "/cart"}/>
                                <Typography variant={'overline'} style={{marginLeft:"10px"}}>{products.length}</Typography>
                                   <img src = {"https://robohash.org/139.162.116.133.png"} className={classes.imageUser} onClick={()=>window.location.href = "/profile"}/>
                            </div>
                        </Toolbar>
                    </AppBar>

                    <main className={classes.content} id={"drawer-content"}>
                        <Toolbar />
                                <Route path = "/" exact component={()=> <Home />} />
                                <Route path = "/admin" exact component={() => <Admin />} />
                                <Route path = "/profile" exact component={()=> <Profile />} />
                                <Route path = "/cart" exact component={()=> <Cart />} />
                                <Route path = "/product/:productID" exact component={()=> <ExpandedProduct/> } />
                    </main>
                </div>
                    </CartContext.Provider>
                </Switch>
            </Router>
        );
}