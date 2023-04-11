import React, {FC} from 'react';
import {NavigatorModalProps} from '../../../components/Navigator/NavigatorModal';
import {IonModal, IonNav} from '@ionic/react';
import CardsAddCategory from './Navigator/CardsAddCategory';

interface CardsAddModal extends Pick<NavigatorModalProps, 'showModal' | 'setShowModal'> {
    router: NavigatorModalProps['router'];
}


const CardsAddModal: FC<CardsAddModal> = ({router, showModal, setShowModal}) => {
    return (
        <IonModal isOpen={showModal}
                  canDismiss={true}
                  presentingElement={router}
                  onDidDismiss={() => setShowModal(false)}
                  className="cards-add-modal">
            <IonNav root={() => <CardsAddCategory setShowModal={setShowModal}/>}></IonNav>
        </IonModal>

    )
}

export default CardsAddModal;