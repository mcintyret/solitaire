export namespace DealFromDeck {
    export const TYPE = "DEAL_FROM_DECK";

    export interface Action {
        type: typeof TYPE;
    }

    export function execute(): Action {
        return { type: TYPE };
    }
}