import { combineReducers } from "redux";

/* Reducers */
import coupons from './coupons.reducer';

const RootReducer = combineReducers({
    coupons
});

export default RootReducer;