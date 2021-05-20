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

    if(response.status >= 200 && response.status <=300){
        let responseJSON = response.json()
        return await responseJSON as ApiResponse<T>
    }
    switch (response.status){

        case 401 :{
            await obtainNewAccessToken()
            throw new ApiError(401)
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
