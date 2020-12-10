export const BASE_URL_IMAGES = "https://rest-kotlin.herokuapp.com/products/images/"
const BASE_URL = "https://rest-kotlin.herokuapp.com/"
export const URL_FETCH_CATEGORIES = BASE_URL + "categories"

export const URL_FETCH_PRODUCT = "https://rest-kotlin.herokuapp.com/products/"
export const URL_FETCH_RECENT_PRODUCTS = "https://rest-kotlin.herokuapp.com/products/recent"
export const URL_UPDATE_PRODUCT = "https://rest-kotlin.herokuapp.com/products/"

export const URL_UPDATE_STOCK = (productID:number)=>{
      return `https://rest-kotlin.herokuapp.com/products/${productID}/increaseStock`
}

export const URL_FETCH_REVIEWS = (productID:number) =>{
      return `https://rest-kotlin.herokuapp.com/products/${productID}/reviews`
}

export const URL_DELETE_PRODUCT = (productID:number) =>{
      return `https://rest-kotlin.herokuapp.com/products/${productID}`
}

export const URL_CREATE_REVIEWS=  "https://rest-kotlin.herokuapp.com/reviews"



export const URL_FETCH_PRODUCTS = "https://rest-kotlin.herokuapp.com/products"
export const URL_FETCH_SUGGESTIONS = "https://rest-kotlin.herokuapp.com/products/search/"
export const URL_PLACE_ORDER = "https://rest-kotlin.herokuapp.com/orders/create"
export const URL_UPDATE_ORDER = "https://rest-kotlin.herokuapp.com/orders/"
export const URL_CREATE_PRODUCT = "https://rest-kotlin.herokuapp.com/products/create"



export const URL_ANALYTICS_TOTAL_CUSTOMERS = "https://rest-kotlin.herokuapp.com/analytics/totalCustomers"
export const URL_ANALYTICS_TOTAL_AMOUNT = "https://rest-kotlin.herokuapp.com/orders/totalAmount"
export const URL_ANALYTICS_RECENT_ORDERS = "https://rest-kotlin.herokuapp.com/orders/recent"
