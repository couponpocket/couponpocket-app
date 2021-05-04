import { COUPONS_SET } from "../action-types";

const initialState = {
    cacheInvalid: 0,
    data: undefined
};

const coupons = (state = initialState, action) => {
    const cacheInvalid = new Date();
    cacheInvalid.setDate(cacheInvalid.getDate() + 1);

    switch (action.type) {
        case COUPONS_SET:
            state = {
                cacheInvalid: cacheInvalid.getTime(),
                data: action.payload
            };
            break;
        default:
    }

    return state;
}

export default coupons;