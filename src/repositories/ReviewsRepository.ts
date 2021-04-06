
import {URL_CREATE_REVIEWS,  URL_FETCH_REVIEWS} from "../utils/ApiConstants";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";
import {Review} from "../entities/Review";
import {makeAPICall} from "./NetworkExecutor";


export interface CreateReviewModel{
     userID:number,
     productID:number,
     description:string,
     rating:number

}

export async function createReview(createReviewModel:CreateReviewModel){
   return  await makeAPICall(new ApiRequest(URL_CREATE_REVIEWS,HTTPMethods.POST,JSON.stringify(createReviewModel)))
}

export async function fetchReviewsForProduct(productID:number){
   return  await makeAPICall<Review[]>(new ApiRequest(URL_FETCH_REVIEWS(productID),HTTPMethods.GET))
}