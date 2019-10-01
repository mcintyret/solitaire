import * as React from "react";
import { Stack } from "./Stack";
import { GameState } from "../state/state";
import { HomeBase } from "./HomeBase";
import { Deck } from "./Deck";
import { AddCardToStack } from "../actions/addCardToStack";
import { Rank, Suit } from "../model/Card";
import { DropCardFromDeck } from "../actions/dropCardFromDeck";

export interface GameBoardProps {
    game: GameState;
    onDealFromDeck(): void;
    addCardToStack(opts: AddCardToStack.Opts): void;
    onDropCardFromDeck(opts: DropCardFromDeck.Opts): void;
}

export class GameBoard extends React.PureComponent<GameBoardProps> {
    render() {
        const { game: { deckFaceUp, deckFaceDown, stacks, homeBase }, onDealFromDeck, addCardToStack, onDropCardFromDeck } = this.props;
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
                        onDropCardFromDeck={onDropCardFromDeck}
                    />
                </div>
                <div className="solitaire-game-main">
                    {stacks.map((stack, i) => (
                        <Stack
                            stack={stack}
                            index={i}
                            addCardToStack={(rank: Rank, suit: Suit) => addCardToStack({ suit, rank, stackIndex: i })}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
