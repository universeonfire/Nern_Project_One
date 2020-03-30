import React,{useState,useCallback} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Users from './Users/Pages/Users'
import NewPlace from './Places/Pages/NewPlace'
import MainNavigation from './Shared/Components/Navigation/MainNavigation'
import UserPlaces from './Places/Pages/UserPlaces'
import UpdatePlace from './Places/Pages/UpdatePlace'
import Auth from './Users/Pages/Auth'
import {AuthContext} from './Shared/Context/Auth-Context'
//import Signup from './Users/Pages/Signup'

const App = () =>{
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid)=>{
    setIsLoggedIn(true)
    setUserId(uid)
  },[])

  const logout = useCallback(()=>{
    setIsLoggedIn(false)
    setUserId(null)
  },[])

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
        {/*
            i' ve done seperate signup page but i want to try something else
              so remember remember the 5th of november 
            <Route path='/signup' exact> <Signup/> </Route>
            */}
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn,userId: userId, login:login, logout:logout}}>
      <Router> 
        <MainNavigation/>
        <main>
          {routes} 
        </main>
      </Router>
    </AuthContext.Provider>  
  )
}

export default App;
