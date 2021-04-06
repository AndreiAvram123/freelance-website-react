import  {makeAPICall} from "./NetworkExecutor";
import {URL_CREATE_CATEGORY} from "../utils/ApiConstants";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";

 interface CategoryCreationModel {
    categoryName :string,
     imageData:string
}
export function makeCreateCategoryCall(creationModel :CategoryCreationModel){
      return makeAPICall(new ApiRequest(URL_CREATE_CATEGORY,HTTPMethods.POST,JSON.stringify(creationModel)))
}