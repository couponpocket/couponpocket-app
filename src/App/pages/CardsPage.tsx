import React, {FC} from "react";
import NavigatorPage from "../components/Navigator/NavigatorPage";
import {NavigatorProps} from "../components/Navigator/types";

interface CardsPageProps extends NavigatorProps {
}

const Cards: FC<CardsPageProps> = ({title}) => {
    return (
        <NavigatorPage title={title}>
        </NavigatorPage>
    );
};

export default Cards;
