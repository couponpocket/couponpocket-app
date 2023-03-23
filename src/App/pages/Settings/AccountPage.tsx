import React from 'react';

import type {FC} from 'react';
import type {NavigatorProps} from '../../components/Navigator/types';

import NavigatorPage from '../../components/Navigator/NavigatorPage';
import NavigatorBackButton from '../../components/Navigator/NavigatorBackButton';
import {useAppDispatch, useAppSelector} from '../../../store';
import {logout, UserProperties} from '../../../api/services/authentication';
import {IonButton} from '@ionic/react';
import {logout as logoutAction} from '../../../store/actions/authentication';
import useToast from '../../hooks/useToast';

type AccountPageProps = NavigatorProps;

const AccountPage: FC<AccountPageProps> = ({title}) => {
    const {token} = useAppSelector(state => state.authentication) as {token: string; user: UserProperties};
    const dispatch = useAppDispatch();

    const [showToast] = useToast();

    const doLogout = async () => {
        await logout(token);

        dispatch(logoutAction());
        await showToast('Du hast dich erfolgreich abgemeldet!');
    }

    return (
        <NavigatorPage title={title} buttons={<NavigatorBackButton text="Einstellungen"/>}>
            <IonButton onClick={doLogout} expand="block">Logout</IonButton>
        </NavigatorPage>
    )
}

export default AccountPage;
