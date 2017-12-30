import * as React from "react";
import { Rank, Suit, isRed, Card as ModelCard } from "../model/Card";
import * as classNames from "classnames";

export interface CardProps {
    rank: Rank;
    suit: Suit;
}

export const Card: React.SFC<CardProps> = (props: CardProps) => (
    <div className={classNames("solitaire-card", {
        "-red": isRed(props.suit),
        "-black": !isRed(props.suit),
    })}>
        <div className="solitaire-rank">{props.rank}</div>
        <div className="solitaire-suit">{props.suit}</div>
    </div>
);

export const FaceDownCard: React.SFC<{}> = () => <div className="solitaire-card -face-down" />;

export const EmptyCard: React.SFC<{}> = () => <div className="solitaire-card -empty" />;

export function maybeRenderCard(card: ModelCard | undefined) {
    return card === undefined ? <EmptyCard /> : <Card {...card} />
}