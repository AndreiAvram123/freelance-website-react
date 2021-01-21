import React, {useContext, useEffect, useState} from 'react';
import CartProducts from './CartProducts';
import {CartContext} from "../contexts/CartContext";
import {fetchProduct} from "../repositories/ProductRepository";
import {ProductQuantity} from "./CartItem";
import {isUserLoggedIn} from "../utils/UserManager";
import {placeOrder} from "../repositories/OrderRepository";
import {deleteCartItems} from "../components/StorageHandler";


const Cart = () => {

    const context = useContext(CartContext)


    const [cartProducts, setCartProducts] = useState(new Array<ProductQuantity>())

    const [totalPrice ,setTotalPrice] = useState(0)

    const [canCheckout, setCanCheckout] = useState(false)

    const [productsIDs,setProductsIDs] = [context.productsIDs,context.setProductsIDs]

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
            }).catch(error=>{
                console.log(error)
            }))
        }
        Promise.all(promises).then(()=>{
            setTotalPrice(tempPrice)
            setCartProducts(tempCartProducts)
            validateCart(tempCartProducts)
        })

    },[productsIDs])

    const handleCheckout = ()=>{
        if(canCheckout){
            if(isUserLoggedIn()){
                window.location.href = "/pay"

            }else{
                window.location.href = "/login"
            }
        }else{

            // @ts-ignore
            $('#cartErrorModal').modal('show')
        }
    }

    function validateCart(products:Array<ProductQuantity>){
        let valid = true
        products.forEach(productQuantity=>{
            if(productQuantity.product.stock === 0 || productQuantity.quantity > productQuantity.product.stock){
                valid = false
            }
        })
        setCanCheckout(valid)
    }
    return (
        <div>
            <div >
                <div className="text-center mt-5">
                    <h1>Cart</h1>
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
                                    <button type="button" className="btn btn-primary mb-2"  onClick={handleCheckout}>CHECKOUT</button>
                                </div>

                            </div>
                        </div>
                    }
                    
                </div>
            </div>

            <div className="modal fade" id="cartErrorModal" tabIndex={-1} role="dialog" aria-labelledby="cartErrorModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                             Some of the products are not available
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Cart;