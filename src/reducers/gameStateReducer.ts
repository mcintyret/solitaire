import { GameState, INITIAL_STATE } from "../state/state";
import { NewGame } from "../actions/newGame";
import { Card, newDeck } from "../model/Card";
import { Stack } from "../model/Stack";
import { DealFromDeck } from "../actions/dealFromDeck";
import { reverse } from "lodash";
import { DropCard } from "../actions/dropCard";
import { DropSource, DropTarget } from "../model/drop";

const NUM_STACKS = 7;
const NUM_HOME_BASES = 4;

function handleNewGame(): GameState {
    const deck = newDeck();
    const stacks: Stack[] = [];

    for (let i = 1; i <= NUM_STACKS; i++) {
        stacks.push({
            cards: deck.splice(0, i),
            faceUpIndex: i - 1
        });
    }

    const homeBase = new Array<Card | undefined>(NUM_HOME_BASES);
    homeBase.fill(undefined);

    return {
        deckFaceDown: deck,
        deckFaceUp: [],
        stacks,
        homeBase
    };
}

function handleDealFromDeck(state: GameState): GameState {
    const deckFaceUp = [...state.deckFaceUp];
    const deckFaceDown = [...state.deckFaceDown];
    if (deckFaceDown.length === 0) {
        return { ...state, deckFaceDown: reverse(deckFaceUp), deckFaceUp: [] };
    }
    deckFaceUp.push(deckFaceDown.pop()!);
    return { ...state, deckFaceDown, deckFaceUp };
}

export type TheGameState = GameState | null;

function handleDropCard(state: GameState, action: DropCard.Action): GameState {
    const updated = maybeHandleDropCard(state, action);
    if (updated) {
        return updateStateWithDropSource(updated, action.dropSource);
    }
    return state;
}

function updateStateWithDropSource(state: GameState, dropSource: DropSource) {
    if (dropSource.type === "deck") {
        return {
            ...state,
            deckFaceUp: state.deckFaceUp.slice(0, state.deckFaceUp.length - 1)
        }
    } else if (dropSource.type === "stack") {
        const stack = state.stacks[dropSource.index];
        const cards = [...stack.cards];
        cards.pop();
        const newStack = {
            cards,
            faceUpIndex: stack.faceUpIndex - 1
        };
        const stacks = [...state.stacks];
        stacks[dropSource.index] = newStack;
        return {
            ...state,
            stacks
        };
    }
    throw new Error();
}

function maybeHandleDropCard(state: GameState, action: { card: Card, dropTarget: DropTarget}): GameState | undefined {
    const { type, index } = action.dropTarget;
    if (type === "homebase") {
        const card = state.homeBase[index];
        if (
            (card === undefined && action.card.rank === 1)
            || (card && card.suit === action.card.suit && card.rank === action.card.rank - 1)
        ) {
            const homeBase = [...state.homeBase];
            homeBase[index] = action.card;
            return {
                ...state,
                homeBase,
            };
        }
    } else if (type === "stack") {
        const stack = state.stacks[index];
        const stackCard = stack.cards[stack.cards.length - 1];
        if (
            (stackCard === undefined && action.card.rank === 13)
            || (stackCard && stackCard.suit !== action.card.suit && stackCard.rank === action.card.rank + 1)) {

            const stacks = [...state.stacks];
            stacks[index] = {
                ...stack,
                cards: [...stack.cards, action.card]
            };

            return {
                ...state,
                stacks,
            }
        }
    }
    return undefined;
}

export function gameState(state: TheGameState = INITIAL_STATE.gameState, action: any): TheGameState {
    switch (action.type) {
        case NewGame.TYPE:
            return handleNewGame();
        case DealFromDeck.TYPE:
            return handleDealFromDeck(state!);
        case DropCard.TYPE:
            return handleDropCard(state!, action as DropCard.Action);
        default:
            return state;
    }
}