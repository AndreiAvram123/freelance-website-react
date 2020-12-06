import {ProductModel} from "../repositories/ProductRepository";
import {User} from "./User";

export interface CreateOrderModel {
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
