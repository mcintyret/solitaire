import { Card } from "../model/Card";
import { DropTarget } from "../components/Card";

export namespace DropCardFromDeck {
    export const TYPE = "DROP_CARD_FROM_DECK";

    export interface Opts {
        card: Card;
        dropTarget: DropTarget;
    }

    export interface Action extends Opts{
        type: typeof TYPE;
    }

    export function execute(opts: Opts): Action {
        return { type: TYPE, ...opts };
    }
}