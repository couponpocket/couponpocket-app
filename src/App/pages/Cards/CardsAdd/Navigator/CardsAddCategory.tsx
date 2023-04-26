import React, {FC, useMemo} from 'react';
import NavigatorContent from '../../../../components/Navigator/NavigatorContent';
import {useAppSelector} from '../../../../../store';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonItem,
    IonList,
    IonNavLink
} from '@ionic/react';
import {closeCircleOutline, closeCircleSharp, closeOutline, closeSharp} from 'ionicons/icons';
import {NavigatorModalProps} from '../../../../components/Navigator/NavigatorModal';
import CardsAddForm from './CardsAddForm';

import './CardAddCategory.css';
import {AppLauncher} from '@capacitor/app-launcher';

type CardsAddCategory = Pick<NavigatorModalProps, 'setShowModal'>;

const CardsAddCategory: FC<CardsAddCategory> = ({setShowModal}) => {
    const {cards, cardTypes} = useAppSelector(state => state.cards);

    const filteredCardTypes = useMemo(() => cardTypes.filter(ct => !cards.find(c => c.card_type_id === ct.id)), [cardTypes, cards])

    return (
        <NavigatorContent title="Karte hinzufügen" collapse={false} buttons={{
            primary: (
                <IonButton onClick={() => setShowModal(false)}>
                    <IonIcon ios={closeOutline} md={closeSharp}/>
                </IonButton>
            )
        }}>
            <IonList>
                {filteredCardTypes.length ? filteredCardTypes.map(i => (
                    <IonNavLink key={i.id} component={() => <CardsAddForm cardType={i} setShowModal={setShowModal}/>}>
                        <IonItem detail={true} button={true}>
                            {i.name}
                        </IonItem>
                    </IonNavLink>
                )) : (
                    <IonCard>
                        <div className="card-add-category-empty">
                            <IonIcon className="card-add-category-empty-icon" ios={closeCircleOutline}
                                     md={closeCircleSharp}/>
                        </div>
                        <IonCardHeader>
                            <IonCardTitle>Kein Kartentyp verfügbar</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            Du hast bereits alle verfügbaren Kartentypen in deinem Profil hinzugefügt.
                        </IonCardContent>
                        <IonButton fill="clear"
                                   onClick={async () => await AppLauncher.openUrl({url: 'mailto:support@couponpocket.de'})}>
                            Neuen Kartentyp vorschlagen
                        </IonButton>
                    </IonCard>
                )}
            </IonList>
        </NavigatorContent>
    )
}

export default CardsAddCategory;