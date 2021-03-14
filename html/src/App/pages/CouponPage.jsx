import React, { useRef } from "react";

import useStorage from "../hooks/useStorage";

import AppPage from "../components/AppPage";
import { CouponList } from "../components/CardList";
import NotFoundPage from "./NotFoundPage";
import AppBackButton from "../components/AppBackButton";

const CouponPage = (props) => {
    const [coupons] = useStorage('coupons');

    if (!coupons || typeof coupons !== 'object') return null;

    const list = coupons.data.items.find((item) => item.id === parseInt(props.match.params.id));

    if (list === undefined) return <NotFoundPage/>;

    return (
        <AppPage name={list.name} className="coupons" collapse={false}
                 buttons={<AppBackButton text="Coupons"/>}>
            <CouponList coupons={list.coupons}/>
        </AppPage>
    );
};

export default CouponPage;
