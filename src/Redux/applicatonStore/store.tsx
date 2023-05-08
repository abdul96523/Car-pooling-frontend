import { configureStore } from "@reduxjs/toolkit";
import userDetilsReducer from "../Slices/UserDetailsSlice"
import locationReducer from "../Slices/locationSlice";

import  storage  from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

const persistConfig={
    key:"root",
    version:1,
    storage
}

const reducer=combineReducers({
    userDetails:userDetilsReducer,
    locationsList:locationReducer,
})
const persistedReducer=persistReducer(persistConfig,reducer)

export default configureStore({
    reducer:persistedReducer
})
