import  {makeAPICall} from "./NetworkExecutor";
import {
    URL_COINBASE_CREATE_CHARGE,
    URL_FETCH_SESSION_ID_PAYMENT,
    URL_VALIDATE_PAYMENT_REFERENCE
} from "../utils/ApiConstants";
import {ApiRequest, CustomHeader, HTTPMethods} from "./requests/ApiRequest";

type PaymentSessionIDResponse ={
    id :string
}

type PaymentRequest = {
    itemsIDs :number[]
}
type ReferenceIDValidation = {
    valid :boolean
}

type CoinbaseCreateChargeResponse= {
    hosted_url:string
}


export async function fetchSessionID(paymentRequest:PaymentRequest){
     return  await makeAPICall<PaymentSessionIDResponse>
     (new ApiRequest(URL_FETCH_SESSION_ID_PAYMENT,HTTPMethods.POST,JSON.stringify(paymentRequest)))
}

export async function validatePaymentReference(paymentReference:string){
    let request = new ApiRequest(URL_VALIDATE_PAYMENT_REFERENCE(paymentReference),HTTPMethods.GET)
    return await makeAPICall<ReferenceIDValidation>(request)
}

export async function createCoinbaseCheckout(paymentRequest:PaymentRequest){
    let apiRequest = new ApiRequest(
        URL_COINBASE_CREATE_CHARGE,
        HTTPMethods.POST,
        JSON.stringify(paymentRequest))

    return await makeAPICall<CoinbaseCreateChargeResponse>(apiRequest)
}