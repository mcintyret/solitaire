import * as React from "react";
import { Stack } from "./Stack";
import { GameState } from "../state/state";
import { HomeBase } from "./HomeBase";
import { Deck } from "./Deck";

export interface GameBoardProps {
    game: GameState;
}

export const GameBoard: React.SFC<GameBoardProps> = (props: GameBoardProps) => {
    const { deckFaceUp, deckFaceDown, stacks, homeBase } = props.game;
    
    return (
        <div className="solitaire-game">
            <div className="solitaire-game-top">
                <HomeBase homeBase={homeBase}/>
                <Deck 
                    card={deckFaceUp[deckFaceUp.length - 1]}
                    faceDownCards={deckFaceDown.length}
                />
            </div>
            <div className="solitaire-game-main">
                {stacks.map(stack => <Stack cards={stack}/>)}
            </div>
        </div>
    );
}
