import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import {AppProvider,} from "@shopify/polaris";
import Home from "./components/Home";
import NewDashboard from "./components/NewDashboard";
import Popup from "./components/Popup";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Steps from "./components/Steps";
import Detail from "./components/Detail";
import Crop from "./components/Crop";
export default class App extends React.Component {
    render() {
        return <BrowserRouter>
            <AppProvider>
                <Sidebar />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path='/imageoptimization' component={Steps}/>
                    <Route exact path='/NewDashboard' component={NewDashboard}/>
                    <Route exact path='/Popup' component={Popup}/>
                    <Route exact path='/Detail' component={Detail}/>
                    <Route exact path='/Crop' component={Crop}/>
                </Switch>
            </AppProvider>
        </BrowserRouter>
    }
}
if (document.getElementById('body_content')) {
    ReactDOM.render(<App/>, document.getElementById('body_content'));
}
