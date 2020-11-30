
import './App.css';
import React, {useEffect, useState,Suspense} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SideDrawer from "./components/SideDrawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import CartContext from "./contexts/CartContext";
import {getCartItems, persistItem, removeItem} from "./components/StorageHandler";
import RightActionsToolbar from "./components/RightActionsToolbar";

export default function  App(){
    let useStyles = makeStyles((theme: Theme) =>
        createStyles({
            appBar: {
                zIndex: theme.zIndex.drawer + 1,
            },
            content: {
                flexGrow: 1,
                padding: theme.spacing(3),
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

    const Register = React.lazy(()=> import('./pages/Register'))
    const SignIn  = React.lazy(()=> import('./pages/SignIn'))
    const Home = React.lazy(()=> import('./pages/Home'))
    const Admin = React.lazy(()=> import('./pages/Admin'))
    const Profile = React.lazy(()=> import('./pages/Profile'))
    const Cart = React.lazy(()=>import('./pages/Cart'))
    const ExpandedProduct = React.lazy(()=> import('./pages/ExpandedProduct'))



    if(localStorage.getItem("token") === null){
        return (<div>
                <Router>
                    <Switch>

                        <Route path=  "/register" exact component={ () =>
                            <Suspense fallback = {<div>Loading...</div>} >
                                <Register />
                            </Suspense>
                        } />


                        <Route path = "/*" exact component={() =>
                            <Suspense fallback = {<div>Loading...</div>} >
                                <SignIn />
                            </Suspense>
                        }
                        />
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

                            <Route path = "/" exact component={()=>
                                <Suspense fallback = {<div>Loading...</div>} >
                                    <Home/>
                                </Suspense>} />
                            <Route path = "/admin" exact component={() =>
                                <Suspense fallback = {<div>Loading...</div>} >
                                    <Admin/>
                                </Suspense>
                            }
                            />
                            <Route path = "/profile" exact component={()=>
                                <Suspense fallback = {<div>Loading...</div>} >
                                    <Profile />
                                </Suspense>
                            } />
                            <Route path = "/cart" exact component={()=>
                                <Suspense fallback = {<div>Loading...</div>} >
                                    <Cart />
                                </Suspense>} />
                            <Route path = "/product/:productID" exact component={()=>
                                <Suspense fallback = {<div>Loading...</div>} >
                                    <ExpandedProduct/>
                                </Suspense>
                            } />
                        </main>
                    </div>
                </CartContext.Provider>
            </Switch>
        </Router>
    );
}