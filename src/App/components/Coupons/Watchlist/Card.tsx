import React, {FC} from 'react';
import {IonCard, IonCardContent, IonCardHeader, IonText} from '@ionic/react';
import {CardProperties} from '../../../../api/services/cards';
import {useAppSelector} from '../../../../store';

import Barcode from './Barcode';

import './Card.css';

interface CardProps {
    item: CardProperties;
}

const Card: FC<CardProps> = ({item}) => {
    const cardType = useAppSelector(state => state.cards.cardTypes.find(el => el.id === item.card_type_id));

    return (
        <IonCard className="card-card">
            <IonCardHeader className="card-card-header" style={{
                backgroundColor: '#cccccc',
                color: '#ffffff'
            }}>
                <IonText className="card-card-header-name">
                    {cardType?.name}
                </IonText>
            </IonCardHeader>
            <IonCardContent>
                <div className="card-card-barcode">
                    <Barcode value={item.number.toString()}
                             format={item.number.toString().length === 13 ? 'ean13' : 'code128'}/>
                </div>
            </IonCardContent>
        </IonCard>
    )
}

export default Card;