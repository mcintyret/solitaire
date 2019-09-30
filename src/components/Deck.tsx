import * as React from "react";
import { Card, Rank, Suit, rankToString } from "../model/Card";
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
        onClick: onDealFromDeck,
        onDropCard: (rank: Rank, suit: Suit) => alert(`Dropped ${rankToString(rank)} of ${suit}`)
    }
    const faceDown = faceDownCards === 0 ? <EmptyCard {...faceDownProps}/> : <FaceDownCard {...faceDownProps}/>;

    return (
        <div className="solitaire-deck">
            {faceUp}
            {faceDown}
        </div>
    );
}
