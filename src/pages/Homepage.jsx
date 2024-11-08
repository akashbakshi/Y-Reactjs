import {Button, Container, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {ClearToken, GetAccessToken, IsUserLoggedIn} from "../utilities/TokenManager.js";
import {HOMEFEED_ENDPOINT} from "../Endpoints.js";
import TweetCard from "../components/TweetCard.jsx";

import logo from '/vite.svg'
import {Link} from "react-router-dom";


const LinkButton = ({href,text})=>{
    return(
        <Link to={href}><Button fullWidth={true} variant={"outlined"} size={"large"}>{text}</Button></Link>
    )
}

const WelcomeComponent = ()=>{
    return(
        <Grid container direction={"row"} justifyContent={"start"} alignItems={"center"}>
            <Grid item xs={8}>
                <img src={logo} alt={"logo"} style={{width: '512px',height:'512px'}}/>
            </Grid>
            <Grid item xs={4}>
                <LinkButton href={"/login"} text={"Login"}/>
                <Typography textAlign={"center"} variant={"h6"} sx={{py:'10px'}}>Or</Typography>
                <LinkButton href={"/signup"} text={"Create Account"}/>
            </Grid>
        </Grid>
    )
}

const Homepage = ()=>{

    const [tweets, setTweets] = useState([]);

    const [auth,setAuth] = useState(IsUserLoggedIn());
    const token = GetAccessToken();


    const fetchTweets = async ()=>{

        if(token !== null || token !== undefined){
            let tweetTeqOptions = {
                method: 'GET',
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            }

            try{
                const response = await fetch(HOMEFEED_ENDPOINT,tweetTeqOptions);

                if(response.ok){

                    try{
                        const tweetsData = await response.json();
                        setTweets(tweetsData);

                    }catch(jsonErr){
                        console.error(jsonErr);
                    }
                }

                else if(response.status === 401)
                {
                    ClearToken();
                }

            }catch(e){
                console.error(e);
            }



        }
    }

    useEffect(() => {
        fetchTweets();
    }, []);

    return(
        <Container maxWidth={"md"}>

                {auth?(
                    <Grid container
                          justifyContent={"center"}
                          alignItems={"center"}
                          direction={"column"}
                          spacing={4}

                    >
                        {tweets.map((tweet,index)=>(
                            <Grid item xs={12} key={index} sx={{width: '100%'}}>
                                <TweetCard id={tweet.id} content={tweet.content} username={tweet.userInfo.username} createdAt={tweet.createdAt} displayName={tweet.userInfo.displayName} likes={tweet.likesByUsername} currentUser={"akash123"} comments={tweet.comments}/>
                            </Grid>
                        ))}

                    </Grid>
                ):(
                    <WelcomeComponent/>
                )}

        </Container>
    )
}


export default Homepage;