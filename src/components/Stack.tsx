import * as React from "react";
import { Card, Rank, Suit } from "../model/Card";
import { Card as CardElement, EmptyCard, FaceDownCard } from "./Card";
import { Stack as ModelStack } from "../model/Stack";

export interface StackProps {
    stack: ModelStack;
    index: number;
    addCardToStack(rank: Rank, suit: Suit): void;
}

const HEIGHT_OFFSET_PER_CARD = 110;

export class Stack extends React.PureComponent<StackProps, {}> {

    private renderCard = (card: Card, index: number) => {
        const key = `${card.suit}:${card.rank}`;
        const faceDown = index < this.props.stack.faceUpIndex;
        const topOffset = HEIGHT_OFFSET_PER_CARD * -index;
        return faceDown ?
            <FaceDownCard key={key} topOffset={topOffset}/> :
            <CardElement
                key={key}
                topOffset={topOffset}
                dropTarget={{
                    type: "stack", index: this.props.index
                }}
                card={card}
            />
    };

    render() {
        const cards = this.props.stack.cards;

        return (
            <div className="solitaire-stack">
                {cards.length === 0 && <EmptyCard/>}
                {cards.map(this.renderCard)}
            </div>
        );
    }
}