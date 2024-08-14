'use server';

import { cookies } from 'next/headers'
// so we will use cookies , to store the user session data ...
export async function handleRefresh() {
    console.log("handle refresh")
    const refreshToken = await getRefreshToken()

    const token = await fetch('http://localhost:8000/api/auth/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({
            refresh: refreshToken
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('refresh response : ', json)

            if (json.access) {
                // this means we need to set the new refresh token
                cookies().set('session_access_token', json.access, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60, // 1 hr 
                    path: '/'
                });
                return json.access
            }
            else {
                // reset , logout
                resetAuthCookies()
            }
        })
        .catch((err) => {
            console.log("error : ", err)
            resetAuthCookies()
        })

    return token

}


export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    cookies().set('session_userid', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week in secs
        path: '/'
    });

    cookies().set('session_access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hr 
        path: '/'
    });

    cookies().set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/'
    });
}

export async function resetAuthCookies() {
    cookies().set('session_userid', '');
    cookies().set('session_access_token', '');
    cookies().set('session_refresh_token', '');
}

// get cookie data
export async function getUserId() {
    const userId = cookies().get('session_userid')?.value;
    console.log("got the user id : ", userId)
    return userId ? userId : null;
}

// function to get tokens for accessing authenticated requiring api calls to the backend
export async function getAccessToken() {
    let accessToken = cookies().get('session_access_token')?.value

    if (!accessToken) {
        accessToken = await handleRefresh();
    }

    return accessToken
}

// get the refreshed token
export async function getRefreshToken() {
    let refreshToken = cookies().get('session_refresh_token')?.value
    return refreshToken
}