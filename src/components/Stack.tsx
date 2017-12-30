import * as React from "react";
import { Card } from "../model/Card";
import { Card as CardElement, FaceDownCard, EmptyCard } from "./Card";

export interface StackProps {
    cards: Card[];
}

const HEIGHT_OFFSET_PER_CARD = 110;

function renderCard(card: Card, index: number, allCards: Card[]) {
    const key = `${card.suit}:${card.rank}`;
    const faceDown = index !== allCards.length - 1;
    const style = {top: HEIGHT_OFFSET_PER_CARD * -index}
    return faceDown ?
        <FaceDownCard key={key} style={style}/> :
        <CardElement key={key} style={style} suit={card.suit} rank={card.rank} />
}

export const Stack: React.SFC<StackProps> = (props: StackProps) => {
    const cards = props.cards;

    return (
        <div className="solitaire-stack">
            {cards.length === 0 && <EmptyCard />}
            {cards.map(renderCard)}
        </div>
    );
}