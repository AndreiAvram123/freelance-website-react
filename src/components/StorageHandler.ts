
const KEY_CART_ITEMS = "KEY_CART_ITEMS"
const KEY_TOKEN = "KEY_TOKEN"
const KEY_REFRESH_TOKEN = "KEY_REFRESH_TOKEN"

export function getTokenFromStorage():string | null{
    return localStorage.getItem(KEY_TOKEN)
}
export function getRefreshTokenFromStorage():string | null{
    return localStorage.getItem(KEY_REFRESH_TOKEN)
}
export function deleteToken() {
    localStorage.removeItem(KEY_TOKEN)
}

export function saveAccessToken(token:string){
    localStorage.setItem(KEY_TOKEN, token)
}
export function saveRefreshToken(token:string){
    localStorage.setItem(KEY_REFRESH_TOKEN,token)
}

export function deleteCartItems(){
    localStorage.removeItem(KEY_CART_ITEMS)
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