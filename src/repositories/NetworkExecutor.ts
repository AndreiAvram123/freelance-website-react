import {ApiRequest} from "./requests/ApiRequest";
import {ErrorApiResponse, ApiResponse} from "./ApiResponse";
import {obtainNewAccessToken} from "../utils/UserManager";


export class ApiError  {
    statusCode :number
    message?:string
    constructor(statusCode:number,message?:string) {
        this.statusCode = statusCode
        this.message = message
    }
}

export  async  function makeAPICall <T>(request:ApiRequest):Promise<ApiResponse<T>>{
    const response = await fetch(request.url,request.requestBody)
    switch (response.status){
        case 200 : {
            let responseJSON = response.json()
            return await responseJSON as ApiResponse<T>
        }
        case 401 :{
            await obtainNewAccessToken()
            return makeAPICall<T>(request)
        }
        case 403 : {
            throw new ApiError(403)
        }
        default : {
            let stringError = ( await response.json() as ErrorApiResponse).error
            throw new ApiError(response.status, stringError)
        }
    }
}
