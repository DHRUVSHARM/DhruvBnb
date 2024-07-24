import { resolve } from "path";
import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any> {
        //for this function we expect the full url ...
        url = `${process.env.NEXT_PUBLIC_API_HOST}${url}`

        console.log(`get request from url : ${url} ...`)

        const token = await getAccessToken();

        // we will return a Promise 
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.ok) {
                        console.log("the response was ok ...")
                    }
                    console.log("response : ", response)
                    return response.json()
                })
                .then((json) => {
                    console.log(json);
                    resolve(json);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },

    //post request api service ...
    post: async function (url: string, data: any): Promise<any> {
        url = `${process.env.NEXT_PUBLIC_API_HOST}${url}`
        console.log(`post request from url : ${url} with data in body as ${data} ...`)

        // getting access token for authorization ..
        const token = await getAccessToken();

        let headers;

        if (token) {
            // headers for authorized requests ..
            headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        else {
            // for login , signup
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            }

        }


        // console.log("the token is : ", token)

        // we will return a Promise 
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                body: data,
                headers: headers
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