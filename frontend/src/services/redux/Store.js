import reducers from './Reducers';
import initialState from './State';

import { applyMiddleware, createStore, compose,combineReducers } from "redux";
import { offline } from "redux-offline";
import offlineConfig from "redux-offline/lib/defaults";

import thunk from "redux-thunk";
import logger from "redux-logger";
import * as localforage from "localforage";

offlineConfig.persistOptions = { storage: localforage }; // store offline data in indexedDB
const store = createStore(
  combineReducers({state:reducers}),
   compose(applyMiddleware(thunk, logger), offline(offlineConfig))
);
export default store;


