import React, { useContext } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import {ProductModel} from "../repositories/ProductRepository";
import {BASE_URL_IMAGES} from "../utils/ApiConstants";
import CartContext from "../contexts/CartContext";

type Props= {
    product:ProductModel
}
const CartItem = (props:Props) => {
      let product = props.product
      let quantity  = 2


    return (
        <CartContext.Consumer>
            { ({products,setProducts,addProduct}) => (
                <div className="row no-gutters py-2">
                    <div className="col-sm-2 p-2">
                        <img
                            alt={product.name}
                            style={{margin: "0 auto", maxHeight: "50px"}}
                            src={product.images[0] !== undefined ? (BASE_URL_IMAGES + product.images[0].imageURl ) : ""} className="img-fluid d-block"/>
                    </div>
                    <div className="col-sm-4 p-2">
                        <h5 className="mb-1">{product.name}</h5>
                        <p className="mb-1">Price: {"100 pounzi"} </p>

                    </div>
                    <div className="col-sm-2 p-2 text-center ">
                        <p className="mb-0">Quantity: {products.length}</p>
                    </div>
                    <div className="col-sm-4 p-2 text-right">
                        <button
                            onClick={() => {
                                let product:ProductModel = {
                                    productID : 100,
                                    name : "pupu",
                                    price : 1000,
                                    images : []
                                }
                                addProduct(product)}}
                            className="btn btn-primary btn-sm mr-2 mb-1">
                            <AddIcon width={"20px"}/>
                        </button>

                        {
                            quantity > 1 &&
                            <button
                                onClick={() => {}}
                                className="btn btn-danger btn-sm mb-1">
                                <RemoveIcon width={"20px"}/>
                            </button>
                        }

                        {
                            quantity === 1 &&
                            <button
                                onClick={() => {}}
                                className="btn btn-danger btn-sm mb-1">
                                <DeleteIcon width={"20px"}/>
                            </button>
                        }

                    </div>
                </div>
            )

            }
        </CartContext.Consumer>
     );
}
 
export default CartItem;