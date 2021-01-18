
import './App.css';
import React, {Suspense} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {CartProvider} from "./contexts/CartContext";
import  {CategoriesProvider} from "./contexts/CategoriesContext";
import Navbar from "./components/Navbar";
import Dashboard from "./components/reports/DashboardView/Dashboard";

export default function  App(){


    const Register = React.lazy(()=> import('./pages/Register'))
    const SignIn  = React.lazy(()=> import('./pages/SignIn'))
    const Home = React.lazy(()=> import('./pages/Home'))
    const Cart = React.lazy(()=>import('./pages/Cart'))
    const ExpandedProduct = React.lazy(()=> import('./pages/ExpandedProduct'))
    const ProductsPage = React.lazy(()=> import('./pages/ProductsPage'))

    const CheckoutPage = React.lazy(()=> import('./pages/Checkout'))
    const PaymentResultPage = React.lazy(()=>import('./pages/PaymentResult'))

    return (

        <Router>
            <Switch>
                <div>
                   <CategoriesProvider>
                        <CartProvider>
                            <Navbar/>

                            <Route path = "/dashboard" exact component={()=>
                                <Suspense fallback = {<div>Loading...</div>} >
                                    <Dashboard />
                                </Suspense>
                            } />

                            <div className={"container-md"}>
                                <Route path = "/" exact component={()=>
                                    <Suspense fallback = {<div>Loading...</div>} >
                                        <Home/>
                                    </Suspense>} />
                                <Route path = "/cart" exact component={()=>
                                    <Suspense fallback = {<div>Loading...</div>} >
                                        <Cart />
                                    </Suspense>} />
                                <Route  path = "/product/:productID" exact component={()=>
                                    <Suspense fallback = {<div>Loading...</div>} >
                                        <ExpandedProduct/>
                                    </Suspense>
                                } />
                                <Route path={"/products"} exact component={()=>
                                    <Suspense fallback = {<div>Loading...</div>} >
                                        <ProductsPage/>
                                    </Suspense>
                                } />
                                <Route path=  "/register" exact component={ () =>
                                    <Suspense fallback = {<div>Loading...</div>} >
                                        <Register />
                                    </Suspense>
                                } />
                                <Route path="/pay" exact component={
                                    ()=> <Suspense fallback={<div>Loading...</div>} >
                                       <CheckoutPage />
                                    </Suspense>
                                }
                                />

                                <Route path= "/payment" exact component={
                                    ()=> <Suspense fallback={<div>Loading...</div>}>
                                       <PaymentResultPage/>
                                    </Suspense>
                                } />



                                <Route path = "/login" exact component={() =>
                                    <Suspense fallback = {<div>Loading...</div>} >
                                        <SignIn />
                                    </Suspense>
                                }
                                />
                            </div>
                        </CartProvider>
                   </CategoriesProvider>
                </div>
            </Switch>
        </Router>

    );
}