import { COUPONS_SET, COUPONS_STORAGE_KEY } from "../action-types";
import { Storage } from "@capacitor/storage";

const initialState = {
    cacheInvalid: 0,
    data: undefined
};

const coupons = (state = initialState, action) => {
    switch (action.type) {
        case COUPONS_SET:
            state = action.payload;
            break;
        default:
    }

    if (action?.persist) {
        Storage.set({key: COUPONS_STORAGE_KEY, value: JSON.stringify(state)}).then();
    }

    return state;
}

export default coupons;