import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {persistCombineReducers, persistStore} from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import CapacitorStorage from 'redux-persist-capacitor-storage';

import couponReducer, {CouponsState} from './reducers/coupons';

export interface AppState {
    coupons: CouponsState
}

const persistConfig = {
    key: 'root',
    storage: CapacitorStorage,
    stateReconciler: autoMergeLevel1
};

export const store = configureStore({
    reducer: persistCombineReducers<AppState>(persistConfig, {
        coupons: couponReducer
    })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

//Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const persistor = persistStore(store);