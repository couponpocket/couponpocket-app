import axios from "axios";

import config from "../config";
import types from "./types";

const {apiEndpoint} = config;

export const getCouponCategories = async () => {
    try {
        return await axios.get(apiEndpoint + types.COUPON_CATEGORIES);
    } catch (e) {
        throw {
            name: 'NetworkError',
            message: 'Ein Netzwerkfehler ist aufgetreten! Bitte prüfe deine Internetverbindung.'
        }
    }
}