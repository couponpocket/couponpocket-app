import React, {FC, useEffect, useState} from 'react';
import NavigatorContent from '../../../../components/Navigator/NavigatorContent';
import {CardTypeProperty, getCardTypes} from '../../../../../api/services/card-types';
import {useAppSelector} from '../../../../../store';
import {IonItem, IonList} from '@ionic/react';

const CardsAddCategory: FC = () => {
    const token = useAppSelector(state => state.authentication.token);

    const [cardTypes, setCardTypes] = useState<CardTypeProperty[]>([]);

    useEffect(() => {
        (async () => {
            if (!token) {
                return () => setCardTypes([]);
            }
            setCardTypes(await getCardTypes(token));
        })()
        return () => setCardTypes([]);
    }, [token]);

    return (
        <NavigatorContent title="Karte hinzufügen" collapse={false}>
            <IonList>
                {cardTypes.map(i => (
                    <IonItem key={i.id}>
                        {i.name}
                    </IonItem>
                ))}
            </IonList>
        </NavigatorContent>
    )
}

export default CardsAddCategory;