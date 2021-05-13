import  {makeAPICall} from "./NetworkExecutor";
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
   return  await makeAPICall<TotalCustomersResponse>(new ApiRequest(URL_ANALYTICS_TOTAL_CUSTOMERS,HTTPMethods.GET))
}

export async function fetchTotalAmount(){
   return  await makeAPICall<TotalAmount>(new ApiRequest(URL_ANALYTICS_TOTAL_AMOUNT,HTTPMethods.GET))
}

export async function getOrders(page:number){
    return await makeAPICall<Order[]>(new ApiRequest(URL_ANALYTICS_ORDERS(page),HTTPMethods.GET))
}