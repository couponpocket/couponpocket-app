import {createAction} from '@reduxjs/toolkit'
import {CardProperties} from '../../api/services/cards';
import {CardTypeProperties} from '../../api/services/card-types';

const action = {
    SET: 'SET_STATE',
    ADD_CARD: 'ADD_CARD',
    REMOVE_CARD: 'REMOVE_CARD'
}

export interface CardsStateAction {
    cards: CardProperties[];
    cardTypes: CardTypeProperties[];
}

export type AddCardAction = CardProperties;

export const setCardsState = createAction<CardsStateAction>(action.SET);

export const addCard = createAction<AddCardAction>(action.ADD_CARD);

export const removeCard = createAction<CardProperties>(action.REMOVE_CARD);