import * as React from "react";
import { Card } from "../model/Card";
import { renderCard } from "./Card";

export interface HomeBaseProps {
    homeBase: Array<Card | undefined>
}

export const HomeBase: React.SFC<HomeBaseProps> = (props: HomeBaseProps) => {
    return (
        <div className="solitaire-home-base">
            {props.homeBase.map((card, index) => {
                const dropTarget = {
                    type: "homebase" as "homebase",
                    index
                };
                return renderCard(card, { dropTarget });
            })}
        </div>
    );
}
