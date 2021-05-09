import { WATCHLIST_ADD, WATCHLIST_REMOVE, WATCHLIST_SET, WATCHLIST_STORAGE_KEY } from "../action-types";
import { Storage } from "@capacitor/storage";

const initialState = [];

const coupons = (state = initialState, action) => {
    switch (action.type) {
        case WATCHLIST_SET:
            state = action.payload;
            break;
        case WATCHLIST_ADD:
            state = [
                ...state,
                action.payload
            ];
            break;
        case WATCHLIST_REMOVE:
            state = state.filter((item) => item.ean !== action.payload.ean);
            break;
        default:
    }

    if (action?.persist) {
        Storage.set({key: WATCHLIST_STORAGE_KEY, value: JSON.stringify(state)});
    }

    return state;
}

export default coupons;