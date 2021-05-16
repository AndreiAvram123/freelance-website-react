import  {makeAPICall} from "./NetworkExecutor";
import {URL_CREATE_CATEGORY, URL_FETCH_CATEGORIES} from "../utils/ApiConstants";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";
import {Category} from "./ProductRepository";

 interface CategoryCreationModel {
    categoryName :string,
     imageData:string
}
export function makeCreateCategoryCall(creationModel :CategoryCreationModel){
      return makeAPICall<never>(new ApiRequest(URL_CREATE_CATEGORY,HTTPMethods.POST,JSON.stringify(creationModel)))
}

export async function fetchCategories(){
    return await makeAPICall<Category[]>(new ApiRequest(URL_FETCH_CATEGORIES,HTTPMethods.GET))
}