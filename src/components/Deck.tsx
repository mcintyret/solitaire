import * as React from "react";
import { Card } from "../model/Card";
import { Card as CardElement, EmptyCard, FaceDownCard } from "./Card";
import { DropCardFromDeck } from "../actions/dropCardFromDeck";

export interface DeckProps {
    faceUpCard: Card | undefined;
    faceUpCardBeneath: Card | undefined;
    faceDownCards: number;
    onDealFromDeck(): void;
    onDropCardFromDeck(opts: DropCardFromDeck.Opts): void;
}

export class Deck extends React.PureComponent<DeckProps> {
    render() {
        const { faceDownCards, onDealFromDeck } = this.props;

        const faceDownProps = {
            onClick: onDealFromDeck,
        };
        const faceDown = faceDownCards === 0 ? <EmptyCard {...faceDownProps}/> : <FaceDownCard {...faceDownProps}/>;

        return (
            <div className="solitaire-deck">
                {this.renderFaceUpCardBeneath()}
                {this.renderFaceUpCard()}
                {faceDown}
            </div>
        );
    }

    private renderFaceUpCardBeneath() {
        const { faceUpCardBeneath } = this.props;
        if (faceUpCardBeneath === undefined) {
            return <EmptyCard/>;
        }
        return (
            <CardElement
                card={faceUpCardBeneath}
            />
        );
    }

    private renderFaceUpCard() {
        const { faceUpCard, onDropCardFromDeck } = this.props;
        if (faceUpCard === undefined) {
            return <EmptyCard/>;
        }
        return (
            <CardElement
                card={faceUpCard}
                onDrop={onDropCardFromDeck}
            />
        );
    }
};
