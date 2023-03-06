import React, {useMemo} from 'react';

import {IonGrid, IonRow} from '@ionic/react';
import CouponCategory from '../CouponCategory';
import {useAppSelector} from '../../../../store';

const CouponCategoryList = () => {
    const {categories, coupons} = useAppSelector(state => state.coupons);

    const filteredCategories = useMemo(() => {
        const uniqueCategoriesByCoupons = [...new Set(coupons.map(i => i.coupon_category_id))];
        return categories.filter(i => uniqueCategoriesByCoupons.includes(i.id));
    }, [categories, coupons]);

    return (
        <IonGrid>
            <IonRow className="coupon-category-list">
                {filteredCategories.map((item, index) => (
                    <CouponCategory key={index} item={item}/>
                ))}
            </IonRow>
        </IonGrid>
    );
};

export default CouponCategoryList;