import {CreateOrderModel} from "../entities/Order";
import makeCall from "./CallRunner";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";
import {URL_PLACE_ORDER, URL_UPDATE_ORDER} from "../utils/ApiConstants";
import {getUserID} from "../utils/UserManager";

export interface UpdateOrderModel{
    orderID :number,
    newStatus: string
}

export async function placeOrder(products:Array<number>){
      let userID =  getUserID()
      if(userID !== 0) {
        let order: CreateOrderModel = {
            products: products,
            userID: userID
        }
        return await makeCall(new ApiRequest(URL_PLACE_ORDER, HTTPMethods.POST, JSON.stringify(order)))
    }
}

export async function updateOrder(updateOrderModel:UpdateOrderModel){

    return await makeCall(new ApiRequest(URL_UPDATE_ORDER,HTTPMethods.POST, JSON.stringify(updateOrderModel)))
}
