import {createContext} from "react";

const CartContext = createContext({
    productsIDs: new Array<number>(),

    setProducts: (newProducts:Array<number>)=>{

    },
    addProduct:(product:number) => {
    },
    removeProduct:(product:number)=>{

    }


});
export default CartContext;
