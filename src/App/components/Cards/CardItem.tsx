import React, {FC, useCallback, useMemo, useRef} from 'react';
import {IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonText} from '@ionic/react';
import {trashOutline, trashSharp} from 'ionicons/icons';
import {CardProperties, removeCard as removeCardApi} from '../../../api/services/cards';
import {CardsState} from '../../../store/reducers/cards';
import {useAppDispatch, useAppSelector} from '../../../store';
import {removeCard as removeCardAction} from '../../../store/actions/cards';
import useToast from '../../hooks/useToast';
import {ResponseError} from '../../../api';

interface CardItemProps {
    item: CardProperties;
    cardTypes: CardsState['cardTypes'];
}

const CardItem: FC<CardItemProps> = ({item, cardTypes}) => {
    const slidingItem = useRef<HTMLIonItemSlidingElement>(null);
    const dispatch = useAppDispatch();

    const token = useAppSelector(state => state.authentication.token);

    const cardType = useMemo(() => cardTypes.find((el => item.card_type_id === el.id)), [cardTypes, item])
    const obfuscatedNumber = useMemo(() => item.number.toString().replace(/\w(?=\w{4})/g, '*'), [item.number])

    const [showToast] = useToast();

    const removeCard = useCallback(async () => {
        if (!(slidingItem.current && token)) {
            return;
        }

        try {
            await slidingItem.current.close();

            const card = await removeCardApi(item.id, token);

            if (!card) {
                await showToast('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
                return;
            }

            dispatch(removeCardAction(card));
        } catch (e) {
            if (!(e instanceof ResponseError)) {
                console.log(e);
                return;
            }

            await showToast('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
        }
    }, [dispatch, item.id, showToast, token]);

    return (
        <IonItemSliding ref={slidingItem} key={item.id}>
            <IonItem>
                <IonLabel>
                    <IonText color="primary" className="coupon-points">
                        {cardType?.name}
                    </IonText>
                    <IonText>
                        {obfuscatedNumber}
                    </IonText>
                </IonLabel>
            </IonItem>

            <IonItemOptions>
                <IonItemOption color="danger" expandable={true} onClick={removeCard}>
                    <IonIcon slot="top" ios={trashOutline} md={trashSharp} aria-hidden="true"
                             style={{fontSize: '1.8em'}}/>
                    <IonText>Löschen</IonText>
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    )
}

export default CardItem;