import { GameState, INITIAL_STATE } from "../state/state";
import { NewGame } from "../actions/newGame";
import { newDeck, Card } from "../model/Card";
import { Stack } from "../model/Stack";
import { DealFromDeck } from "../actions/dealFromDeck";
import { reverse } from "lodash";
import { AddCardToStack } from "../actions/addCardToStack";

function handleNewGame(): GameState {
    const deck = newDeck();
    const stacks: Stack[] = [];

    for (let i = 1; i <= 7; i++) {
        stacks.push({
            cards: deck.splice(0, i),
            faceUpIndex: i - 1
        });
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

function handleAddCardToStack(state: GameState, action: AddCardToStack.Action): TheGameState {
    const { rank, suit, stackIndex } = action;
    const stacks = [...state.stacks];
    const cards = [...stacks[stackIndex].cards];
    cards.push(new Card({rank, suit}));
    stacks[stackIndex].cards = cards;
    return {...state, stacks};
}

export type TheGameState = GameState | null;

export function gameState(state: TheGameState = INITIAL_STATE.gameState, action: any): TheGameState {
    switch (action.type) {
        case NewGame.TYPE:
            return handleNewGame();
        case DealFromDeck.TYPE:
            return handleDealFromDeck(state!);
        case AddCardToStack.TYPE:
            return handleAddCardToStack(state!, action as AddCardToStack.Action);
        default:
            return state;   
    }
}