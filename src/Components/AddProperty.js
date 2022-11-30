import React, {useEffect, useState, useRef, useMemo,useContext} from "react";
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import {useImmerReducer} from "use-immer";
// React LeafLet
import {
    MapContainer,
    TileLayer,
    useMap,
    Polygon,
    Marker
} from 'react-leaflet';
// Boroughs
import Bellevue from './Assets/Boroughs/Bellevue';
import Bothell from './Assets/Boroughs/Bothell';
import Kirkland from './Assets/Boroughs/Kirkland';
import Redmond from './Assets/Boroughs/Redmond';
import Seattle from './Assets/Boroughs/Seattle';
import SLU from './Assets/Boroughs/SLU';

//Contexts
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

// ------------------useStyles---------------//

const useStyles = makeStyles({
    formContainer: {
        width: "75%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "3rem",
        border: "5px solid black",
        padding: "3rem"
    },
    registerBtn: {
        backgroundColor: "green",
        color: "white",
        fontSize: "1.1rem",
        marginLeft: "1rem",
        "&:hover": {
            backgroundColor: "blue"
        }
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
    }
});
// --------------------------Options------------------//
const areaOptions = [
    {
        value: '',
        label: ''
    }, {
        value: 'Inner SLU',
        label: 'Inner SLU'
    }, {
        value: 'Outer SLU',
        label: 'Outer SLU'
    },
]

const outerSLUOptions = [
    {
        value: '',
        label: ''
    },
    {
        value: 'Seattle',
        label: 'Seattle'
    },
    {
        value: 'Bellevue',
        label: 'Bellevue'
    },
    {
        value: 'Bothell',
        label: 'Bothell'
    }, {
        value: 'Kirkland',
        label: 'Kirkland'
    }, {
        value: 'Redmond',
        label: 'Redmond'
    },
]

const innerSLUOptions = [
    {
        value: '',
        label: ''
    }, {
        value: 'South Lake Union',
        label: 'South Lake Union'
    },

]
const listingTypeOptions = [
    {
        value: "",
        label: ""
    }, {
        value: "Apartment",
        label: "Apartment"
    }, {
        value: "House",
        label: "House"
    }, {
        value: "Office",
        label: "Office"
    },
]
const propertyStatusOptions = [
    {
        value: "",
        label: ""
    }, {
        value: "Sublease",
        label: "Sublease"
    }, {
        value: "Rent",
        label: "Rent"
    },
]

const rentalFrequencyOptions = [
    {
        value: "",
        label: ""
    }, {
        value: "Month",
        label: "Month"
    }, {
        value: "Week",
        label: "Week"
    }, {
        value: "Day",
        label: "Day"
    },
]

// -------------------------Function---------------------//

function AddProperty() {
    const classes = useStyles();
    const navigate = useNavigate();
	const GlobalState = useContext(StateContext)
    const initialState = {
        titleValue: "",
        listingTypeValue: "",
        descriptionValue: "",
        areaValue: "",
        boroughValue: "",
        latitudeValue: "",
        longitudeValue: "",
        propertyStatusValue: "",
        priceValue: "",
        rentalFrequencyValue: "",
        roomsValue: "",
        furnishedValue: false,
        poolValue: false,
        elevatorValue: false,
        cctvValue: false,
        parkingValue: false,
        picture1Value: "",
        picture2Value: "",
        picture3Value: "",
        picture4Value: "",
        picture5Value: "",
        mapInstance: null,
        markerPosition: {
            lat: "47.625650276247036",
            lng: "-122.33418978466639"
        },
        uploadedPictures: [],
        sendRequest: 0
    };
    function ReducerFunction(draft, action) {
        switch (action.type) {
            case 'catchTitleChange': draft.titleValue = action.titleChosen
                break
            case 'catchListingTypeChange': draft.listingTypeValue = action.listingTypeChosen
                break
            case 'catchDescriptionChange': draft.descriptionValue = action.descriptionChosen
                break
            case 'catchAreaChange': draft.areaValue = action.areaChosen
                break
            case 'catchBoroughChange': draft.boroughValue = action.boroughChosen
                break
            case 'catchLatitudeChange': draft.latitudeValue = action.latitudeChosen
                break
            case 'catchLongitudeChange': draft.longitudeValue = action.longitudeChosen
                break
            case 'catchPropertyStatusChange': draft.propertyStatusValue = action.propertyStatusChosen
                break
            case 'catchPriceChange': draft.priceValue = action.priceChosen
                break
            case 'catchRentalFrequencyChange': draft.rentalFrequencyValue = action.rentalFrequencyChosen
                break
            case 'catchRoomsChange': draft.roomsValue = action.roomsChosen
                break
            case 'catchFurnishedChange': draft.furnishedValue = action.furnishedChosen
                break
            case 'catchPoolChange': draft.poolValue = action.poolChosen
                break
            case 'catchElevatorChange': draft.elevatorValue = action.elevatorChosen
                break
            case 'catchCctvChange': draft.cctvValue = action.cctvChosen
                break
            case 'catchParkingChange': draft.parkingValue = action.parkingChosen
                break
            case 'catchPicture1Change': draft.picture1Value = action.picture1Chosen
                break
            case 'catchPicture2Change': draft.picture2Value = action.picture2Chosen
                break
            case 'catchPicture3Change': draft.picture3Value = action.picture3Chosen
                break
            case 'catchPicture4Change': draft.picture4Value = action.picture4Chosen
                break
            case 'catchPicture5Change': draft.picture5Value = action.picture5Chosen
                break
            case 'getMap': draft.mapInstance = action.mapData;
                break
            case 'changeMarkerPosition': draft.markerPosition.lat = action.changeLatitude
                draft.markerPosition.lng = action.changeLongitude
                draft.latitudeValue = ""
                draft.longitudeValue = ""
                break
            case 'catchUploadedPictures': draft.uploadedPictures = action.picturesChosen
                break
            case 'changeSendRequest': draft.sendRequest = draft.sendRequest + 1;
                break


        }

    }

    const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)
    // use effect to change the map view depending on chosen borough
    useEffect(() => {
        if (state.boroughValue === 'South Lake Union') {
            state.mapInstance.setView([
                47.62563555901023, -122.3343141906573
            ], 15)
            dispatch({type: "changeMarkerPosition", changeLatitude: 47.62563555901023, changeLongitude: -122.3343141906573})
        }
        if (state.boroughValue === 'Seattle') {
            state.mapInstance.setView([
                47.60676741586074, -122.33006451648002
            ], 10)
            dispatch({type: "changeMarkerPosition", changeLatitude: 47.60676741586074, changeLongitude: -122.33006451648002})
        }
        if (state.boroughValue === 'Bellevue') {
            state.mapInstance.setView([
                47.60877218936946, -122.19960541143969
            ], 13)
            dispatch({type: "changeMarkerPosition", changeLatitude: 47.60877218936946, changeLongitude: -122.19960541143969})

        }
        if (state.boroughValue === 'Bothell') {
            state.mapInstance.setView([
                47.75728279797788, -122.19996595488882
            ], 14)
            dispatch({type: "changeMarkerPosition", changeLatitude: 47.75728279797788, changeLongitude: -122.19996595488882})

        }
        if (state.boroughValue === 'Kirkland') {
            state.mapInstance.setView([
                47.68866285721599, -122.18679933514869
            ], 14)
            dispatch({type: "changeMarkerPosition", changeLatitude: 47.68866285721599, changeLongitude: -122.18679933514869})
        }
        if (state.boroughValue === 'Redmond') {
            state.mapInstance.setView([
                47.6773660077177, -122.12026704269996
            ], 13)
            dispatch({type: "changeMarkerPosition", changeLatitude: 47.6773660077177, changeLongitude: -122.12026704269996})
        }

    })
    // --------------------------boroughdisplay function-----------------//
    function BoroughDisplay() {
        if (state.boroughValue === 'South Lake Union') {
            return <Polygon positions = {SLU} />
        }
        if (state.boroughValue === 'Bellevue') {
            return <Polygon positions = {Bellevue} />
        }
        if (state.boroughValue === 'Bothell') {
            return <Polygon positions = {Bothell} />
        }
        if (state.boroughValue === 'Kirkland') {
            return <Polygon positions = {Kirkland} />
        }
        if (state.boroughValue === 'Redmond') {
            return <Polygon positions = {Redmond} />
        }
        if (state.boroughValue === 'Seattle') {
            return <Polygon positions = {Seattle} />
        }
    }
    // -------------------------Draggable marker-------------------//


    const markerRef = useRef(null)
    const eventHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current;
            dispatch({type: 'catchLatitudeChange', latitudeChosen: marker.getLatLng().lat})
            dispatch({type: 'catchLongitudeChange', longitudeChosen: marker.getLatLng().lng})

        }
    }), [],);
    // -----------------catch picture field-------------------//
    useEffect(() => {
        if (state.uploadedPictures[0]) {
            dispatch({type: "catchPicture1Change", picture1Chosen: state.uploadedPictures[0]});
        }

    }, [state.uploadedPictures[0]])

    useEffect(() => {
        if (state.uploadedPictures[1]) {
            dispatch({type: "catchPicture2Change", picture2Chosen: state.uploadedPictures[1]});
        }

    }, [state.uploadedPictures[1]])

    useEffect(() => {
        if (state.uploadedPictures[2]) {
            dispatch({type: "catchPicture3Change", picture3Chosen: state.uploadedPictures[2]});
        }

    }, [state.uploadedPictures[2]])

    useEffect(() => {
        if (state.uploadedPictures[3]) {
            dispatch({type: "catchPicture4Change", picture4Chosen: state.uploadedPictures[3]});
        }

    }, [state.uploadedPictures[3]])

    useEffect(() => {
        if (state.uploadedPictures[4]) {
            dispatch({type: "catchPicture5Change", picture5Chosen: state.uploadedPictures[4]});
        }

    }, [state.uploadedPictures[4]])

	//---------------------------Form Submit-----------------//

    function FormSubmit(e) {
        e.preventDefault();
        console.log("the form has been submitted");
        dispatch({type:'changeSendRequest'});
    }
	//------------------------send request-----------------//
	useEffect(()=>{
		if(state.sendRequest){
			async function AddProperty(){
				const formData = new FormData()
				formData.append('title',state.titleValue);
				formData.append('description',state.descriptionValue);
				formData.append('area',state.areaValue);
				formData.append('borough',state.boroughValue);
				formData.append('listing_type',state.listingTypeValue);
				formData.append('property_status',state.propertyStatusValue);
				formData.append('rental_frequency',state.rentalFrequencyValue);
				formData.append('price',state.priceValue);
				formData.append('rooms',state.roomsValue);
				formData.append('furnished',state.furnishedValue);
				formData.append('pool',state.poolValue);
				formData.append('elevator',state.elevatorValue);
				formData.append('cctv',state.cctvValue);
				formData.append('parking',state.parkingValue);
				formData.append('latitude',state.latitudeValue);
				formData.append('longitude',state.longitudeValue);
				formData.append('picture1',state.picture1Value);
				formData.append('picture2',state.picture2Value);
				formData.append('picture3',state.picture3Value);
				formData.append('picture4',state.picture4Value);
				formData.append('picture5',state.picture5Value);
				formData.append('seller',GlobalState.userId);
				try{
					const response = await Axios.post("http://localhost:8000/api/listings/create/",formData);
					console.log(response)
				}catch(e){
					console.log(e.response);
				}
			}
			AddProperty()
		}
	},[state.sendRequest]);
    function PriceDisplay() {
        if (state.rentalFrequencyValue === 'Day') {
            return 'Price Per Day*'
        }
        if (state.rentalFrequencyValue === 'Week') {
            return 'Price Per Week*'
        }
        if (state.rentalFrequencyValue === 'Month') {
            return 'Price Per Month*'
        } else {
            return "Price*"
        }
    }

    function TheMapComponent() {
        const map = useMap();
        dispatch({type: "getMap", mapData: map});
        return null
    }
    return (<div className={
        classes.formContainer
    }>
        <form onSubmit={FormSubmit}>
            <Grid item container justifyContent="center">
                <Typography variant='h4'>
                    SUBMIT A PROPERTY
                </Typography>
            </Grid>

			{/* ----------------------Title----------------- */}

            <Grid item container
                style={
                    {marginTop: "1rem"}
            }>
                <TextField id="title" label="Title*" variant="standard" fullWidth
                    value={
                        state.titleValue
                    }
                    onChange=
                    {(e)=>dispatch({type:"catchTitleChange",titleChosen:e.target.value})}/>
            </Grid>
			{/* ----------------------Listing Type----------------- */}

            <Grid item container justifyContent='space-between'>
                <Grid item
                    xs={5}
                    style={
                        {marginTop: "1rem"}
                }>
                    <TextField id="listingType" label="Listing Type*" variant="standard" fullWidth
                        value={
                            state.listingType
                        }
                        onChange=
                        {(e)=>dispatch({type:"catchListingTypeChange",listingTypeChosen:e.target.value})}
                        select
                        SelectProps={
                            {native: true}
                    }> {
                        listingTypeOptions.map((option) => (<option key={
                                option.value
                            }
                            value={
                                option.value
                        }> {
                            option.label
                        } </option>))
                    } </TextField>

                </Grid>
					{/* ----------------------property----------------- */}

                <Grid item
                    xs={5}
                    style={
                        {marginTop: "1rem"}
                }>
                    <TextField id="propertyStatue" label="Property Status*" variant="standard" fullWidth
                        value={
                            state.propertyStatusValue
                        }
                        onChange=
                        {(e)=>dispatch({type:"catchPropertyStatusChange",propertyStatusChosen:e.target.value})}
                        select
                        SelectProps={
                            {native: true}
                    }> {
                        propertyStatusOptions.map((option) => (<option key={
                                option.value
                            }
                            value={
                                option.value
                        }> {
                            option.label
                        } </option>))
                    } </TextField>
                </Grid>


            </Grid>

			{/* -------------------------Rental Frequency------------- */}

            <Grid item container justifyContent='space-between'>
                <Grid item
                    xs={5}
                    style={
                        {marginTop: "1rem"}
                }>
                    <TextField id="rentalFrequency" label="Rental Frequency*" variant="standard" fullWidth
                        value={
                            state.rentalFrequencyValue
                        }
                        onChange=
                        {(e)=>dispatch({type:"catchRentalFrequencyChange",rentalFrequencyChosen:e.target.value})}
                        select
                        SelectProps={
                            {native: true}
                    }> {
                        rentalFrequencyOptions.map((option) => (<option key={
                                option.value
                            }
                            value={
                                option.value
                        }> {
                            option.label
                        } </option>))
                    } </TextField>
                </Grid>

                {/* --------------------Price field---------------- */}

                <Grid item
                    xs={5}
                    style={
                        {marginTop: "1rem"}
                }>
                    <TextField id="price" type="number"
                        label={
                            PriceDisplay()
                        }
                        variant="standard"
                        fullWidth
                        value={
                            state.priceValue
                        }
                        onChange=
                        {(e)=>dispatch({type:"catchPriceChange",priceChosen:e.target.value})}/>
                </Grid>


            </Grid>


            <Grid item container
                style={
                    {marginTop: "1rem"}
            }>
                <TextField id="description" label="Description" variant="outlined" fullWidth multiline
                    rows={6}
                    value={
                        state.descriptionValue
                    }
                    onChange=
                    {(e)=>dispatch({type:"catchDescriptionChange",descriptionChosen:e.target.value})}/>
            </Grid>

            {/* -------------------Room field------------------------ */}

            {
            state.listingTypeValue === 'Office' ? '' : <Grid item type="number"
                xs={3}
                container
                style={
                    {marginTop: "1rem"}
            }>
                <TextField id="rooms" label="Rooms" variant="standard" fullWidth
                    value={
                        state.roomsValue
                    }
                    onChange=
                    {(e)=>dispatch({type:"catchRoomsChange",roomsChosen:e.target.value})}/>
            </Grid>
        }

            {/* checked field */}
            <Grid item container justifyContent="space-between">
                <Grid item
                    style={
                        {marginTop: "1rem"}
                }>
                    <FormControlLabel control={<Checkbox
                            checked={
state.furnishedValue}
                        onChange=
                        {(e)=>dispatch({type:"catchFurnishedChange",furnishedChosen:e.target.checked})}/>}
                        label="Furnished"/>
                </Grid>

                <Grid item
                    style={
                        {marginTop: "1rem"}
                }>
                    <FormControlLabel control={<Checkbox
                            checked={
state.poolValue}
                        onChange=
                        {(e)=>dispatch({type:"catchPoolChange",poolChosen:e.target.checked})}/>}
                        label="Pool"/>
                </Grid>

                <Grid item
                    style={
                        {marginTop: "1rem"}
                }>
                    <FormControlLabel control={<Checkbox
                            checked={
state.elevatorValue}
                        onChange=
                        {(e)=>dispatch({type:"catchElevatorChange",elevatorChosen:e.target.checked})}/>}
                        label="Elevator"/>
                </Grid>

                <Grid item
                    style={
                        {marginTop: "1rem"}
                }>
                    <FormControlLabel control={<Checkbox
                            checked={
state.cctvValue}
                        onChange=
                        {(e)=>dispatch({type:"catchCctvChange",cctvChosen:e.target.checked})}/>}
                        label="Cctv"/>
                </Grid>

                <Grid item
                    style={
                        {marginTop: "1rem"}
                }>
                    <FormControlLabel control={<Checkbox
                            checked={
state.parkingValue}
                        onChange=
                        {(e)=>dispatch({type:"catchParkingChange",parkingChosen:e.target.checked})}/>}
                        label="Parking"/>
                </Grid>


            </Grid>


            {/* Area field */}
            <Grid item container justifyContent="space-between">
                <Grid item
                    xs={5}
                    style={
                        {marginTop: "1rem"}
                }>
                    <TextField id="area" label="Area*" variant="standard" fullWidth
                        value={
                            state.areaValue
                        }
                        onChange=
                        {(e)=>dispatch({type:"catchAreaChange",areaChosen:e.target.value})}
                        select
                        SelectProps={
                            {native: true}
                    }> {
                        areaOptions.map((option) => (<option key={
                                option.value
                            }
                            value={
                                option.value
                        }> {
                            option.label
                        } </option>))
                    } </TextField>
                </Grid>

                {/* Borough field */}

                <Grid item
                    xs={5}
                    style={
                        {marginTop: "1rem"}
                }>
                    <TextField id="borough" label="Borough*" variant="standard" fullWidth
                        value={
                            state.boroughValue
                        }
                        onChange=
                        {(e)=>dispatch({type:"catchBoroughChange",boroughChosen:e.target.value})}
                        select
                        SelectProps={
                            {native: true}
                    }> {
                        state.areaValue === 'Inner SLU' ? innerSLUOptions.map((option) => (<option key={
                                option.value
                            }
                            value={
                                option.value
                        }> {
                            option.label
                        } </option>)) : ""
                    }
                        {
                        state.areaValue === 'Outer SLU' ? outerSLUOptions.map((option) => (<option key={
                                option.value
                            }
                            value={
                                option.value
                        }> {
                            option.label
                        } </option>)) : ""
                    } </TextField>

                </Grid>
            </Grid>


            {/* Map */}

            <Grid item container
                style={
                    {
                        height: '35rem',
                        marginTop: '1rem'
                    }
            }>
                <MapContainer center={
                        [47.625650276247036, -122.33418978466639]
                    }
                    zoom={15}
                    scrollWheelZoom={true}>

                    <TileLayer attribution='&copy;
                                                                                                                                                                    <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <TheMapComponent/> {
                    BoroughDisplay()
                }
                    <Marker draggable
                        eventHandlers={eventHandlers}
                        position={
                            state.markerPosition
                        }
                        ref={markerRef}></Marker>


                </MapContainer>
            </Grid>

           
            
            {/*------------- upload picture button----------- */}
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
                    UPLOAD PICTURES(MAX 5)
                    <input type="file" multiple accept="image/png,image/gif,image/jpeg" hidden
                        onChange={
                            (e) => dispatch({type: 'catchUploadedPictures', picturesChosen: e.target.files})
                        }/>
                </Button>
            </Grid>
			{/*------------- show pictures name------------- */}
			<Grid item container>
                <ul> {
                    state.picture1Value ? <li> {
                        state.picture1Value.name
                    }</li> : ""
                }
                    {
                    state.picture2Value ? <li> {
                        state.picture2Value.name
                    }</li> : ""
                }
                    {
                    state.picture3Value ? <li> {
                        state.picture3Value.name
                    }</li> : ""
                }
                    {
                    state.picture4Value ? <li> {
                        state.picture4Value.name
                    }</li> : ""
                }
                    {
                    state.picture5Value ? <li> {
                        state.picture5Value.name
                    }</li> : ""
                } </ul>


            </Grid>


			{/* -----------------Submit Button------------ */}

			<Grid item container
                xs={8}
                style={
                    {
                        marginTop: "1rem",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }
            }>
                <Button variant="contained" fullWidth type="submit"
                    className={
                        classes.registerBtn
                }>
                    SUBMIT</Button>
            </Grid>
        </form>



    </div>);
}

export default AddProperty
