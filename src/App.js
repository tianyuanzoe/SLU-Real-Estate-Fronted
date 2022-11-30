import React,{useEffect} from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import { useImmerReducer} from 'use-immer';
//component
import Home from './Components/Home';
import Listing from './Components/Listings';
import Login from './Components/Login';
import Header from './Components/Header';
import Testing from './Components/Testing';
import Register from './Components/Register';
import AddProperty from './Components/AddProperty';
// MUI COMPONENTS
import { StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
//contexts
import DispatchContext from './Contexts/DispatchContext';
import StateContext from './Contexts/StateContext';


function App() {
  const initialState = {
    userUsername:localStorage.getItem('theUserUsername'),
    userEmail:localStorage.getItem('theUserEmail'),
    userId:localStorage.getItem('theUserId'),
    userToken:localStorage.getItem('theUserToken'),
    userIsLogged:localStorage.getItem('theUserUsername')?true:false,
		
	};
	function ReducerFunction(draft,action){
		switch(action.type){
      case "catchToken":
        draft.userToken = action.tokenValue;
        break
      case "userSignsIn":
        draft.userUsername = action.usernameInfo;
        draft.userEmail = action.emailInfo;
        draft.userId = action.IdInfo; 
        draft.userIsLogged = true;
        break; 
      case "logout":
        draft.userIsLogged = false
        break
		}

	}

	const[state,dispatch] = useImmerReducer(ReducerFunction,initialState)
  useEffect(()=>{
    if (state.userIsLogged){
      localStorage.setItem("theUserUsername",state.userUsername)
      localStorage.setItem("theUserEmail",state.userEmail)
      localStorage.setItem("theUserUseId",state.userId)
      localStorage.setItem("theUserToken",state.userToken)
    }else{
      localStorage.removeItem("theUserUsername")
      localStorage.removeItem("theUserEmail")
      localStorage.removeItem("theUserUseId")
      localStorage.removeItem("theUserToken")
    }
  },[state.userIsLogged])
  return(
    <StateContext.Provider value = {state}>
    <DispatchContext.Provider value = {dispatch}>
<StyledEngineProvider injectFirst>
 <BrowserRouter>  
 <CssBaseline />
<Header />
 <Routes>
  <Route  path = "/" element = { <Home></Home>}/>
  <Route path = '/login' element = {<Login></Login>}/>
  <Route path = '/listings' element = {<Listing></Listing>}/>
  <Route path = '/testing' element = {<Testing></Testing>}/>
  <Route path = '/register' element = {<Register></Register>}/>
  <Route path = '/addproperty' element = {<AddProperty></AddProperty>}/>
  </Routes>
  

</BrowserRouter>
</StyledEngineProvider>
</DispatchContext.Provider>
</StateContext.Provider>
  
 );
  

  
  
}

export default App;





