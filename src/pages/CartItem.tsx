import React, { useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import {BASE_URL_IMAGES} from "../utils/ApiConstants";
import {CartContext} from "../contexts/CartContext";
import {ProductModel} from "../repositories/ProductRepository";
import {Alert} from "@material-ui/lab";

export type ProductQuantity ={
    product:ProductModel,
    quantity:number
}


const CartItem = (props:ProductQuantity) => {
      let product = props.product
      let quantity  = props.quantity
      const context = useContext(CartContext)

    return (
                <div className="row no-gutters py-2">
                    <div className="col-sm-2 p-2">
                        <img
                            alt={product.name}
                            style={{margin: "0 auto", maxHeight: "50px"}}
                            src={product.images[0]?.imageURl} className="img-fluid d-block"/>
                    </div>
                    <div className="col-sm-4 p-2">
                        <h5 className="mb-1">{product.name}</h5>
                        <p className="mb-1">Price: {"£" + product.price} </p>

                    </div>
                    <div className="col-sm-2 p-2 text-center ">
                        <p className="mb-0">Quantity: {quantity}</p>
                    </div>
                    <div className="col-sm-4 p-2 text-right">
                        <button
                            onClick={() => {
                               context.addProduct(product.productID)
                            }
                            }
                            className="btn btn-primary btn-sm mr-2 mb-1">
                            <AddIcon width={"20px"}/>
                        </button>

                        {
                            quantity > 1 &&
                            <button
                                onClick={() => context.removeProduct(product.productID)}
                                className="btn btn-danger btn-sm mb-1">
                                <RemoveIcon width={"20px"}/>
                            </button>
                        }

                        {
                            quantity === 1 &&
                            <button
                                onClick={() => context.removeProduct(product.productID)}
                                className="btn btn-danger btn-sm mb-1">
                                <DeleteIcon width={"20px"}/>
                            </button>
                        }

                    </div>
                    {
                       product.stock === 0 &&
                        <Alert severity="error">Unfortunately the product is no longer in stock</Alert>
                    }
                    {
                        product.stock > 0 && props.quantity > product.stock &&
                        <Alert severity="error">Unfortunately we only have {product.stock} in stock </Alert>
                    }
                </div>
            )

}
 
export default CartItem;