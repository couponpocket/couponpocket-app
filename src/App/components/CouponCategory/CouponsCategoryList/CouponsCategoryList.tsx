import React from "react";

import { IonGrid, IonRow } from "@ionic/react";
import CouponCategory from "../CouponCategory";
import {useAppSelector} from "../../../../store";

const CouponsCategoryList = () => {
    const categories = useAppSelector(state => state.coupons.categories);

    return (
        <IonGrid>
            <IonRow className="coupon-category-list">
                {categories.map((item, index) => (
                    <CouponCategory key={index} item={item}/>
                ))}
            </IonRow>
        </IonGrid>
    );
};

export default CouponsCategoryList;