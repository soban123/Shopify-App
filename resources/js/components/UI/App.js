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
import Alttag from './components/Alttag';
import Filename from './components/Filename';
import Imagecompression from './components/Imagecompression';
import Addwatermark from './components/Addwatermark';
export default class App extends React.Component {
    render() {
        return <BrowserRouter>
            <AppProvider>
                <Sidebar />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/alttag" component={Alttag}/>
                    <Route exact path="/filename" component={Filename}/>
                    <Route exact path="/imagecompression" component={Imagecompression}/>
                    <Route exact path='/imageoptimization' component={Steps}/>
                    <Route exact path='/addwatermark' component={Addwatermark}/>
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
