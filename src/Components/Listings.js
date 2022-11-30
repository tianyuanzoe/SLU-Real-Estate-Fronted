import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import { useNavigate } from "react-router-dom";
// React leaflet
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	Polyline,
	Polygon,
	useMap,
} from "react-leaflet";
import { Icon } from "leaflet";
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
	IconButton,
	CardActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import RoomIcon from "@mui/icons-material/Room";

// Map icons
import houseIconPng from "./Assets/Mapicons/house.png";
import apartmentIconPng from "./Assets/Mapicons/apartment.png";
import officeIconPng from "./Assets/Mapicons/office.png";
// Assets
import img1 from "./Assets/img1.jpg";
import myListings from "./Assets/Data/Dummydata";
import polygonOne from "./Shape";
import { green } from "@mui/material/colors";

const useStyles = makeStyles({
	cardStyle: {
		margin: "0.5rem",
		border: "1px solid black",
		position: "relative",
	},
	pictureStyle: {
		paddingRight: "1rem",
		paddingLeft: "1rem",
		height: "20rem",
		width: "30rem",
		cursor: "pointer",
	},
	priceOverlay: {
		position: "absolute",
		backgroundColor: "green",
		zIndex: "1000",
		color: "white",
		top: "100px",
		left: "20px",
		padding: "5px",
	},
});
function Listings() {
	//fetch("http://localhost:8000/api/listings").then((response) => response.json()).then((data) => console.log(data));
	const classes = useStyles();
	const houseIcon = new Icon({
		iconUrl:houseIconPng,
		iconSize:[40,40],
	});
	const apartmentIcon = new Icon({
		iconUrl:apartmentIconPng,
		iconSize:[40,40],
	});
	const officeIcon = new Icon({
		iconUrl:officeIconPng,
		iconSize:[40,40],
	});
	
	const[latitude,setLatitude] = useState(47.625650276247036)
	const[longtitude,setLongtitude] = useState(-122.33418978466639)
	function GoEast(){
		setLatitude(47.62127181014346);
		setLongtitude(-122.3335624482696);
	}
	function GoCenter(){
		setLatitude(47.625650276247036);
		setLongtitude(-122.33418978466639);
	}
	const ployOne = [
		[47.62075143319851, -122.34927089823627],
		[47.61055061382983, -122.34275646400732],
		[47.62107160617573, -122.33189907379352],

	]
	const[allListings,setAllListings] = useState([]);
	const[dataIsLoading,setDataIsLoading] = useState(true)
	
	useEffect(()=>{
		const source = Axios.CancelToken.source();
		async function GetAllListings(){
			//console.log(response.data);
			try{
				const response = await Axios.get("http://localhost:8000/api/listings",{cancelToken:source.token});
				setAllListings(response.data);
				setDataIsLoading(false);
			}
			catch(error){
				console.log(error.response)
			}
			
		}
		GetAllListings();
		return ()=>{
			source.cancel();
		}
	},[]);
	
	if(dataIsLoading === true){
		return(
			<Grid container justifyContent="center" alignItems="center" style = {{height:"100vh"}}>
			<CircularProgress />
			</Grid>
		)
		
	}
	
	return(
		<Grid container>
			<Grid item xs = {4}>	
			{allListings.map((listing)=>{
				return(
					<Card key = {listing.id} className ={classes.cardStyle}>
				<CardHeader

				/* action={
				<IconButton aria-label="settings">
					<MoreVertIcon />
				</IconButton>
				} */
				title={listing.title}
				/>
				<CardMedia
				className={classes.pictureStyle}
				component="img"
				image={listing.picture1}
				alt={listing.title}
				/>
				<CardContent>
				<Typography variant="body2" >
				{listing.description.substring(0,200)}...
				</Typography>
				</CardContent>
				{listing.property_status === "Sale"?
				<Typography className={classes.priceOverlay}>
					{listing.listing_type}
					${listing.price.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
					</Typography>:
					<Typography className={classes.priceOverlay}>
						{listing.listing_type}
						${listing.price.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}/{listing.rental_frequency}
					</Typography>

				
			
			}
				
				{/*  <CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
				<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
				<ShareIcon />
				</IconButton>

				</CardActions> */}

        	</Card>
				)
			})}
		</Grid>	
					
		<Grid item xs = {8} style = {{marginTop:"0.5rem"}}>
			<AppBar position = "sticky">
				<div style = {{height:"100vh"}}>
		<MapContainer center={[47.625650276247036, -122.33418978466639]} zoom={15} scrollWheelZoom={true}>
		<TileLayer
		attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>
		<Polyline positions = {ployOne} color = "green"/>
		<Polygon positions = {polygonOne} fillOpacity = {0.9}
		opacity = {0}
		
		/>
		

		{allListings.map((listing) => {
			function IconDisplay(){
				if (listing.listing_type ==="House"){
					return houseIcon
				}
				else if(listing.listing_type == "Apartment"){
					return apartmentIcon
				}else if (listing.listing_type == "Office"){
					return officeIcon
				}

			}
			return(
		
			<Marker 
			key = {listing.id} 
			icon = {IconDisplay()}
			position = {[listing.latitude,listing.longitude]}>
			<Popup>
		<Typography variant="h5">{listing.title}</Typography>
		<img src = {listing.picture1} style = {{height:"14rem",width:"18rem"}}/>
		<Typography variant="body1">{listing.description.substring(0,150)}...</Typography>
		<Button variant = "contained" fullWidth>Details</Button>
		</Popup>
			</Marker>
			
		);
		})}
		</MapContainer>
		</div>
		</AppBar>
			</Grid>
		</Grid>
		
	)
}

export default Listings;
