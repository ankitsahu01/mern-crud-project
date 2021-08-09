import "./App.css";
import React, { createContext, useReducer, useEffect } from 'react';
import { Route,Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Contact from './components/Contact';
import Profile from './components/Profile';
import Logout from './components/Logout';
import NotFound from './components/NotFound';
import {Reducer, InitialState} from "./reducer/Reducer";

// Create Context for User Login Authentication
export const IsLoginContext = createContext();

const Routing =()=>{
  return(
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/about-us" component={About}/>
      <Route path="/contact-us" component={Contact}/>
      <Route path="/logout" component={Logout}/>
      <Route path="" component={NotFound}/>
    </Switch>
  );
}

const App = () => {
  const [state, dispatch] = useReducer(Reducer, InitialState);
  useEffect(() => {
    const getState = async ()=>{
      const res = await fetch('/getdata',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
      });
      if( res.status===200 ){
          dispatch({type:"USER",payload:true});
      }
    }
    getState();
  }, [])
  return (
    <>
    <IsLoginContext.Provider value={{state, dispatch}}>
      <Navbar/>  
      <Routing/>
    </IsLoginContext.Provider>
    </>
  );
}

export default App;
