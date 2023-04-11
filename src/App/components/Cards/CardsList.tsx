import React, {FC} from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonList,
    IonText
} from '@ionic/react';
import {CardsState} from '../../../store/reducers/cards';
import CardItem from './CardItem';
import {NavigatorModalProps} from '../Navigator/NavigatorModal';
import {
    addOutline,
    addSharp,
    albumsOutline,
    albumsSharp,
    barcodeOutline,
    barcodeSharp, heartOutline, heartSharp,
    reorderTwoOutline, reorderTwoSharp
} from 'ionicons/icons';

import './CardList.css';

interface CardsListProps {
    cards: CardsState['cards'];
    cardTypes: CardsState['cardTypes'];
    setShowModal: NavigatorModalProps['setShowModal'];
}

const CardsList: FC<CardsListProps> = ({cards, cardTypes, setShowModal}) => {
    return (
        <IonList>
            {cards.length ? cards.map(i => (
                <CardItem key={i.id} item={i} cardTypes={cardTypes}/>
            )) : (
                <IonCard>
                    <div className="card-list-empty">
                        <IonIcon className="card-list-empty-icon large" ios={barcodeOutline} md={barcodeSharp}/>
                        <IonIcon className="card-list-empty-icon" ios={addOutline} md={addSharp}/>
                        <IonIcon className="card-list-empty-icon large" ios={albumsOutline} md={albumsSharp}/>
                        <IonIcon className="card-list-empty-icon" ios={reorderTwoOutline} md={reorderTwoSharp}/>
                        <IonIcon className="card-list-empty-icon large" ios={heartOutline} md={heartSharp}/>
                    </div>
                    <IonCardHeader>
                        <IonCardTitle>Keine Karten verfügbar</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonText>
                            Füge jetzt dein Kundenkarten hinzu um noch mehr von Coupon Pocket zu profitieren. Mit
                            Karten, kannst du in einer App deine Karten und Coupons verwalten. Beim Checkout werden dir
                            dann deine Karten zum Scannen mit angeboten.
                        </IonText>
                    </IonCardContent>
                    <IonButton fill="clear" onClick={() => setShowModal(true)}>Jetzt Starten</IonButton>
                </IonCard>
            )}
        </IonList>
    )
}

export default CardsList;