import {OrderStatus} from "../entities/Order";

export const CHANGE_ORDER_STATUS  = (newOrderStatus:OrderStatus) =>{
    return `Are you sure you want to change the order status to ${newOrderStatus}`
}