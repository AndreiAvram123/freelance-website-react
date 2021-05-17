import {saveAccessToken, saveRefreshToken} from "../components/StorageHandler";
import {makeAPICall} from "./NetworkExecutor";
import {ApiRequest, HTTPMethods} from "./requests/ApiRequest";
import {URL_FETCH_NEW_TOKEN, URL_LOGIN, URL_REGISTER} from "../utils/ApiConstants";
import {encryptString} from "../utils/Encryptor";
import {fetchPublicEncryptionKey} from "./SecurityRepository";

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
export type LoginRequest = {
    username:string,
    password:string
}
export type RegisterRequest = {
    username:string,
    password:string,
    email:string

}


export  async function fetchNewToken(refreshToken:string){
       let request = new ApiRequest(URL_FETCH_NEW_TOKEN(refreshToken),HTTPMethods.GET)
      return makeAPICall<AccessTokenResponse>(request)
}

export async function login(username:string, password:string){
    let encryptionKeyResponse = await fetchPublicEncryptionKey()
    let key = encryptionKeyResponse.data.key

    let requestJson:LoginRequest = {
        username : encryptString(username,key),
        password : encryptString(password,key)
    }
    let apiRequest = new ApiRequest(URL_LOGIN,HTTPMethods.POST,JSON.stringify(requestJson))
    await makeAPICall<LoginResponse>(apiRequest).then((result)=>{
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

export async function register(username:string,email:string,password:string){
    let encryptionKeyResponse = await fetchPublicEncryptionKey()
    let key = encryptionKeyResponse.data.key
    let requestBody:RegisterRequest = {
        username: encryptString(username,key),
        email:encryptString(email,key),
        password: encryptString(password,key)
    }
    let request = new ApiRequest(URL_REGISTER,HTTPMethods.POST,JSON.stringify(requestBody))
    return await makeAPICall<never>(request)
}