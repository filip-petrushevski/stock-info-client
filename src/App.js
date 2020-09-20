import Grid from '@material-ui/core/Grid';
import React from 'react';
import './App.css';
import NavBar from './components/nav-bar/nav-bar';
import News from './components/news/news';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import AllCompanies from './components/all-companies/all-companies';
import CompanyProfile from './components/company-profile/company-profile';
import MyCompanies from './components/my-companies/my-companies';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <Grid container direction='column' >
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/"><Redirect to="/news" /></Route>
        <Route exact path="/news" render={() => <News></News>}></Route>
        <Route exact path="/login" render={() => <Login></Login>}></Route>
        <Route exact path="/register" render={() => <Register></Register>}></Route>
        <Route exact path="/companies" render={() => <AllCompanies></AllCompanies>}></Route>
        <Route exact path="/companies/:symbol" render={(props) => <CompanyProfile {...props}></CompanyProfile>}></Route>
        <Route exact path="/my-companies" render={() => <MyCompanies></MyCompanies>}></Route>
      </Switch>
      <NotificationContainer />
    </Grid>);
}

export default App;
