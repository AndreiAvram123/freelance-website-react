import {
    getRefreshTokenFromStorage,
    getTokenFromStorage
} from "../components/StorageHandler";
import jwtDecode from "jwt-decode";
import {fetchNewToken} from "../repositories/AuthRepository";
import {navigateHome} from "../helpers/RouterUtils";
import {ApiError} from "../repositories/NetworkExecutor";

type DecodedToken ={
    userID : number
    userRole:string
    exp: number
}

enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}
checkToken().then(()=>{

}).catch(()=>{

})

async function checkToken() {
    let token = getTokenFromStorage()
        if(token == null){
            await obtainNewAccessToken()
        }else{
            if(isTokenExpired(token)){
                await obtainNewAccessToken()
            }
        }
}


export async function obtainNewAccessToken(){
    let refreshToken = getRefreshTokenFromStorage()
    if(refreshToken != null){
        await fetchNewToken(refreshToken)
    }else{
        throw new ApiError(401, "Cannot get new access token")
    }
}

export function signOut(){
    localStorage.clear()
    navigateHome()
}

function isTokenExpired (token:string):Boolean{
     let decodedToken = jwtDecode(token) as DecodedToken
     return decodedToken.exp > Date.now()
}

export function isUserAdmin() :Boolean{
    let token = getTokenFromStorage()
    if(token == null){
        return false
    }
    let decodedToken = decodeToken(token)
    return decodedToken.userRole === UserRole.ADMIN
}


function decodeToken(token:string):DecodedToken{
    return jwtDecode(token) as DecodedToken
}

export function isUserLoggedIn():boolean{
    return getTokenFromStorage() != null
}



export function getUserID():number{
    let token = getTokenFromStorage()
    if(token == null){
        return 0
    }
    return decodeToken(token).userID
}