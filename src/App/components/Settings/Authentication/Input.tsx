import React, {Dispatch, FC, SetStateAction, useCallback, useMemo} from 'react';
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
    inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
}

type inputChange = (event: IonInputCustomEvent<InputChangeEventDetail>) => void;

const Input: FC<InputProps> = ({label, placeholder, name, type, errors, setErrors, inputmode}) => {
    const error = useMemo(() => errors && Object.keys(errors).includes(name) ? errors[name].toString() : '', [errors]);

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
            {label !== undefined ? (
                <IonLabel>
                    {label}
                </IonLabel>
            ) : null}
            <IonInput className={`input-field ${error ? 'has-error' : ''}`}
                      legacy={true}
                      inputmode={inputmode}
                      onIonChange={inputChange}
                      type={type}
                      name={name}
                      placeholder={placeholder}/>
            {error ? (
                <IonText color="danger">{error}</IonText>
            ) : null}
        </>
    );
}

export default Input;