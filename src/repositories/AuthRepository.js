export function fetchToken(email,password){
    return new Promise((resolve, reject) => {
        let url = "https://rest-kotlin.herokuapp.com/login"
        let bodyJson = JSON.stringify({username: email, password: password})

        return fetch(url, {
            method: 'POST',
            body: bodyJson,
            mode: "cors"
        }).then(function (response) {
            let token = response.headers.get("Authorization")
            localStorage.setItem("token", token)
            resolve()
        }).catch(error=>{
            reject(error)
        })
    })

}