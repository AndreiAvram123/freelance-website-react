import {ProductModel} from "../repositories/ProductRepository";

const KEY_CART_ITEMS = "KEY_CART_ITEMS"
export  function getCartItems():Array<ProductModel>{
    let cartItems = localStorage.getItem(KEY_CART_ITEMS)
    if(cartItems == null){
        return []
    }
    return JSON.parse(cartItems) as ProductModel[]
}

export  function persistItem(product:ProductModel){
    let cartItems = getCartItems()
     cartItems.push(product)
     persist(cartItems)
}

export function removeItem(toRemove:ProductModel){
    let cartItems = getCartItems()
    let found = cartItems.find((product) =>product.productID === toRemove.productID)
    if(found !== undefined){
        let index = cartItems.indexOf(found)
        cartItems.splice(index,1)
        persist(cartItems)
    }
}
function persist(products:Array<ProductModel>){
    localStorage.setItem(KEY_CART_ITEMS, JSON.stringify(products))
}