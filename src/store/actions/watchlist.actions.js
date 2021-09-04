import { WATCHLIST_ADD, WATCHLIST_REMOVE, WATCHLIST_SET, WATCHLIST_STORAGE_KEY } from "../action-types";
import { Storage } from '@capacitor/storage';

export const loadWatchlist = async (store) => {
    const {value} = await Storage.get({key: WATCHLIST_STORAGE_KEY});

    store.dispatch(dispatchWatchlist(WATCHLIST_SET, value ? JSON.parse(value) : [], false));
}

export const addCouponToWatchlist = (item) => async (dispatch) => dispatch(dispatchWatchlist(WATCHLIST_ADD, item));

export const removeCouponFromWatchlist = (item) => async (dispatch) => dispatch(dispatchWatchlist(WATCHLIST_REMOVE, item));

const dispatchWatchlist = (type, payload, persist = true) => ({
    type,
    payload,
    persist
})