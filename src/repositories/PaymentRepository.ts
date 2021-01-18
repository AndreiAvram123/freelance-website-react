import makeCall from "./CallRunner";
import {URL_FETCH_SESSION_ID_PAYMENT} from "../utils/ApiConstants";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";
import {ApiResponse} from "./ApiResponse";

type PaymentSessionIDResponse ={
    id :string
}

type PaymentRequest = {
    amount :number
}

export async function fetchSessionID(paymentRequest:PaymentRequest){
   let response  = await makeCall(new ApiRequest(URL_FETCH_SESSION_ID_PAYMENT,HTTPMethods.POST,JSON.stringify(paymentRequest)))
    return response as ApiResponse<PaymentSessionIDResponse>
}