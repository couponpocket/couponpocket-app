import React, { useState, useEffect } from "react";
import { Storage } from '@capacitor/storage';
import validator from "validator/es";

const getItem = async (key) => {
    try {
        const {value} = await Storage.get({key});

        return value && validator.isJSON(value) ? JSON.parse(value) : value;
    } catch (e) {
        console.error(e);
    }
};

const useStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState();

    useEffect(() => {
        (async () => {
            try {
                const result = await Storage.get({key});

                if (result.value === undefined && initialValue !== undefined) {
                    result.value = typeof initialValue !== "object" ? initialValue : JSON.stringify(initialValue);

                    await setValue(result.value);
                } else {
                    setStoredValue(result.value !== null && validator.isJSON(result.value) ? JSON.parse(result.value) : result.value);
                }
            } catch (e) {
                return null;
            }
        })()
    }, [Storage, setStoredValue, initialValue, key])

    const setValue = async (value) => {
        setStoredValue(value);
        await Storage.set({key, value: typeof value !== "object" ? value : JSON.stringify(value)});
    };

    return [storedValue, setValue];
};

export default useStorage;
