
import './App.css';
import React, {useEffect, useState,Suspense} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {CartProvider} from "./contexts/CartContext";
import CategoriesContext from "./contexts/CategoriesContext";
import {Category, fetchCategories} from "./repositories/ProductRepository";
import Navbar from "./components/Navbar";

export default function  App(){


    const [categories,setCategories] = useState<Array<Category>>([])


    useEffect(()=>{
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
                <div>
                    <CategoriesContext.Provider value = {{categories : categories,setCategories:setCategories}}>
                        <CartProvider>
                    <Navbar/>

                 <div className={"container-md"}>

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
            </div>
                        </CartProvider>
                    </CategoriesContext.Provider>
                </div>
            </Switch>
        </Router>

    );
}