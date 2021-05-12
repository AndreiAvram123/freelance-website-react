import {ProductModel} from "../repositories/ProductRepository";
import {User} from "./User";

export interface UpdateOrderModel{
     orderID :number,
     newOrderStatus: string
}

export interface CreateOrderModel {
     paymentReference:String,
     products:Array<number>,
     userID:number
}

export interface Order {
     orderID :number,
     created:string,
     orderStatus:string,
     products:Array<ProductModel>
     user:User
}

export enum OrderStatus {
     PENDING= "PENDING",
     DELIVERED = "DELIVERED",
     REFUNDED = "REFUNDED"

}




