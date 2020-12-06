import {CreateOrderModel} from "../entities/Order";
import makeCall from "./CallRunner";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";
import {URL_PLACE_ORDER} from "../utils/ApiConstants";
import {getUserID} from "../utils/UserManager";

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