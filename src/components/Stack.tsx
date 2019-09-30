import * as React from "react";
import { Card, Suit, Rank } from "../model/Card";
import { Card as CardElement, FaceDownCard, EmptyCard } from "./Card";
import { Stack as ModelStack } from "../model/Stack";

export interface StackProps {
    stack: ModelStack;
    addCardToStack(rank: Rank, suit: Suit): void;
}

const HEIGHT_OFFSET_PER_CARD = 110;

export class Stack extends React.PureComponent<StackProps, {}> {

    private renderCard = (card: Card, index: number) => {
        const key = `${card.suit}:${card.rank}`;
        const faceDown = index < this.props.stack.faceUpIndex;
        const style = {top: HEIGHT_OFFSET_PER_CARD * -index}
        return faceDown ?
            <FaceDownCard key={key} style={style}/> :
            <CardElement 
                key={key} 
                style={style} 
                suit={card.suit} 
                rank={card.rank} 
                onDropCard={this.props.addCardToStack}
            />
    }

    render() {
        const cards = this.props.stack.cards;

        return (
            <div className="solitaire-stack">
                {cards.length === 0 && <EmptyCard />}
                {cards.map(this.renderCard)}
            </div>
        );
    }
}