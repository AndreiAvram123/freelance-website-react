export function fetchToken(username,password){
    return new Promise((resolve, reject) => {
        let url = "https://rest-kotlin.herokuapp.com/login"
        let bodyJson = JSON.stringify({username: username, password: password})

        return fetch(url, {
            method: 'POST',
            body: bodyJson,
            mode: "cors"
        }).then(function (response) {
            if(response.status === 403) {
                reject("Unauthorized")
            }else{
                let token = response.headers.get("Authorization")
                localStorage.setItem("token", token)
                resolve()
            }
        }).catch(error=>{
            reject(error)
        })
    })
}

export function register(username,email,password){
    return new Promise(((resolve, reject) => {
        let url = "https://rest-kotlin.herokuapp.com/register"
        let bodyJson = JSON.stringify({username: email, email: email ,password: password})
        return fetch(url,{
            method : "POST",
            body: bodyJson,
            headers : {
                'Content-Type': 'application/json'
            },
        }).then(function (response) {
            resolve()
        }).catch(error=>{
            console.log(error)
            reject(error)
        })
    }))
}