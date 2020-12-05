import {Order} from "../entities/Order";
import makeCall from "./CallRunner";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";
import {URL_PLACE_ORDER} from "../utils/ApiConstants";

export async function placeOrder(products:Array<number>){
        let order:Order = {
               products :products,
               userID : 1
        }
       const response = await makeCall(new ApiRequest(URL_PLACE_ORDER,HTTPMethods.POST,JSON.stringify(order)))
       return response
}