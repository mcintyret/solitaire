import * as React from "react";
import { Card } from "../model/Card";
import { maybeRenderCard } from "./Card";

export interface HomeBaseProps {
    homeBase: Array<Card | undefined>
}

export const HomeBase: React.SFC<HomeBaseProps> = (props: HomeBaseProps) => {
    return (
        <div className="solitaire-home-base">
            {props.homeBase.map(maybeRenderCard)}
        </div>
    );
}