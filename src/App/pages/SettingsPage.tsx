import React, {FC} from 'react';
import NavigatorPage from '../components/Navigator/NavigatorPage';
import {NavigatorProps} from '../components/Navigator/types';

type SettingsPageProps = NavigatorProps


const Settings: FC<SettingsPageProps> = ({title}) => {
    return (
        <NavigatorPage title={title}>
        </NavigatorPage>
    );
};

export default Settings;
