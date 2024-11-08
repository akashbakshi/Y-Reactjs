
const BASE_URL = "http://localhost:8080"


export const LOGIN_ENDPOINT = `${BASE_URL}/api/v1/users/login`

export const HOMEFEED_ENDPOINT = `${BASE_URL}/api/v1/tweets/`

export const LIKE_INTERACTION_TWEET_ENDPOINT = (tweetId)=> `${BASE_URL}/api/v1/tweets/like/${tweetId}`;

export const COMMENT_ENDPOINT = `${BASE_URL}/api/v1/tweets/comments`