import React, {useMemo} from 'react';

import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonGrid,
    IonIcon,
    IonRow,
    IonText
} from '@ionic/react';
import CouponCategoryItem from './CouponCategoryItem';
import {useAppSelector} from '../../../store';
import {
    addCircleOutline,
    addCircleSharp,
    barcodeOutline,
    barcodeSharp,
} from "ionicons/icons";

import './couponCategoryList.css';

const CouponCategoryList = () => {
    const {categories, coupons} = useAppSelector(state => state.coupons);

    const filteredCategories = useMemo(() => {
        const uniqueCategoriesByCoupons = [...new Set(coupons.map(i => i.coupon_category_id))];
        return categories.filter(i => uniqueCategoriesByCoupons.includes(i.id));
    }, [categories, coupons]);

    return filteredCategories.length ? (
        <IonGrid>
            <IonRow className="coupon-category-list">
                {filteredCategories.map((item, index) => (
                    <CouponCategoryItem key={index} item={item}/>
                ))}
            </IonRow>
        </IonGrid>
    ) : (
        <IonCard>
            <div className="coupon-category-list-empty">
                <IonIcon className="coupon-category-list-empty-icon" ios={barcodeOutline} md={barcodeSharp}/>
                <IonIcon className="coupon-category-list-empty-icon" ios={addCircleOutline} md={addCircleSharp}/>
            </div>
            <IonCardHeader>
                <IonCardTitle>Keine Coupons verfügbar</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonText>
                    Füge jetzt die Coupons aus deiner Punktepost hinzu um um diese mit der Community zu teilen und so
                    gemeinsam noch mehr von Payback zu profitieren.
                </IonText>
            </IonCardContent>
            <IonButton fill="clear" disabled>Jetzt hinzufügen</IonButton>
        </IonCard>
    );
};

export default CouponCategoryList;