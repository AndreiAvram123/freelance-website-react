import React, {useContext, useEffect, useState} from 'react';
import CartProducts from './CartProducts';
import CartContext from "../contexts/CartContext";
import {fetchProduct} from "../repositories/ProductRepository";
import {ProductQuantity} from "./CartItem";


const Cart = () => {

    const context = useContext(CartContext)

    const record: { [productID:number]:number } = {}

    const [cartProducts, setCartProducts] = useState(new Array<ProductQuantity>())

    const [totalPrice ,setTotalPrice] = useState(0)

    useEffect(()=>{
        context.productsIDs.forEach(productID=>{
            if(record[productID] === undefined) {
                record[productID] = 0
            }
            record[productID] ++
        })
        for (let recordKey in record) {
            let productID = context.productsIDs.find((productID) => productID === parseInt(recordKey))
            if (productID !== undefined) {
                fetchProduct(productID).then(result => {
                    let product = result.data
                    let quantity = record[product.productID]
                    let cartItem: ProductQuantity = {product: product, quantity: quantity}
                    setTotalPrice(totalPrice + product.price * quantity)
                    setCartProducts([...cartProducts, cartItem])
                })
            }
        }
    },[])


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
                            context.productsIDs.length > 0 ?

                            <CartProducts products={cartProducts}/> :
                            <div className="p-3 text-center text-muted">
                                Your cart is empty
                            </div>
                        }
                    </div>
                    {
                        context.productsIDs.length > 0 &&
                        <div className="col-sm-3 p-3">
                            <div className="card card-body">
                                <p className="mb-1">Total Items</p>
                                <h4 className=" mb-3 txt-right">{context.productsIDs.length}</h4>
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