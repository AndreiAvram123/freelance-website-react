import {saveAccessToken, saveRefreshToken} from "../components/StorageHandler";
import {makeAPICall} from "./NetworkExecutor";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";
import {URL_FETCH_NEW_TOKEN, URL_LOGIN, URL_REGISTER} from "../utils/ApiConstants";

export enum RegisterResponse{
    USERNAME_TAKEN = "Username already exists",
    EMAIL_TAKEN = "Email already exists"
}

export enum AuthenticationResponse{
    INVALID_USERNAME_OR_PASSWORD = "Invalid username or password",
    UNKNOWN_ERROR = "Unknown error"
}
export type AccessTokenResponse ={
     accessToken:string
}
export type LoginResponse = {
    accessToken:string,
    refreshToken:string
}



export  async function fetchNewToken(refreshToken:string){
       let request = new ApiRequest(URL_FETCH_NEW_TOKEN(refreshToken),HTTPMethods.GET)
      return makeAPICall<AccessTokenResponse>(request)
}

export async function login(username:string, password:string){
    let bodyJson = JSON.stringify({username: username, password: password})
    let apiRequest = new ApiRequest(URL_LOGIN,HTTPMethods.POST,bodyJson)
    await makeAPICall<LoginResponse>(apiRequest).then((result)=>{
        console.log(result)
       saveAccessToken(result.data.accessToken)
       saveRefreshToken(result.data.refreshToken)
       return
    }).catch((error)=>{
        if(error.statusCode === 403){
            return AuthenticationResponse.INVALID_USERNAME_OR_PASSWORD
        }
        return AuthenticationResponse.UNKNOWN_ERROR
     })
}

export function register(username:string,email:string,password:string){
    let request = new ApiRequest(URL_REGISTER,HTTPMethods.POST,JSON.stringify(
        {username: username, email: email ,password: password}))
    return makeAPICall<never>(request)
}