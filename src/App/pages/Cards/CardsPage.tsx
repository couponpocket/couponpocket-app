import React, {FC, useState} from 'react';
import NavigatorPage from '../../components/Navigator/NavigatorPage';
import {NavigatorProps} from '../../components/Navigator/types';
import Empty from '../../components/Cards/Empty';
import {IonButton, IonIcon} from '@ionic/react';
import {addOutline, addSharp} from 'ionicons/icons';
import CardsAddModal from './CardsAdd/CardsAddModal';

type CardsPageProps = NavigatorProps

const Cards: FC<CardsPageProps> = ({title, router}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <NavigatorPage title={title}
                       buttons={{
                           end: (
                               <IonButton onClick={() => setShowModal(true)}
                                          className="add-icon"
                                          fill="clear">
                                   <IonIcon slot="icon-only" ios={addOutline} md={addSharp}/>
                               </IonButton>
                           )
                       }}>
            <Empty/>
            <CardsAddModal router={router} showModal={showModal} setShowModal={setShowModal}/>
        </NavigatorPage>
    );
};

export default Cards;
