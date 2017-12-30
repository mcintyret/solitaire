import * as React from "react";
import { Card } from "../model/Card";
import { Card as CardElement, FaceDownCard, EmptyCard } from "./Card";

export interface StackProps {
    cards: Card[];
}

function renderCard(card: Card, faceDown: boolean) {
    const key = `${card.suit}:${card.rank}`;
    return faceDown ?
        <FaceDownCard key={key}/> :
        <CardElement key={key} {...card} />
}

export const Stack: React.SFC<StackProps> = (props: StackProps) => {
    const cards = props.cards;

    return (
        <div className="solitaire-stack">
            {cards.length === 0 && <EmptyCard />}
            {cards.map((card, index) => renderCard(card, index !== cards.length - 1))}
        </div>
    );
}