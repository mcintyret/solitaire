import * as React from "react";
import * as ReactDOM from "react-dom";
import "es6-shim";
import { createBrowserHistory } from "history";
import { assign } from "lodash";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router";
import { routerMiddleware, routerReducer, } from "react-router-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { reducers } from "./reducers/reducers";
import { WrappedSolitaireContainer } from "./containers/Solitaire";

const history = createBrowserHistory();
const reduxRouterMiddleware = routerMiddleware(history);

const reducer = combineReducers(assign({}, reducers, {
    routing: routerReducer,
}));

const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

const appElement = document.getElementById("app");

if (appElement != null) {
    ReactDOM.render((
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={WrappedSolitaireContainer}/>
                </Switch>
            </Router>
        </Provider>
    ), appElement);
}
