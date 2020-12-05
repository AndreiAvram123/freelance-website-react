import {ApiRequest} from "./requests/ApiRequest";


export default async  function makeCall(request:ApiRequest){
    const response = await fetch(request.url,request.requestBody)
    if(response.status === 204){
       throw new ApiError(204)
    }
    if(response.status !== 200){
        throw new ApiError(404)
    }

    let json = await response.json()
    return json

}

export class ApiError  {
    statusCode :number
    constructor(statusCode:number) {
        this.statusCode = statusCode
    }
}