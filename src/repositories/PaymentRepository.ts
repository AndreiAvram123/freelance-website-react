import makeCall from "./CallRunner";
import {URL_FETCH_SESSION_ID_PAYMENT} from "../utils/ApiConstants";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";
import {ApiResponse} from "./ApiResponse";

type PaymentSessionIDResponse ={
    id :string
}


export async function fetchSessionID(){
   let response  = await makeCall(new ApiRequest(URL_FETCH_SESSION_ID_PAYMENT,HTTPMethods.GET))
    return response as ApiResponse<PaymentSessionIDResponse>
}