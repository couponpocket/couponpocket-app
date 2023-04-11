import {createReducer} from '@reduxjs/toolkit';
import {addCard, removeCard, setCardsState} from '../actions/cards';
import {CardProperties} from '../../api/services/cards';
import {CardTypeProperties} from '../../api/services/card-types';

export interface CardsState {
    cards: CardProperties[];
    cardTypes: CardTypeProperties[];
}

export const initialCouponState: CardsState = {
    cards: [],
    cardTypes: []
}

export default createReducer(initialCouponState, builder => {
    builder.addCase(setCardsState, (state, action) => {
        state.cards = action.payload.cards;
        state.cardTypes = action.payload.cardTypes;
    })

    builder.addCase(addCard, (state, action) => {
        state.cards = [
            ...state.cards,
            action.payload
        ];
    })

    builder.addCase(removeCard, (state, action) => {
        state.cards = state.cards.filter(el => el.id !== action.payload.id);
    })
})