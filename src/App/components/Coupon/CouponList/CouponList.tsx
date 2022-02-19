import React, {FC, useMemo} from "react";
import {IonList, IonItemGroup, IonListHeader, IonLabel} from "@ionic/react";
import CouponItem from "../CouponItem/CouponItem";
import {useAppSelector} from "../../../../store";
import {CouponCategoryProperties} from "../../../../api/services/coupon-categories";
import {CouponProperties} from "../../../../api/services/coupons";

interface CouponListProps {
    partner: CouponCategoryProperties,
}

interface CouponGroupList {
    [x: string]: CouponProperties[]
}

const CouponList: FC<CouponListProps> = ({partner}) => {
    const coupons = useAppSelector(state => state.coupons.coupons.filter(item => item.coupon_category_id === partner.id));

    /* group coupons */
    const sortedCoupons = useMemo(() => {
        if (!coupons) {
            return;
        }

        return coupons.reduce((rv: CouponGroupList, x) => {
            rv[x.condition] = [...rv[x.condition] || [], x];
            return rv;
        }, {});
    }, [coupons])

    if (!sortedCoupons) {
        return null;
    }

    return (
        <IonList className="coupons-list">
            {Object.entries(sortedCoupons).map(([key, value], index) => (
                <IonItemGroup key={index}>
                    <IonListHeader>
                        <IonLabel>{key}</IonLabel>
                    </IonListHeader>
                    {value.map((item, index) => (
                        <CouponItem key={index} item={item}/>
                    ))}
                </IonItemGroup>
            ))}
        </IonList>
    );
};

export default CouponList;