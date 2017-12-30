import * as React from "react";
import { Rank, Suit, isRed, Card as ModelCard, rankToString } from "../model/Card";
import * as classNames from "classnames";

export interface BaseCardProps extends React.HTMLAttributes<any> {
    
}

export interface CardProps extends BaseCardProps {
    rank: Rank;
    suit: Suit;
}

export const Card: React.SFC<CardProps> = (props: CardProps) => {
    const {suit, rank, ...divProps} = props;
    return (
        <div className={classNames("solitaire-card", {
            "-red": isRed(suit),
            "-black": !isRed(suit),
        })} {...divProps}>
            <div className="solitaire-rank">{rankToString(rank)}</div>
            <div className="solitaire-suit">{suit}</div>
        </div>
    );
};

export const FaceDownCard: React.SFC<BaseCardProps> = (props: BaseCardProps) => <div className="solitaire-card -face-down" {...props}/>;

export const EmptyCard: React.SFC<BaseCardProps> = (props: BaseCardProps) => <div className="solitaire-card -empty" {...props}/>;

export function renderCard(card: ModelCard | undefined) {
    return card === undefined ? <EmptyCard /> : <Card suit={card.suit} rank={card.rank} />
}