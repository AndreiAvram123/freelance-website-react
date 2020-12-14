import makeCall from "./CallRunner";
import {URL_CREATE_CATEGORY} from "../utils/ApiConstants";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";

 interface CategoryCreationModel {
    categoryName :string
}
export function makeCreateCategoryCall(creationModel :CategoryCreationModel){

      return makeCall(new ApiRequest(URL_CREATE_CATEGORY,HTTPMethods.POST,JSON.stringify(creationModel)))
}