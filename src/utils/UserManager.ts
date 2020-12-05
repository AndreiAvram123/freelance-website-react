import {isDefaultToken} from "../components/StorageHandler";

export function signOut(){
    localStorage.clear()
    window.location.href = "/"
}

export function isUserLoggedIn():boolean{
    return !isDefaultToken()
}