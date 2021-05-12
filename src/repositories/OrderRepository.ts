import {CreateOrderModel, UpdateOrderModel} from "../entities/Order";
import  {makeAPICall} from "./NetworkExecutor";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";
import {URL_PLACE_ORDER, URL_UPDATE_ORDER} from "../utils/ApiConstants";
import {getUserID} from "../utils/UserManager";



export async function placeOrder(products:Array<number>, paymentReference:string){
      let userID =  getUserID()
      if(userID !== 0) {
        let order: CreateOrderModel = {
            paymentReference : paymentReference,
            products: products,
            userID: userID
        }
        return await makeAPICall(new ApiRequest(URL_PLACE_ORDER, HTTPMethods.POST, JSON.stringify(order)))
    }
}

export async function updateOrder(updateOrderModel:UpdateOrderModel){

    let url =URL_UPDATE_ORDER + updateOrderModel.orderID
    return await makeAPICall(new ApiRequest(url,HTTPMethods.PATCH, JSON.stringify(updateOrderModel)))
}
