import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools ,combineReducers } from 'redux-devtools/extension';

import { affiliateReducer , affiliateLinkReducer , getAffiliateProductsReducer } from "./lib/affiliateReducer";

const reducer=combineReducers({
  affiliate: affiliateReducer,
  affiliateLink: affiliateLinkReducer,
  allProducts:getAffiliateProductsReducer,
})

let initialState={}

const middleware=[thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  
  export default store;