import makeCall from "./CallRunner";
import {URL_FETCH_REVIEWS} from "../utils/ApiConstants";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";
import {Review} from "../entities/Review";





export async function fetchReviewsForProduct(productID:number){
   const response = await makeCall(new ApiRequest(URL_FETCH_REVIEWS(productID),HTTPMethods.GET))
    return response as Review[]
}