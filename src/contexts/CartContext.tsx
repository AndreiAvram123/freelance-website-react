import React, {createContext, Dispatch, SetStateAction, useState} from "react";
import {getCartItems, persistItem, removeItem} from "../components/StorageHandler";

let initialState:Props = {
    productsIDs: [],
    setProductsIDs: () => {},
    addProduct: ()=>{},
    removeProduct:()=>{}
}
export const CartContext = createContext<Props>(initialState)

type Props= {
    productsIDs: Array<number>,
    setProductsIDs: Dispatch<SetStateAction<Array<number>>>,
    addProduct: (newProductID: number) => void,
    removeProduct: (toRemove: number) => void

}
type propsProvider ={
    children:React.ReactNode
}

export const CartProvider = (props:propsProvider) =>{
    const [productsIDs, setProductsIDs] = useState<Array<number>>(getCartItems)
    const addProduct = (productID:number)=>{
       persistItem(productID)
       setProductsIDs(prevState => [...prevState,productID])
    }
    const removeProduct=  (toRemove:number)=>{
        let copy = [...productsIDs]
        let index = copy.indexOf(toRemove)
        if(index !== -1){
            copy.splice(index,1)
            setProductsIDs(copy)
            removeItem(toRemove)
        }
    }
    return (
        <CartContext.Provider value={{productsIDs:productsIDs, setProductsIDs:setProductsIDs, addProduct:addProduct,removeProduct:removeProduct}}>
            {props.children}
            </CartContext.Provider>
    )
}
