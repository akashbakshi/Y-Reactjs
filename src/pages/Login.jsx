import {Button, Container, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {LOGIN_ENDPOINT} from "../Endpoints.js";
import {SetAccessToken} from "../utilities/TokenManager.js";
import {useNavigate} from "react-router-dom";



const Login = ()=>{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error,setErrors] = useState("");

    const navigate = useNavigate();

    const loginRequestToServer = async ()=>{

        const reqOptions = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        }

        const response = await fetch(LOGIN_ENDPOINT,reqOptions);

        if(response.ok){

            console.log(response.headers);
            const token = response.headers.get("access-token");
            SetAccessToken(token);

            navigate("/");

        }else if(response.status === 401){
            console.error("Timed out")
        }else{
            const errorRes = await response.text()

            setErrors(errorRes)
            console.error(errorRes);
        }
    }

    const onLoginClick = ()=>{
        if(username.trim().length === 0 || password.trim().length === 0){

            setErrors("Please enter username/password!")
        }else{
            setErrors("");

            loginRequestToServer();
        }
    }

    return(
        <Container maxWidth={"xl"} sx={{padding: '20px'}}>
            <Grid container
                justifyContent={"center"}
                  alignItems={"center"}
                  direction={"column"}
                  spacing={2}
            >

                <Grid item xs={12}>
                    <Typography variant={"h2"}>Login</Typography>
                </Grid>

                <Grid item xs={12}>
                    <TextField value={username} onChange={(e)=>setUsername(e.target.value)} placeholder={"Username"} fullWidth={true} error={error.trim().length > 0}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField type={"password"} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder={"Password"} fullWidth={true}  error={error.trim().length > 0}/>
                </Grid>

                {error.trim().length > 0 && (

                    <Grid item xs={12}>
                        <Typography color={"red"}>{error}</Typography>
                    </Grid>
                )}


                <Grid item xs={12}>
                    <Button onClick={()=>onLoginClick()} variant={"contained"}>Login</Button>
                </Grid>
            </Grid>
        </Container>
    )
}


export default Login;