import React, { useContext } from 'react';

import CartItem from './CartItem';
import CartContext from "../contexts/CartContext";
import {ProductImage, ProductModel} from "../repositories/ProductRepository";

const CartProducts = () => {

    const context = useContext(CartContext)
    let products = context.products

    return ( 
        <div >
            <div className="card card-body border-0">

                {
                    products.map(product =>  <CartItem key={product.productID} product={product}/>)
                }

            </div>
        </div>

     );
}
 
export default CartProducts;