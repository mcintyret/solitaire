import { GameState, INITIAL_STATE } from "../state/state";
import { NewGame } from "../actions/newGame";
import { newDeck, Card } from "../model/Card";

function handleNewGame(): GameState {
    const deck = newDeck();
    const stacks: Card[][] = [];

    for (let i = 1; i <= 7; i++) {
        stacks.push(deck.splice(0, i));
    }

    return {
        deckFaceDown: deck,
        deckFaceUp: [],
        stacks,
        homeBase: [undefined, undefined, undefined, undefined]
    }
}

export type TheGameState = GameState | null;

export function gameState(state: TheGameState = INITIAL_STATE.gameState, action: any): TheGameState {
    switch (action.type) {
        case NewGame.TYPE:
            return handleNewGame()
        default:
            return state;   
    }
}