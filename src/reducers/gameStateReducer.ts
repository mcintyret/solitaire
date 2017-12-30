import { GameState, INITIAL_STATE } from "../state/state";
import { NewGame } from "../actions/newGame";
import { newDeck, Card } from "../model/Card";
import { DealFromDeck } from "../actions/dealFromDeck";
import { reverse } from "lodash";

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

function handleDealFromDeck(state: GameState): GameState {
    const deckFaceUp = [...state.deckFaceUp];
    const deckFaceDown = [...state.deckFaceDown];
    if (deckFaceDown.length === 0) {
        return {...state, deckFaceDown: reverse(deckFaceUp), deckFaceUp: []};
    }
    deckFaceUp.push(deckFaceDown.pop()!);
    return {...state, deckFaceDown, deckFaceUp};
}

export type TheGameState = GameState | null;

export function gameState(state: TheGameState = INITIAL_STATE.gameState, action: any): TheGameState {
    switch (action.type) {
        case NewGame.TYPE:
            return handleNewGame();
        case DealFromDeck.TYPE:
            return handleDealFromDeck(state!);
        default:
            return state;   
    }
}