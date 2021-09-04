import CouponCategoryPage from "../App/pages/CouponCategoryPage";
import {albumsOutline, albumsSharp, barcodeOutline, barcodeSharp, cog, cogSharp} from "ionicons/icons";
import CouponPage from "../App/pages/CouponPage";
import CardsPage from "../App/pages/CardsPage";
import SettingsPage from "../App/pages/SettingsPage";

export default {
    categoryList: {
        component: CouponCategoryPage,
        key: 'CATEGORIES',
        path: '/categories',
        exact: true,
        meta: {
            iconIos: barcodeOutline,
            iconMd: barcodeSharp,
            label: 'Coupons',
        }
    },
    couponList: {
        component: CouponPage,
        key: 'COUPONS',
        path: '/categories/:id',
        exact: true
    },
    cards: {
        component: CardsPage,
        key: 'CARDS',
        path: '/cards',
        meta: {
            iconIos: albumsOutline,
            iconMd: albumsSharp,
            label: 'Karten'
        }
    },
    settings: {
        component: SettingsPage,
        key: 'SETTINGS',
        path: '/settings',
        meta: {
            iconIos: cog,
            iconMd: cogSharp,
            label: 'Einstellungen'
        }
    }
};