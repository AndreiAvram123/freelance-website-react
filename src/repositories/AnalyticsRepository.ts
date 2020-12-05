import makeCall from "./CallRunner";
import {URL_ANALYTICS_TOTAL_CUSTOMERS} from "../utils/ApiConstants";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";

export type TotalCustomersResponse ={
    total:number,
    newUsersThisMonth:number
}
export async function fetchTotalCustomers(){
    const response = await makeCall(new ApiRequest(URL_ANALYTICS_TOTAL_CUSTOMERS,HTTPMethods.GET))
    return response  as TotalCustomersResponse
}