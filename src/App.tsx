
import './App.css';
import React, {useEffect, useState,Suspense} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import CartContext from "./contexts/CartContext";
import CategoriesContext from "./contexts/CategoriesContext";
import {getCartItems, persistItem, removeItem} from "./components/StorageHandler";
import {Category, fetchCategories} from "./repositories/ProductRepository";

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
    const [categories,setCategories] = useState<Array<Category>>([])


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
        fetchCategories().then(result=>{
            let data = result.data
            setCategories(data)
        })

    },[])

    const Register = React.lazy(()=> import('./pages/Register'))
    const SignIn  = React.lazy(()=> import('./pages/SignIn'))
    const Home = React.lazy(()=> import('./pages/Home'))
    const Admin = React.lazy(()=> import('./pages/Admin'))
    const Profile = React.lazy(()=> import('./pages/Profile'))
    const Cart = React.lazy(()=>import('./pages/Cart'))
    const ExpandedProduct = React.lazy(()=> import('./pages/ExpandedProduct'))
    const ProductsPage = React.lazy(()=> import('./pages/ProductsPage'))


    if(localStorage.getItem("token") === null){
        return (
            <div>
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
                <CategoriesContext.Provider value = {{categories : categories,setCategories:setCategories}}>

                <CartContext.Provider value={{productsIDs: productsIDs, setProducts: setProducts, addProduct: addProduct, removeProduct:removeProduct}}>

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
                            <Route path={"/products"} exact component={()=>
                                <Suspense fallback = {<div>Loading...</div>} >
                                <ProductsPage/>
                                </Suspense>
                            } />
                </CartContext.Provider>
                </CategoriesContext.Provider>
            </Switch>
        </Router>
    );
}