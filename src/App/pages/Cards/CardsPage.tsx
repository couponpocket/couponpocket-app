import React, {FC, useEffect, useState} from 'react';
import NavigatorPage from '../../components/Navigator/NavigatorPage';
import {NavigatorProps} from '../../components/Navigator/types';
import {IonButton, IonIcon, IonRefresher, IonRefresherContent} from '@ionic/react';
import {addOutline, addSharp} from 'ionicons/icons';
import CardsAddModal from './CardsAdd/CardsAddModal';
import {useAppDispatch, useAppSelector} from '../../../store';
import CardsList from '../../components/Cards/CardsList';
import {syncCards} from '../../../helpers/cards';

type CardsPageProps = NavigatorProps

const Cards: FC<CardsPageProps> = ({title, router}) => {
    const dispatch = useAppDispatch();

    const token = useAppSelector(state => state.authentication.token);
    const {cards, cardTypes} = useAppSelector(state => state.cards)

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        (async () => await syncCards(token, dispatch))()
    }, [dispatch, token]);

    return (
        <NavigatorPage title={title}
                       buttons={{
                           primary: (
                               <IonButton onClick={() => setShowModal(true)}
                                          className="add-icon"
                                          fill="clear">
                                   <IonIcon slot="icon-only" ios={addOutline} md={addSharp}/>
                               </IonButton>
                           )
                       }}>
            <IonRefresher slot="fixed" onIonRefresh={(e) => syncCards(token, dispatch, () => e.detail.complete())}>
                <IonRefresherContent/>
            </IonRefresher>

            <CardsList cards={cards} cardTypes={cardTypes} setShowModal={setShowModal}/>

            <CardsAddModal router={router} showModal={showModal} setShowModal={setShowModal}/>
        </NavigatorPage>
    );
};

export default Cards;
