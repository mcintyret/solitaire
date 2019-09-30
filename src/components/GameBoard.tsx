import * as React from "react";
import { Stack } from "./Stack";
import { GameState } from "../state/state";
import { HomeBase } from "./HomeBase";
import { Deck } from "./Deck";
import { AddCardToStack } from "../actions/addCardToStack";
import { Rank, Suit } from "../model/Card";

export interface GameBoardProps {
    game: GameState;
    onDealFromDeck(): void;
    addCardToStack(opts: AddCardToStack.Opts): void;
}

export class GameBoard extends React.PureComponent<GameBoardProps> {
    render() {
        const { game: { deckFaceUp, deckFaceDown, stacks, homeBase }, onDealFromDeck, addCardToStack } = this.props;

        return (
            <div className="solitaire-game">
                <div className="solitaire-game-top">
                    <HomeBase homeBase={homeBase}/>
                    <Deck
                        card={deckFaceUp[deckFaceUp.length - 1]}
                        faceDownCards={deckFaceDown.length}
                        onDealFromDeck={onDealFromDeck}
                    />
                </div>
                <div className="solitaire-game-main">
                    {stacks.map((stack, i) => (
                        <Stack
                            stack={stack}
                            addCardToStack={(rank: Rank, suit: Suit) => addCardToStack({ suit, rank, stackIndex: i })}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
