import {ApiRequest} from "./requests/ApiRequest";
import {ApiResponse} from "./ApiResponse";
import {signOut} from "../utils/UserManager";


export class ApiError  {
    statusCode :number
    constructor(statusCode:number) {
        this.statusCode = statusCode
    }
}

export  async  function makeAPICall <T>(request:ApiRequest){
    const response = await fetch(request.url,request.requestBody)
    switch (response.status){
        case 200 : {
            let responseJSON = response.json()
            return await responseJSON as ApiResponse<T>
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
            throw new ApiError(response.status)
        }
    }
}
