import React, {FC, FormEventHandler, useCallback, useState} from 'react';
import NavigatorContent from '../../../../components/Navigator/NavigatorContent';
import {CardTypeProperties} from '../../../../../api/services/card-types';
import {IonButton, IonCol, IonGrid, IonRow} from '@ionic/react';
import Input, {ErrorState} from '../../../../components/Settings/Authentication/Input';
import useToast from '../../../../hooks/useToast';
import {ResponseError} from '../../../../../api';
import NavigatorBackButton from '../../../../components/Navigator/NavigatorBackButton';
import {NavigatorModalProps} from '../../../../components/Navigator/NavigatorModal';
import {useAppDispatch, useAppSelector} from '../../../../../store';
import {addCard} from '../../../../../api/services/cards';
import {addCard as addCardAction} from '../../../../../store/actions/cards';

interface CardsAddCategory extends Pick<NavigatorModalProps, 'setShowModal'> {
    cardType: CardTypeProperties;
}

const CardsAddCategory: FC<CardsAddCategory> = ({cardType, setShowModal}) => {
    const dispatch = useAppDispatch();

    const {user, token} = useAppSelector(state => state.authentication);

    const [errors, setErrors] = useState<ErrorState | undefined>(undefined);
    const [showToast] = useToast();

    const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (event) => {
        event.preventDefault();

        if (!(cardType && user && user.id && token)) {
            return;
        }

        const entities = Object.fromEntries(new FormData(event.currentTarget)) as {number: string};

        try {
            const card = await addCard({
                number: parseInt(entities.number),
                'user_id': user.id,
                'card_type_id': cardType.id
            }, token);

            if (!card) {
                await showToast('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
                return;
            }

            dispatch(addCardAction(card));
            setShowModal(false);
        } catch (e) {
            if (!(e instanceof ResponseError)) {
                console.log(e);
                return;
            }

            switch (e.response?.status) {
                case 422:
                    setErrors(e.response.data.errors);
                    await showToast('Es ist ein Fehler bei der Validierung aufgetreten. Bitte prüfen Sie das Formular.');
                    break;
                default:
                    await showToast('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
            }
        }
    }, [cardType, dispatch, setShowModal, showToast, token, user])

    return (
        <NavigatorContent title={cardType.name} collapse={false} buttons={<NavigatorBackButton/>}>
            <form onSubmit={onSubmit}>
                <IonGrid>
                    <IonRow>
                        <IonCol offsetMd="3" sizeMd="6">
                            Gib die Kartennummer von deiner Karte ein
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol offsetMd="3" sizeMd="6">
                            <Input label="Kartennummer"
                                   name="number"
                                   inputmode="numeric"
                                   type="number"
                                   placeholder="8388489285373"
                                   errors={errors}
                                   setErrors={setErrors}/>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol offsetMd="3" sizeMd="6">
                            <IonButton type="submit" expand="block">
                                Karte hinzufügen
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </form>
        </NavigatorContent>
    )
}

export default CardsAddCategory;