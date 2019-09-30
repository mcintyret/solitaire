import * as React from "react";
import { Card as ModelCard, isRed, Rank, rankToString, Suit } from "../model/Card";
import * as classNames from "classnames";

export interface BaseCardProps extends React.HTMLAttributes<any> {
    onDropCard?: (rank: Rank, suit: Suit) => void;
    isDragging?: boolean;
}

export interface CardState {
    rank: Rank;
    suit: Suit;
}

export interface CardProps extends BaseCardProps, CardState {

}

export class Card extends React.PureComponent<CardProps> {
    render() {
        const { suit, rank, isDragging, ...divProps } = this.props;
        return (<div className={classNames("solitaire-card", {
                "-red": isRed(suit),
                "-black": !isRed(suit),
                "-dragging": isDragging
            })} {...divProps}>
                <div className="solitaire-rank">{rankToString(rank)}</div>
                <div className="solitaire-suit">{suit}</div>
            </div>
        );
    }
}

export const FaceDownCard = (props: BaseCardProps) => <div className="solitaire-card -face-down" {...props} />;

export const EmptyCard = (props: BaseCardProps) => <div className="solitaire-card -empty" {...props} />;

export function renderCard(card: ModelCard | undefined) {
    return card === undefined ? <EmptyCard/> : <Card suit={card.suit} rank={card.rank}/>;
}