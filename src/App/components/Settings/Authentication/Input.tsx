import React, {Dispatch, FC, SetStateAction, useCallback} from 'react';
import {IonInput, IonLabel, IonText} from '@ionic/react';
import {InputChangeEventDetail, TextFieldTypes} from '@ionic/core';

import './Input.css';
import {IonInputCustomEvent} from '@ionic/core/dist/types/components';

export interface ErrorState {
    [val: string]: string[];
}

interface InputProps {
    label?: string;
    placeholder: string;
    name: string;
    type?: TextFieldTypes;
    errors: ErrorState | undefined;
    setErrors: Dispatch<SetStateAction<ErrorState | undefined>>;
}

type inputChange = (event: IonInputCustomEvent<InputChangeEventDetail>) => void;

const Input: FC<InputProps> = ({label, placeholder, name, type, errors, setErrors}) => {
    const inputChange: inputChange = useCallback((e) => {
        e.preventDefault();

        setErrors((errors) => {
            if (!errors) {
                return errors;
            }

            // is required, because the state won't update if we don't copy the state
            const copy = {...errors};

            delete copy[e.target.name];
            return copy;
        });
    }, [setErrors]);

    return (
        <>
            {label === undefined ? (
                <IonLabel>
                    {label}
                </IonLabel>
            ) : null}
            <div className="input-field">
                <IonInput onIonChange={inputChange} type={type} name={name} placeholder={placeholder}/>
            </div>
            {errors && Object.keys(errors).includes(name) ? (
                <IonText color="danger">{errors[name].toString()}</IonText>
            ) : null}
        </>
    );
}

export default Input;