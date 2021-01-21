import {ApiRequest} from "./requests/ApiRequest";
import {ApiResponse} from "./ApiResponse";


export default async  function makeCall(request:ApiRequest){
    const response = await fetch(request.url,request.requestBody)
    if(response.status === 204){
       throw new ApiError(204)
    }
    if(response.status !== 200){
        throw new ApiError(404)
    }

    return await response.json()

}

export class ApiError  {
    statusCode :number
    constructor(statusCode:number) {
        this.statusCode = statusCode
    }
}

export  async  function makeAPICall <T>(request:ApiRequest){
    const response = await fetch(request.url,request.requestBody)
    if(response.status === 204){
        throw new ApiError(204)
    }
    if(response.status !== 200){
        throw new ApiError(404)
    }
   let responseJSON = response.json()


    return await  responseJSON as ApiResponse<T>

}
