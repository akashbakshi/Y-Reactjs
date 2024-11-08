import {
    Avatar, Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    IconButton, TextField,
    Typography
} from "@mui/material";

import {CommentOutlined, CommentSharp, CommentTwoTone, MoreVert} from "@mui/icons-material";
import {red} from "@mui/material/colors";

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {useState} from "react";
import {ClearToken, GetAccessToken} from "../utilities/TokenManager.js";
import {COMMENT_ENDPOINT, LIKE_INTERACTION_TWEET_ENDPOINT} from "../Endpoints.js";
import {useNavigate} from "react-router-dom";

const AddTweetComment = ({id})=>{

    const navigate = useNavigate();
    const [content, setContent] = useState("");

    const token = GetAccessToken();

    const onAddTweetClick = async ()=>{

        let addTweetReqObj = {
            method: 'POST',
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({tweetId: id, content})
        }


        try{
            let res = await fetch(COMMENT_ENDPOINT,addTweetReqObj)

            if(res.ok){
                navigate("/");
            }
            if(res.status === 401){
                ClearToken();
                navigate("/");
            }else{
                console.error("could not add comment");
            }

        }catch(e){
            console.error(e)
        }

    }

    return(
        <Card >
            <hr/>
            <CardContent>
                <Grid container spacing={2} direction="column" sx={{
                    justifyContent: "center",
                    alignItems: "stretch",
                }}>
                    <Grid item xs={12}>
                        <TextField fullWidth={true} placeholder={"Add A Comment here ..."} value={content} onChange={(e)=>setContent(e.target.value)}/>

                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={()=>onAddTweetClick()} variant={"contained"}>Submit</Button>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    )
}

const TweetComments = ({id,content,username,dateCommented})=>{

    const commentedDateObj = new Date(dateCommented);
    const formattedDate = `${commentedDateObj.toLocaleDateString()} ${commentedDateObj.toLocaleTimeString()}`
    return(
        <>
            <Card sx={{background: '#fcfcfc'}}>
                <hr/>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[500], scale: '85%'}} aria-label="recipe">
                            {username.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={username}
                    subheader={`@${username}`}
                />


                <CardContent>
                    <Grid container direction="row" sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Grid item xs={8}>
                            <Typography>{content}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant={"subtitle2"} textAlign={"end"}>{formattedDate}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>

    )
}

const TweetCard = ({id, content, createdAt,username,displayName, likes, currentUser ,comments})=>{

    const [liked,setLiked] = useState(likes.includes(currentUser))

    const [isCommentDrawerOpen,setIsCommentDrawerOpen] = useState(false);

    const onLikeClicked = async ()=>{

        let token = GetAccessToken();

        const likeOptions = {
            method: 'PATCH',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const res = await fetch(LIKE_INTERACTION_TWEET_ENDPOINT(id),likeOptions);

            if(res.ok){
                setLiked(!liked);
            }
            else if(res.status === 401)
                ClearToken();

        }catch(e){
            console.error(e);
        }

    }

    console.log(comments);

    return(
        <>
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {username.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={displayName}
                subheader={`@${username}`}
            />


            <CardContent>
                <Typography>{content}</Typography>
            </CardContent>

            <CardActions sx={{justifyContent: 'center'}}>
                {liked ? (
                    <IconButton onClick={()=>onLikeClicked()} >
                        <ThumbUpIcon/>
                    </IconButton>
                ):(
                    <IconButton onClick={()=>onLikeClicked()} >
                        <ThumbUpOffAltIcon/>
                    </IconButton>
                )}


                <IconButton sx={{paddingX: '50px'}} onClick={()=>{
                    setIsCommentDrawerOpen(!isCommentDrawerOpen)
                }}>
                   <>
                       <CommentSharp/>
                       <Typography variant={"subtitle1"} sx={{textWeight:'bold',paddingLeft:'6px'}}>{comments.length}</Typography>
                   </>
                </IconButton>


            </CardActions>
        </Card>
            {isCommentDrawerOpen ? (
                <>
                    {comments.map((comment,index)=>
                        <TweetComments username={comment.commentedByUser.username} dateCommented={comment.commentedAt} id={comment.id} content={comment.content}/>
                    )}
                    <AddTweetComment id={id}/>
                </>
            ):null}
        </>
    )
}


export default TweetCard;