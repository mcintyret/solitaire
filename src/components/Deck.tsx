import * as React from "react";
import { Card } from "../model/Card";
import { EmptyCard, FaceDownCard, renderCard } from "./Card";

export interface DeckProps {
    card: Card | undefined;
    faceDownCards: number;
    onDealFromDeck(): void;
}

export const Deck: React.SFC<DeckProps> = (props: DeckProps) => {
    const { card, faceDownCards, onDealFromDeck } = props;
    
    const faceUp = renderCard(card);

    const faceDownProps = {
        onClick: onDealFromDeck
    }
    const faceDown = faceDownCards === 0 ? <EmptyCard {...faceDownProps}/> : <FaceDownCard {...faceDownProps}/>;

    return (
        <div className="solitaire-deck">
            {faceUp}
            {faceDown}
        </div>
    );
}
