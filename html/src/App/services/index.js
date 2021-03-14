import axios from "axios";

import config from "../config";
import types from "./types";

const {apiEndpoint} = config;

export const getCouponCategories = async (feedId, itemsPerPage, pages) => {
    try {
        return await axios.get(apiEndpoint + types.COUPON_CATEGORIES);
    } catch (e) {
        console.log(e);
    }
}