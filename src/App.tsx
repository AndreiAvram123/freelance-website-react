
import './App.css';
import React, {useEffect, useState} from "react";
import SignIn from "./components/SignIn";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import AllProducts from "./AllProducts";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import SideDrawer from "./components/SideDrawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import ExpandedProduct from "./pages/ExpandedProduct";
import Profile from "./pages/Profile";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Cart from "./pages/Cart";
import CartContext from "./contexts/CartContext";
import {getCartItems, persistItem, removeItem} from "./components/StorageHandler";
import IconButton from '@material-ui/core/IconButton';
import {Avatar, Badge} from "@material-ui/core";
import Home from "./pages/Home";
import RightActionsToolbar from "./components/RightActionsToolbar";

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
            }
        }),
    );


    const classes = useStyles();

    const [productsIDs,setProducts] = useState(new Array<number>())

    const addProduct= (newProduct :number) =>{
        setProducts([...productsIDs,newProduct])
        persistItem(newProduct)
    }
    const removeProduct = (toRemove:number)=>{
        let copy = [...productsIDs]
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
                    <CartContext.Provider value={{productsIDs: productsIDs, setProducts: setProducts, addProduct: addProduct, removeProduct:removeProduct}}>
                <div style={{display:"flex"}}>
                    <SideDrawer />
                    <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" noWrap>
                                Freelance website
                            </Typography>
                            <RightActionsToolbar />
                        </Toolbar>
                    </AppBar>

                    <main className={classes.content} id={"drawer-content"}>
                        <Toolbar />
                                <Route path = "/" exact component={()=> <Home/>} />
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