import {ApiRequest} from "./requests/ApiRequest";

export default async  function makeCall(request:ApiRequest){
    const response = await fetch(request.url,request.requestBody)
    if(response.status !== 200){
        throw new Error("Something wrong with the endpoint")
    }
    let json = await response.json()
    return json

}