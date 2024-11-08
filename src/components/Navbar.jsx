import React,{useState} from "react";

import {Box, Button, Grid, Menu, MenuItem, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {ClearToken, GetAccessToken, IsUserLoggedIn} from "../utilities/TokenManager.js";


const NavbarLink = ({href, text})=>{

    return(
        <Link to={href}><Typography fontSize={"16px"} variant={"overline"} color={"white"}>{text}</Typography></Link>
    )
}

const AuthDrawer = ({username})=>{


    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
            <Button
                sx={{color:"#fff"}}
                aria-controls={isOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : undefined}

                onClick={(e)=>{
                    setAnchorEl(e.currentTarget)
                    setIsOpen(!isOpen)
                }}>{username}</Button>
            <Menu
                anchorEl={anchorEl}
                onClose={()=>setIsOpen(false)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}

                open={isOpen}>
                <MenuItem>My Account</MenuItem>
                <MenuItem onClick={()=>{
                    ClearToken();
                    navigate("/");
                }}>Logout</MenuItem>
            </Menu>
        </>

    )
}

export const Navbar = ()=>{

    const [auth,setAuth] = useState(IsUserLoggedIn());
    return(
        <Box sx={{backgroundColor: 'blue',width: '100%', paddingY:"16px",paddingX:"8px",marginBottom: "25px"}} >
            <Grid container direction={"row"}  sx={{
                justifyContent: "space-evenly",
                alignItems: "center",
            }}>
                <Grid item xs={3}>
                    <Link to={"/"}><Typography variant={"h5"} color={"white"}>Y</Typography></Link>
                </Grid>
                <Grid item xs={7}>

                </Grid>
                <Grid item xs={2}>
                    {auth ? (
                        <AuthDrawer username={"akash123"} />
                    ):(
                        <Grid container direction={"row"} spacing={0}>
                            <Grid item xs={2}>
                                <NavbarLink href={"/login"} text={"Login"}/>
                            </Grid>
                            <Grid item xs={3}>
                                <NavbarLink href={"/signup"} text={"Sign Up"}/>
                            </Grid>
                        </Grid>
                    )}

                </Grid>
            </Grid>
        </Box>
    )
}