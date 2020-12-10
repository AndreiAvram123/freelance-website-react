import {OrderStatus} from "../entities/Order";

export const CHANGE_ORDER_STATUS  = (newOrderStatus:OrderStatus) =>{
    return `Are you sure you want to change the order status to ${newOrderStatus}`
}
export const CONFIRM_DELETE_PRODUCT = (productID:number) =>{
    return `Are you sure you want to delete the product number ${productID}`
}