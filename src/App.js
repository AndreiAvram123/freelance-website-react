
import './App.css';
import React, {Component} from "react";
import SignIn from "./components/SignIn";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Product from "./components/Product";
import Home from "./Home";
import Admin from "./pages/Admin";

const fetch = require("node-fetch");



class App extends React.Component {

    render() {
        if(localStorage.getItem("token") === null){
            return <SignIn/>
        }
        return (
            <div>
                <Router>
                    <Navigation/>
                    <Switch>
                    <Route path = "/" exact component={()=> <Home />} />
                    <Route path = "/admin" exact component={() => <Admin />} />
                    </Switch>
                </Router>
            </div>
        );
    }
}
export default App