import { resolve } from "path";

const apiService = {
    get: async function (url: string): Promise<any> {
        url = `${process.env.NEXT_PUBLIC_API_HOST}${url}`

        // we will return a Promise 
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log(json);
                    resolve(json);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

export default apiService;

/*
const url = 'http://localhost:9000/api/properties/';
await fetch(url, {
    method: 'GET',
})
    .then((response) => response.json())
    .then((json) => {
        console.log("the json got is as : ", json)
        setProperties(json.data)
    })
    .catch((error) => {
        console.log("error : ", error)
    })
*/