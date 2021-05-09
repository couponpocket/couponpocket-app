import { combineReducers } from "redux";

/* Reducers */
import coupons from "./coupons.reducer";
import watchlist from "./watchlist.reducer";

const RootReducer = combineReducers({
    coupons,
    watchlist
});

export default RootReducer;