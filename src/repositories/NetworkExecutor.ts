import {ApiRequest} from "./requests/ApiRequest";
import {ErrorApiResponse, SuccessfulApiResponse} from "./SuccessfulApiResponse";
import {signOut} from "../utils/UserManager";


export class ApiError  {
    statusCode :number
    message?:string
    constructor(statusCode:number,message?:string) {
        this.statusCode = statusCode
        this.message = message
    }
}

export  async  function makeAPICall <T>(request:ApiRequest){
    const response = await fetch(request.url,request.requestBody)
    switch (response.status){
        case 200 : {
            let responseJSON = response.json()
            return await responseJSON as SuccessfulApiResponse<T>
        }
        case 401 :{
           signOut()
           throw new ApiError(401)
        }
        case 403 : {
            signOut()
            throw new ApiError(403)
        }
        default : {
            let stringError = ( await response.json() as ErrorApiResponse).error
            throw new ApiError(response.status, stringError)
        }
    }
}
