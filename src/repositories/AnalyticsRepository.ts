import makeCall, {makeAPICall} from "./CallRunner";
import {
    URL_ANALYTICS_COUNT_AVAILABLE_PRODUCTS,
    URL_ANALYTICS_ORDERS,
    URL_ANALYTICS_TOTAL_AMOUNT,
    URL_ANALYTICS_TOTAL_CUSTOMERS
} from "../utils/ApiConstants";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";
import {Order} from "../entities/Order";

export type TotalCustomersResponse ={
    total:number,
    newUsersThisMonth:number
}
export type TotalAvailableProductsResponse ={
    total:number
}


export interface TotalAmount{
   total :number
}

export async function fetchTotalNumberAvailableProducts(){
    return await makeAPICall<TotalAvailableProductsResponse>(new ApiRequest(URL_ANALYTICS_COUNT_AVAILABLE_PRODUCTS,HTTPMethods.GET))
}

export async function fetchTotalCustomers(){
    const response = await makeCall(new ApiRequest(URL_ANALYTICS_TOTAL_CUSTOMERS,HTTPMethods.GET))
    return response  as TotalCustomersResponse
}

export async function fetchTotalAmount(){
    const response = await makeCall(new ApiRequest(URL_ANALYTICS_TOTAL_AMOUNT,HTTPMethods.GET))
    return response as TotalAmount
}

export async function getOrders(page:number){
    const response = await makeCall(new ApiRequest(URL_ANALYTICS_ORDERS(page),HTTPMethods.GET))
    return response as Order[]
}