import React, {createContext, useContext, useState} from 'react';
import CartProducts from './CartProducts';
import CartContext from "../contexts/CartContext";


const Cart = () => {

    const context = useContext(CartContext)
    let products = context.products
    let totalPrice = 0
    products.forEach(product=>{
        totalPrice+=product.price
    })
    return (
        <div>
            <div >
                <div className="text-center mt-5">
                    <h1>Cart</h1>
                    <p>This is the Cart Page.</p>
                </div>

                <div className="row no-gutters justify-content-center">
                    <div className="col-sm-9 p-3">
                        {
                            products.length > 0 ?

                            <CartProducts/> :
                            <div className="p-3 text-center text-muted">
                                Your cart is empty
                            </div>
                        }
                    </div>
                    {
                        products.length > 0 &&
                        <div className="col-sm-3 p-3">
                            <div className="card card-body">
                                <p className="mb-1">Total Items</p>
                                <h4 className=" mb-3 txt-right">{products.length}</h4>
                                <p className="mb-1">Total Payment</p>
                                <h3 className="m-0 txt-right">{"£" + totalPrice}</h3>
                                <hr className="my-4"/>
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary mb-2" onClick={()=>{

                                    }}>CHECKOUT</button>
                                </div>

                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        </div>
     );
}
 
export default Cart;