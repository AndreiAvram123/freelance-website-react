import makeCall from "./CallRunner";
import {URL_CREATE_REVIEWS,  URL_FETCH_REVIEWS} from "../utils/ApiConstants";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";
import {Review} from "../entities/Review";


export interface CreateReviewModel{
     userID:number,
     productID:number,
     description:string,
     rating:number

}

export async function createReview(createReviewModel:CreateReviewModel){
    const response = await makeCall(new ApiRequest(URL_CREATE_REVIEWS,HTTPMethods.POST,JSON.stringify(createReviewModel)))
    return response
}

export async function fetchReviewsForProduct(productID:number){
   const response = await makeCall(new ApiRequest(URL_FETCH_REVIEWS(productID),HTTPMethods.GET))
    return response as Review[]
}