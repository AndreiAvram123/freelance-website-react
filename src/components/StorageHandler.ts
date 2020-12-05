
const KEY_CART_ITEMS = "KEY_CART_ITEMS"
const KEY_TOKEN = "KEY_TOKEN"
const defaultToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmRyZWkxMjM5IiwiZXhwIjoxNjM3NzcyNjgxLCJ1c2VySUQiOjEsInVzZXJuYW1lIjoiYW5kcmVpMTIzOSJ9.2MdDiQRetHvNNFiZaYPRiVY6M7krj4w6VjmbbEdSx7UZV6WRoZc__15Ey9UMsQwCEfaqzLFdd45ogd4IAgEo7w"
export function persistDefaultToken(){
    localStorage.setItem(KEY_TOKEN,defaultToken)
}
export function getToken(){
    if(localStorage.getItem(KEY_TOKEN) == null){
        persistDefaultToken()
    }
    return defaultToken
}

export function isDefaultToken(){
    let storedToken = localStorage.getItem(KEY_TOKEN)
    return storedToken ===null || storedToken === defaultToken
}

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