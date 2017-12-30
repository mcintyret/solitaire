import * as React from "react";
import { Card } from "../model/Card";
import { EmptyCard, FaceDownCard, maybeRenderCard } from "./Card";

export interface DeckProps {
    card: Card | undefined;
    faceDownCards: number;
}

export const Deck: React.SFC<DeckProps> = (props: DeckProps) => {
    const { card, faceDownCards } = props;
    
    const faceUp = maybeRenderCard(card);
    const faceDown = faceDownCards === 0 ? <EmptyCard /> : <FaceDownCard />;

    return (
        <div className="solitaire-deck">
            {faceUp}
            {faceDown}
        </div>
    );
}
