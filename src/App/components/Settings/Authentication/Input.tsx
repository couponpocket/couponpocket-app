import React, {Dispatch, FC, SetStateAction} from "react";
import {IonInput, IonLabel} from "@ionic/react";
import {TextFieldTypes} from "@ionic/core";

import './Input.css';

export interface ErrorState {
    [val: string]: string[]
}

interface InputProps {
    label: string;
    placeholder: string;
    name?: string;
    type?: TextFieldTypes;
    errors: ErrorState | undefined,
    setErrors: Dispatch<SetStateAction<ErrorState | undefined>>
}

const Input: FC<InputProps> = ({label, placeholder, name, type}) => {


    return (
        <>
            <IonLabel>
                {label}
            </IonLabel>
            <div className="input-field">
                <IonInput type={type} name={name} placeholder={placeholder}/>
            </div>
        </>
    );
}

export default Input;