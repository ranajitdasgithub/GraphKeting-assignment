import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk"; // Change this line to use named import

import { reducer as authReducer } from "./AuthReducer/reducer";
// Import other reducers as needed
// import { reducer as otherReducer } from "./OtherReducer/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  // other: otherReducer, // Add other reducers here
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export { store };