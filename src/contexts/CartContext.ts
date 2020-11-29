import {createContext} from "react";
import {ProductModel} from "../repositories/ProductRepository";

const CartContext = createContext({
    products: new Array<ProductModel>(),
    setProducts: (newProducts:Array<ProductModel>)=>{

    },
    addProduct:(product:ProductModel) => {
    },
    removeProduct:(product:ProductModel)=>{

    }


});
export default CartContext;
