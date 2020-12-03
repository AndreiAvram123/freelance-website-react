import React from 'react';
import CartItem, {ProductQuantity} from './CartItem';

type Props ={
    products :Array<ProductQuantity>
}
const CartProducts = (props :Props) => {
    let cartProducts = props.products.map(productQuantity =>{
        return (
            <CartItem product={productQuantity.product} quantity={productQuantity.quantity} key ={productQuantity.product.productID} />
        )
    })


    return (
        <div >
            <div className="card card-body border-0">
                    {cartProducts}
            </div>
        </div>

     );
}
 
export default CartProducts;