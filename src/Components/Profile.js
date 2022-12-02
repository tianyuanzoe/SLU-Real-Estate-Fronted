
import React, {useEffect, useState, useRef, useMemo,useContext} from "react";
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import {useImmerReducer} from "use-immer";

import StateContext from "../Contexts/StateContext";

// MUI
import {
    Grid,
    AppBar,
    Typography,
    Button,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CircularProgress,
    TextField,
    Snackbar,
    Alert,
    FormControlLabel,
    Checkbox

} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {ClassNames} from "@emotion/react";

const useStyles = makeStyles({
	formContainer: {
		width: "50%",
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: "3rem",
		border: "5px solid black",
		padding: "3rem",
	},
	loginBtn: {
		backgroundColor: "green",
		color: "white",
		fontSize: "1.1rem",
		marginLeft: "1rem",
		"&:hover": {
			backgroundColor: "blue",
		},
	},
	picturesBtn: {
        backgroundColor: "light blue",
        color: "white",
        fontSize: "0.9rem",
        border: '1px solid light blue',
        marginLeft: "1rem",
        "&:hover": {
            backgroundColor: "grey"
        }
    },
});


function Profile() {
	const classes = useStyles();
    const navigate = useNavigate();
	const GlobalState = useContext(StateContext)
	const initialState = {
        userProfile:{
            agencyName:'',
            phoneNumber:'',
        },
		agencyNameValue:'',
		phoneNumberValue:'',
		bioValue:'',
		uploadedPicture:[],
		profilePictureValue:'',
		sendRequest:0
    };
	const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)
	//-----------USE  effect to catch uploaded pictures
	useEffect(()=>{
		if(state.uploadedPicture[0]){
			dispatch({type:'catchProfilePictureChange',profilePictureChosen:state.uploadedPicture[0]})
		}
	},[state.uploadedPicture[0]])

    function ReducerFunction(draft, action) {
        switch (action.type) {
            case 'catchUserProfileInfo':
                draft.userProfile.agencyName = action.profileObject.agency_name;
                draft.userProfile.phoneNumber = action.profileObject.phone_number;
                break;  
			case 'catchAgencyNameChange':
				draft.agencyNameValue = action.agencyNameChosen
				break;	
			case 'catchPhoneNumberChange':
				draft.phoneNumberValue = action.phoneNumberChosen
				break;
			case 'catchBioChange':
				draft.bioValue = action.bioChosen;
				break
			case 'catchUploadedPicture':
				draft.uploadedPicture = action.pictureChosen;
				break
			case "catchProfilePictureChange":
				draft.profilePictureValue = action.profilePictureChosen	
				break
			case 'changeSendRequest':
				draft.sendRequest = draft.sendRequest + 1
				break	

    }
}

	//-----------------request to get a profile info-----------//
    useEffect(()=>{
        async function GetProfileInfo(){
            try{
                const response = await Axios.get(`http://localhost:8000/api/profiles/${GlobalState.userId}/`);
                console.log(response.data)
                dispatch({type:'catchUserProfileInfo',profileObject:response.data,})
            }catch(e){
                console.log(e.response)
            }
        }
        GetProfileInfo()
    },[])

	//--------------------------send Request-------------//
	useEffect(()=>{
		if(state.sendRequest){
			async function UpdateProfile(){
				const formData = new FormData()
				formData.append('agency_name',state.agencyNameValue);
				formData.append('phone_number',state.phoneNumberValue);
				formData.append('bio',state.bioValue);
				formData.append('profile_picture',state.profilePictureValue);
				formData.append('seller',state.userId);
				try{
					const response = await Axios.patch(`http://localhost:8000/api/profiles/${GlobalState.userId}/update/`,formData);
					console.log(response.data)
                    //navigate('/listings')
				}catch(e){
					console.log(e.response);
				}
			}
			UpdateProfile()
		}
	},[state.sendRequest]);

	//------------------------FormSubmit--------------//
	function FormSubmit(e){
		e.preventDefault()
		dispatch({type:'changeSendRequest'})
	}
  return(
	<>
	<div>
	<Typography variant = 'h5' style = {{textAlign:'center',marginTop:'1rem'}}>
		Welcome <span style = {{color:'green',fontWeight:"bolder"}}>{GlobalState.userUsername}</span>, please submit this form below to update your profile
	</Typography>
	</div>
	

	<div className={classes.formContainer}>
		<form onSubmit={FormSubmit}> 
		<Grid item container justifyContent="center">
			<Typography variant = 'h4'>
				MY PROFILE
			</Typography>
			</Grid>

			<Grid item container style = {{marginTop:"1rem"}}>
			<TextField id="agencyName" label="Agency Name*" variant="outlined" fullWidth
			value = {state.agencyNameValue}
			onChange = {(e)=>dispatch({type:"catchAgencyNameChange",agencyNameChosen:e.target.value})}
			
			/>
			
			</Grid>

			
			<Grid item container style = {{marginTop:"1rem"}}>
			<TextField id="phoneNumber" label="Contact Infomation*" variant="outlined" fullWidth 
			value = {state.phoneNumber}
			onChange = {(e)=>dispatch({type:"catchPhoneNumberChange",phoneNumberChosen:e.target.value})}/>
			</Grid>
{/*----------------------bio--------------------------- */}
			<Grid item container style = {{marginTop:"1rem"}}>
			<TextField id="bio" label="Bio" variant="outlined" fullWidth 
			multiline
			rows = {6}
			value = {state.bio}
			onChange = {(e)=>dispatch({type:"catchBioChange",bioChosen:e.target.value})}/>
			</Grid>

			{/* -------upload profile pictures---------------------------  */}
			<Grid item container
                xs={6}
                style={
                    {
                        marginTop: "1rem",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }
            }>
                <Button variant="contained" fullWidth component="label"
                    className={
                        classes.picturesBtn
                }>
                    PROFILE PICTURE
                    <input type="file" accept="image/png,image/gif,image/jpeg" hidden
                        onChange={
                            (e) => dispatch({type: 'catchUploadedPicture', pictureChosen: e.target.files})
                        }/>
                </Button>
            </Grid>
			{/* -----------------show profile picture---------- */}
			<Grid item container>
                <ul> {
                    state.profilePictureValue ? <li> {
                        state.profilePictureValue.name
                    }</li> : ""
                }
                    </ul>


            </Grid>

			{/* --------------UPDATE BUTTON---------------- */}
			<Grid item container xs = {8} style = {{marginTop:"1rem",marginLeft:"auto",marginRight:"auto"}}>
			<Button variant = "contained" fullWidth type = "submit" className = {classes.loginBtn}> UPDATE</Button>
			</Grid>
		</form>
		
			</div>
	</>
  )
}

export default Profile;