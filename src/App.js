import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Users from './Users/Pages/Users'
import NewPlace from './Places/Pages/NewPlace'
import MainNavigation from './Shared/Components/Navigation/MainNavigation'
import UserPlaces from './Places/Pages/UserPlaces'

const App = () =>{
  return (

    <Router> 
      <MainNavigation/>
      <main>
        <Switch>
          <Route path = "/" exact> <Users/> </Route>
          <Route path = "/places/new" exact>  <NewPlace/> </Route>
          <Route path = "/:userId/places" exact>  <UserPlaces/> </Route>
          <Redirect to = "/" />
        </Switch>
      </main>
    </Router>
  )
}

export default App;
