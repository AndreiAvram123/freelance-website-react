import React, { useContext } from 'react';

import CartItem from './CartItem';
import CartContext from "../contexts/CartContext";


const CartProducts = () => {

    const context = useContext(CartContext)
    let products = context.products

    //keep a map of products along with their quantity
    //mapped by the product id
    const record: { [productID:number]:number } = {}

    products.forEach(product=>{
        if(record[product.productID] === undefined) {
             record[product.productID] = 0
        }
        record[product.productID] ++
    })
    let productsList : Array<JSX.Element> = []
    for (let recordKey in record) {
        let product = products.find((product) => product.productID === parseInt(recordKey))
        if (product !== undefined) {
            productsList.push(
                <CartItem product={product} quantity={record[product.productID]} key={product.productID} />
        )
        }
    }

    return ( 
        <div >
            <div className="card card-body border-0">
                {productsList}
            </div>
        </div>

     );
}
 
export default CartProducts;