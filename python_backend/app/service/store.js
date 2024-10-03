import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducer";
import { affiliateReducer , affiliateLinkReducer , getAffiliateProductsReducer } from "./reducers/affiliateReducer";

const reducer=combineReducers({
  user: userReducer,
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