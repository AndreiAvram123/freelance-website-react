import {ProductModel} from "../repositories/ProductRepository";

const KEY_CART_ITEMS = "KEY_CART_ITEMS"
export  function getCartItems():Array<number>{
    let cartItems = localStorage.getItem(KEY_CART_ITEMS)
    if(cartItems == null){
        return []
    }
    return JSON.parse(cartItems)
}

export  function persistItem(product:number){
    let cartItems = getCartItems()
     cartItems.push(product)
     persist(cartItems)
}

export function removeItem(toRemove:number){
    let cartItems = getCartItems()
    let found = cartItems.find((productID) =>productID === toRemove)
    if(found !== undefined){
        let index = cartItems.indexOf(found)
        cartItems.splice(index,1)
        persist(cartItems)
    }
}
function persist(products:Array<number>){
    localStorage.setItem(KEY_CART_ITEMS, JSON.stringify(products))
}