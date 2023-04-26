import {getCards} from '../api/services/cards';
import {getCardTypes} from '../api/services/card-types';
import {setCardsState} from '../store/actions/cards';
import {Toast} from '@capacitor/toast';
import {AppDispatch} from '../store';

export const syncCards = async (dispatch: AppDispatch, token: string | undefined, callback?: () => void) => {
    if (!token) {
        setCardsState({cards: [], cardTypes: []});
        return;
    }

    try {
        const [cards, cardTypes] = await Promise.all([getCards(token), getCardTypes(token)]);

        dispatch(setCardsState({cards, cardTypes}));
    } catch (exception: unknown) {
        if (!(exception instanceof Error)) {
            return;
        }

        if (exception.name === 'NetworkError') {
            await Toast.show({text: exception.message, position: 'top'});
            console.log(exception.message);
        }
    } finally {
        if (callback) {
            callback();
        }
    }
}
