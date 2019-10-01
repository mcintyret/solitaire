import * as React from "react";
import { Card } from "../model/Card";
import { Card as CardElement, EmptyCard, FaceDownCard } from "./Card";
import { Stack as ModelStack } from "../model/Stack";
import { DropTarget } from "../model/drop";

export interface StackProps {
    stack: ModelStack;
    index: number;
    onDropCardFromStack(card: Card, dropTarget: DropTarget): void;
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
                onDrop={this.props.onDropCardFromStack}
                card={card}
            />;
    };

    render() {
        const cards = this.props.stack.cards;

        return (
            <div className="solitaire-stack">
                {cards.length === 0 && <EmptyCard dropTarget={{
                    type: "stack", index: this.props.index
                }}/>}
                {cards.map(this.renderCard)}
            </div>
        );
    }
}