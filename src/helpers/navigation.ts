import {createAnimation} from "@ionic/react";


export const noPageAnimation = () => {
    const x = createAnimation();
    x.addElement(document.createElement('div'));
    x.addElement(document.createElement('div'));

    return x;
}