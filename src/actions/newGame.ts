export namespace NewGame {
    export const TYPE = "NEW_GAME";

    export interface Action {
        type: typeof TYPE;
    }

    export function execute(): Action {
        return {type: TYPE};
    }
}