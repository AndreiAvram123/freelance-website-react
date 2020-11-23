
const fetch = require("node-fetch");

let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmRyZWkxMjM5IiwiZXhwIjoxNjM3NjkyNjgwLCJ1c2VySUQiOjksInVzZXJuYW1lIjoiYW5kcmVpMTIzOSJ9.lOZ8JAJGZ2egJHt78shnFQvBo3a-kHTLNaK_HuupQ8Fi45_nv4ZT40iSL8MJz3EeudELR-NQmtsQCxKKt-vsjA"
let url = "https://rest-kotlin.herokuapp.com/products/recent"
fetch(url, {
        headers : {
            Authorization: "Bearer " + token

        }
    }
).then(function (response) {
    return response.text()
}).then(data=>{
    console.log(data)
})