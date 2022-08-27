import React, {Dispatch, FC, SetStateAction} from 'react';
import {IonInput, IonLabel, IonText} from '@ionic/react';
import {TextFieldTypes} from '@ionic/core';

import './Input.css';

export interface ErrorState {
    [val: string]: string[];
}

interface InputProps {
    label?: string;
    placeholder: string;
    name?: string;
    type?: TextFieldTypes;
    errors: ErrorState | undefined,
    setErrors: Dispatch<SetStateAction<ErrorState | undefined>>
}

const Input: FC<InputProps> = ({label, placeholder, name, type}) => {
    return (
        <>
            {label === undefined ? (
                <IonLabel>
                    {label}
                </IonLabel>
            ) : null}
            <div className="input-field">
                <IonInput type={type} name={name} placeholder={placeholder}/>
            </div>
            {errors && Object.keys(errors).includes(name) ? (
                <IonText color="danger">{errors[name].toString()}</IonText>
            ) : null}
        </>
    );
}

export default Input;