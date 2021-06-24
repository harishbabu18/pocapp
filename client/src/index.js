import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import UserManagement from './page/admin/usermanagement/UserManagement';
import Example from './page/Example'
import store from "./redux/store";
import { Provider } from "react-redux";
import createRowData from "./createRowData";
import ReactData from './page/ReactData';
function Index() {

    return (
    <BrowserRouter forceRefresh={true}>
        <Switch>
        <Provider store={store}>
            <Route exact path="/">
                <App/>
            </Route>
            <Route exact path="/example">
            <Example initialRows={createRowData(50)} />

            </Route>
            <Route exact path="/user">
                <UserManagement/>
            </Route>
            <Route exact path="/data">
                <ReactData/>
            </Route>
            </Provider>
        </Switch>
    </BrowserRouter>)

}
ReactDOM.render(<Index />, document.getElementById('root'));