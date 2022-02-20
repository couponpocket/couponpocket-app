import React, {FC} from 'react';
import {IonCol, IonCard, IonCardTitle} from '@ionic/react';
import './CouponCategory.css';
import {CouponCategoryProperties} from '../../../api/services/coupon-categories';

interface CouponCategoryProps {
    item: CouponCategoryProperties
}

const CouponCategory: FC<CouponCategoryProps> = ({item, ...htmlProps}) => {
    const link = (id: string) => {
        return '/categories/' + id
    }

    return (
        <IonCol size="6" sizeMd="4" sizeLg="3" sizeXl="2">
            <IonCard routerLink={link(item.id.toString())}
                     className="coupon-category-card"
                     style={{backgroundColor: item.color_background}}
                     {...htmlProps}>

                <IonCardTitle className="coupon-category-card-name" style={{color: item.color_foreground}}>
                    {item.name}
                </IonCardTitle>
            </IonCard>
        </IonCol>
    );
};

export default CouponCategory;