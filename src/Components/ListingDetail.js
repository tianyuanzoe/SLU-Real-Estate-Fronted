import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";

// Contexts
import StateContext from "../Contexts/StateContext";

// Assets
import defaultProfilePicture from "./Assets/defaultProfilePicture.jpg";

// MUI
import {
	Grid,
	AppBar,
	Typography,
	Breadcrumbs,
	Link,
	Button,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CircularProgress,
	TextField,
	FormControlLabel,
	Checkbox,
	IconButton,
	CardActions,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import RoomIcon from "@mui/icons-material/Room";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { makeStyles } from "@mui/styles";
import { SettingsEthernet } from "@mui/icons-material";

const useStyles = makeStyles({
	sliderContainer:{
		position:"relative",
		marginTop:'1rem'
	},
	leftArrow:{
		position:'absolute',
		cursor:'pointer',
		fontSize:"3rem",
		color:"white",
		top:"50%",
		left:"27.5%",
		"&:hover":{
			backgroundColor:'green',
		}
	},
	rightArrow:{
		position:'absolute',
		cursor:'pointer',
		fontSize:"3rem",
		color:"white",
		top:"50%",
		right:"27.5%",
		"&:hover":{
			backgroundColor:'green',
		}
	},

});




function ListingDetail() {
	const classes = useStyles();
	const navigate = useNavigate();
	const GlobalState = useContext(StateContext);

	const params = useParams();

	const initialState = {
		listingInfo:"",
		dataIsLoading: true,
		sellerProfileInfo:""
	};

	function ReducerFuction(draft, action) {
		switch (action.type) {
			case "catchListingInfo":
				draft.listingInfo = action.listingObject
				break;

			case "loadingDone":
				draft.dataIsLoading = false;
				break;
			case 'catchSellerProfileInfo':
				draft.sellerProfileInfo = action.profileObject	
		}
	}
	const [currentPicture,setCurrentPicture] = useState(0);	
	const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);
	//-----------------------------next and previous picture----------//
function NextPicture(){
	if(currentPicture === listingPictures.length - 1){
		return setCurrentPicture(0)
	}
	else{
		setCurrentPicture(currentPicture + 1);
	}
	
}
function PreviousPicture(){
	if(currentPicture === 0){
		return setCurrentPicture(listingPictures.length - 1)
	}
	else{
		setCurrentPicture(currentPicture - 1);
	}
}
const date = new Date(state.listingInfo.date_posted)
const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

	// ----------------------request to get listing info-------
	useEffect(() => {
		async function GetListingInfo() {
			try {
				const response = await Axios.get(
					`http://localhost:8000/api/listings/${params.id}/`
				);

				dispatch({
					type: "catchListingInfo",
					listingObject: response.data,
				});
			} catch (e) {}
		}
		GetListingInfo();
	}, []);
	//--------------------request to get profile info
	useEffect(() => {
		if(state.listingInfo){
		async function GetProfileInfo() {
				try {
					const response = await Axios.get(
						`http://localhost:8000/api/profiles/${state.listingInfo.seller}/`
					);
					console.log(response.data);
	
					dispatch({
						type: "catchSellerProfileInfo",
						profileObject: response.data,
					});
					dispatch({ type: "loadingDone" });
				} catch (e) {
					console.log(e.response)
				}

			
			
		}
		GetProfileInfo();
	}
	
	}, [state.listingInfo]);


	const listingPictures = [state.listingInfo.picture1,
		state.listingInfo.picture2,
		state.listingInfo.picture3,
		state.listingInfo.picture4,
		state.listingInfo.picture5,].filter((picture)=>picture !== null);
	

	if (state.dataIsLoading === true) {
		return (
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				style={{ height: "100vh" }}
			>
				<CircularProgress />
			</Grid>
		);
	}
  return (
	<div style = {{marginLeft:'2rem',marginRight:'2rem',marginBottom:"2rem"}}>
		<Grid style = {{marginTop:'1rem'}}>
		<Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" 
  style = {{cursor:"pointer"}}
  onClick={()=>navigate("/listings")}>
    Listings
  </Link>
  
  <Typography color="text.primary">{state.listingInfo.title}</Typography>
</Breadcrumbs>
		</Grid>

		{/* inmage slider */}
		{listingPictures.length > 0 ? (
		<Grid item container justifyContent='center' className={classes.sliderContainer}>
			{listingPictures.map((picture,index)=>{
				return(
					<div key = {index}>
						{index === currentPicture ?<img src = {picture} style ={{width:'45rem',height:"35rem"}}/>:""}
					</div>
				)
			})}
			<ArrowCircleLeftIcon onClick = {PreviousPicture} className ={classes.leftArrow}/>
			<ArrowCircleRightIcon onClick = {NextPicture} className ={classes.rightArrow}/>
			
		</Grid>):""}
		{/* ------------------more information---------- */}
		<Grid item container style = {{padding:'1rem',border:'1px solid black',marginTop:"1rem"}}>
		<Grid item container xs = {7}direction="column" spacing={1}>
			<Grid item>
				<Typography variant = "h5">{state.listingInfo.title}</Typography>
			</Grid>
			<Grid item>
				<RoomIcon />{" "}
				<Typography variant="h6">{state.listingInfo.borough}</Typography>
			</Grid>
			<Grid item>
				<Typography variant = "subtitle1" >{formattedDate}</Typography>
			</Grid>
		</Grid>
		<Grid item container xs = {5} align = 'center'>
			<Typography variant = "h6" style = {{fontWeight:"bolder",color:"green"}}>
				{state.listingInfo.listing_type}|{`$${state.listingInfo.price.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/${state.listingInfo.rental_frequency}`}
			</Typography>
		</Grid>
		</Grid>
		<Grid item container justifyContent="flex-star" 
		style = {{padding:'1rem',border:'1px solid black',marginTop:"1rem"}}>
			{state.listingInfo.rooms ?(
				<Grid item xs={2}style = {{display:"flex"}}>
					
					<Typography variant="h6">{state.listingInfo.rooms} Rooms</Typography>
				</Grid>
			):""}

			{state.listingInfo.furnished ?(
				<Grid item xs={2}style = {{display:"flex"}}>
					<CheckBoxIcon style={{color:"green",fontSize:"2rem"}}/>
					<Typography variant="h6">Furnished</Typography>
				</Grid>
			):""}

			{state.listingInfo.pool ?(
				<Grid item xs={2}style = {{display:"flex"}}>
					<CheckBoxIcon style={{color:"green",fontSize:"2rem"}}/>
					<Typography variant="h6">Pool</Typography>
				</Grid>
			):""}

			



			{state.listingInfo.elevator ?(
				<Grid item xs={2}style = {{display:"flex"}}>
					<CheckBoxIcon style={{color:"green",fontSize:"2rem"}}/>
					<Typography variant="h6">Elevator</Typography>
				</Grid>
			):""}

			{state.listingInfo.cctv ?(
				<Grid item xs={2} style = {{display:"flex"}}>
					<CheckBoxIcon style={{color:"green",fontSize:"2rem"}}/>
					<Typography variant="h6">CCTV</Typography>
				</Grid>
			):""}

			{state.listingInfo.parking ?(
				<Grid item xs={2} style = {{display:"flex"}}>
					<CheckBoxIcon style={{color:"green",fontSize:"2rem"}}/>
					<Typography variant="h6">Parking</Typography>
				</Grid>
			):("")}


		</Grid>
		{/* -------------------------Description------- */}
		{state.listingInfo.description? (
			<Grid item 
			style = {{padding:'1rem',border:'1px solid black',marginTop:"1rem"}}>
			<Typography variant = "h5">
				Description
			</Typography>
			<Typography variant = "h6">{state.listingInfo.description}</Typography>
		</Grid>
		):""}

		{/* --------------------The seller Info -----------*/}
		<Grid
				container
				style={{
					width: "50%",
					marginLeft: "auto",
					marginRight: "auto",
					border: "5px solid black",
					marginTop: "1rem",
					padding: "5px",
				}}
			>
				<Grid item xs={6}>
					<img
						style={{ height: "10rem", width: "15rem",cursor:"pointer"}}
						src={
							state.sellerProfileInfo.profile_picture !== null
								? state.sellerProfileInfo.profile_picture
								: defaultProfilePicture
						}
						onClick = {()=>navigate(`/agencies/${state.sellerProfileInfo.seller}`)}
					/>
				</Grid>
				<Grid item container direction="column" justifyContent="center" xs={6}>
					<Grid item>
						<Typography
							variant="h5"
							style={{ textAlign: "center", marginTop: "1rem" }}
						>
							<span style={{ color: "green", fontWeight: "bolder" }}>
								{state.sellerProfileInfo.agency_name
}
							</span>
						</Typography>
					</Grid>
					<Grid item>
						<Typography
							variant="h5"
							style={{ textAlign: "center", marginTop: "1rem" }}
						>
							<IconButton>
								<LocalPhoneIcon /> {state.sellerProfileInfo.phone_number}
							</IconButton>
						</Typography>
					</Grid>
				</Grid>
			</Grid>

	</div>
	
  )
}

export default ListingDetail