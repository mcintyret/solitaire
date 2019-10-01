import * as React from "react";
import { Stack } from "./Stack";
import { GameState } from "../state/state";
import { HomeBase } from "./HomeBase";
import { Deck } from "./Deck";
import { DropCard } from "../actions/dropCard";
import { Card } from "../model/Card";
import { DropTarget } from "../model/drop";

export interface GameBoardProps {
    game: GameState;
    onDealFromDeck(): void;
    onDropCard(opts: DropCard.Opts): void;
}

export class GameBoard extends React.PureComponent<GameBoardProps> {
    render() {
        const { game: { deckFaceUp, deckFaceDown, stacks, homeBase }, onDealFromDeck } = this.props;
        const faceUpCard = deckFaceUp[deckFaceUp.length - 1];
        const faceUpCardBeneath = deckFaceUp[deckFaceUp.length - 2];

        return (
            <div className="solitaire-game">
                <div className="solitaire-game-top">
                    <HomeBase homeBase={homeBase}/>
                    <Deck
                        faceUpCard={faceUpCard}
                        faceUpCardBeneath={faceUpCardBeneath}
                        faceDownCards={deckFaceDown.length}
                        onDealFromDeck={onDealFromDeck}
                        onDropCardFromDeck={this.handleDropCardFromDeck}
                    />
                </div>
                <div className="solitaire-game-main">
                    {stacks.map((stack, i) => (
                        <Stack
                            stack={stack}
                            index={i}
                            onDropCardFromStack={this.handleDropCardFromStack(i)}
                        />
                    ))}
                </div>
            </div>
        );
    }

    private handleDropCardFromDeck = (card: Card, dropTarget: DropTarget) => {
        this.props.onDropCard({
            card,
            dropTarget,
            dropSource: { type: "deck" }
        });
    }

    private handleDropCardFromStack(index: number) {
        return (card: Card, dropTarget: DropTarget) => {
            this.props.onDropCard({
                card,
                dropTarget,
                dropSource: { type: "stack", index }
            });
        }
    }
}
