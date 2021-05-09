import { WATCHLIST_ADD, WATCHLIST_REMOVE, WATCHLIST_SET, WATCHLIST_STORAGE_KEY } from "../action-types";
import { Storage } from '@capacitor/storage';

export const loadWatchlist = async (store) => {
    const {value} = await Storage.get({key: WATCHLIST_STORAGE_KEY});

    store.dispatch(dispatchSizeGuide(WATCHLIST_SET, value ? JSON.parse(value) : [], false));
}

export const addCouponToWatchlist = (item) => async (dispatch) => dispatch(dispatchSizeGuide(WATCHLIST_ADD, item));

export const removeCouponFromWatchlist = (item) => async (dispatch) => dispatch(dispatchSizeGuide(WATCHLIST_REMOVE, item));

const dispatchSizeGuide = (type, payload, persist = true) => ({
    type,
    payload,
    persist
})