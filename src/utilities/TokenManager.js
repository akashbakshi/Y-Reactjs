

const ACCESS_TOKEN_KEY = "token";


export const SetAccessToken = (token)=>{

    localStorage.setItem(ACCESS_TOKEN_KEY,token);
}

export const GetAccessToken = ()=> localStorage.getItem(ACCESS_TOKEN_KEY);

export const ClearToken = ()=>{
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export const IsUserLoggedIn = ()=>{
    return localStorage.getItem(ACCESS_TOKEN_KEY) !== null;
}