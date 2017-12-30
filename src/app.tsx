import * as React from "react";
import * as ReactDOM from "react-dom";
import "babel-polyfill";
import "es6-shim";
import "whatwg-fetch";
import createHistory from 'history/createBrowserHistory'
import { assign } from "lodash";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter, routerMiddleware, routerReducer, } from "react-router-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers/reducers";
import { WrappedSolitaireContainer } from "./containers/Solitaire";

const history = createHistory();
const reduxRouterMiddleware = routerMiddleware(history);

const reducer = combineReducers(assign({}, reducers, {
    routing: routerReducer,
}));

// logger must be last middleware in chain
const createStoreWithMiddleware = applyMiddleware(thunk, reduxRouterMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

const appElement = document.getElementById("app");

if (appElement != null) {
    ReactDOM.render((
      <Provider store={store}>
          <ConnectedRouter history={history}>
              <Switch>
                  <Route exact path="/" component={WrappedSolitaireContainer}/>
              </Switch>
          </ConnectedRouter>
      </Provider>
    ), appElement);
}
