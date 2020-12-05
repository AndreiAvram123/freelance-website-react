import React, {useContext, useEffect, useState} from 'react';
import CartProducts from './CartProducts';
import {CartContext} from "../contexts/CartContext";
import {fetchProduct} from "../repositories/ProductRepository";
import {ProductQuantity} from "./CartItem";


const Cart = () => {

    const context = useContext(CartContext)

    const [productsIDs,setProductsIDs] = [context.productsIDs,context.setProductsIDs]

    const [cartProducts, setCartProducts] = useState(new Array<ProductQuantity>())

    const [totalPrice ,setTotalPrice] = useState(0)

    useEffect(()=>{
        let record : {[productID:number]: number} = {}
        let tempPrice = 0
        let tempCartProducts:Array<ProductQuantity> = []

        productsIDs.forEach((id)=>{
            if(record[id] === undefined){
                record[id] = 0
            }
            record[id] ++
        })
        let promises = []
        for (let key in record){
            promises.push(fetchProduct(parseInt(key)).then(result=>{
                let productQuantity:ProductQuantity={
                    product:result,
                    quantity : record[key]
                }
                tempCartProducts.push(productQuantity)
                tempPrice += (productQuantity.quantity * productQuantity.product.price)
            }))
        }
        Promise.all(promises).then(()=>{
            setTotalPrice(tempPrice)
            setCartProducts(tempCartProducts)
        })

    },[productsIDs])


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
                            productsIDs.length > 0 ?

                            <CartProducts products={cartProducts}/> :
                            <div className="p-3 text-center text-muted">
                                Your cart is empty
                            </div>
                        }
                    </div>
                    {
                        productsIDs.length > 0 &&
                        <div className="col-sm-3 p-3">
                            <div className="card card-body">
                                <p className="mb-1">Total Items</p>
                                <h4 className=" mb-3 txt-right">{productsIDs.length}</h4>
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