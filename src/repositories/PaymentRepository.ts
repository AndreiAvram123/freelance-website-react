import  {makeAPICall} from "./NetworkExecutor";
import {URL_FETCH_SESSION_ID_PAYMENT} from "../utils/ApiConstants";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";

type PaymentSessionIDResponse ={
    id :string
}

type PaymentRequest = {
    amount :number
}

export async function fetchSessionID(paymentRequest:PaymentRequest){
     return  await makeAPICall<PaymentSessionIDResponse>
     (new ApiRequest(URL_FETCH_SESSION_ID_PAYMENT,HTTPMethods.POST,JSON.stringify(paymentRequest)))
}