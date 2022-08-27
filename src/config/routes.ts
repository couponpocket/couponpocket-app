import CouponCategoryPage from '../App/pages/CouponCategoryPage';
import {albumsOutline, albumsSharp, barcodeOutline, barcodeSharp, cog, cogSharp} from 'ionicons/icons';
import CouponPage from '../App/pages/CouponPage';
import CardsPage from '../App/pages/CardsPage';
import SettingsPage from '../App/pages/Settings/SettingsPage';
import {FC} from 'react';
import LoginPage from '../App/pages/Settings/Authentication/LoginPage';
import RegisterPage from '../App/pages/Settings/Authentication/RegisterPage';
import PasswordForgotPage from '../App/pages/Settings/Authentication/PasswordForgotPage';

export interface Route {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: FC<any>;
    key: string;
    path: string;
    exact?: boolean;
    defaultPath?: string;
    meta?: {
        name?: string;
        tab?: {
            label: string;
        };
        icons?: {
            iconIos: string;
            iconMd: string;
        };
    };
}

export interface RoutesProps {
    [s: string]: Route;
}

const routes: RoutesProps = {
    categoryList: {
        component: CouponCategoryPage,
        key: 'CATEGORIES',
        path: '/categories',
        exact: true,
        meta: {
            name: 'Coupons',
            tab: {
                label: 'Coupons'
            },
            icons: {
                iconIos: barcodeOutline,
                iconMd: barcodeSharp
            }
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
            name: 'Karten',
            tab: {
                label: 'Karten'
            },
            icons: {
                iconIos: albumsOutline,
                iconMd: albumsSharp
            }
        }
    },
    settings: {
        component: SettingsPage,
        key: 'SETTINGS',
        path: '/settings',
        exact: true,
        meta: {
            name: 'Einstellungen',
            tab: {
                label: 'Einstellungen'
            },
            icons: {
                iconIos: cog,
                iconMd: cogSharp
            }
        }
    },
    login: {
        component: LoginPage,
        key: 'LOGIN',
        path: '/settings/login',
        meta: {
            name: 'Anmelden'
        }
    },
    register: {
        component: RegisterPage,
        key: 'REGISTER',
        path: '/settings/register',
        meta: {
            name: 'Los geht\'s'
        }
    },
    passwordForgot: {
        component: PasswordForgotPage,
        key: 'PASSWORD_FORGOT',
        path: '/settings/password-forgot',
        meta: {
            name: 'Passwort vergessen'
        }
    }
};

export default routes;