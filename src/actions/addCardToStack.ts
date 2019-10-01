import { Rank, Suit } from "../model/Card";

export namespace AddCardToStack {
    export const TYPE = "ADD_CARD_TO_STACK";

    export interface Opts {
        rank: Rank;
        suit: Suit;
        stackIndex: number;
    }

    export interface Action extends Opts {
        type: typeof TYPE;
    }

    export function execute(props: Opts): Action {
        return { type: TYPE, ...props };
    }
}