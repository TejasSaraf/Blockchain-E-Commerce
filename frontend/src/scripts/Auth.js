import { Post, Get } from "./apiClient";

export function loginCall(data){
    // api call to get login into our system
    return Post('/api/login',data);
}

export function registerCall(data){
    // api call to register a new user
    return Post('/api/register',data);
}

export function validateUser(){
    // api which will return information about user
    return Get('/api')
}

export function forgotPassword(data){
    return Post('/api/password-reset',data);
}

export function resetPassword(userId,resetToken,data){
    return Post(`/api/password-reset/changepassword/${userId}/token/${resetToken}`)
}