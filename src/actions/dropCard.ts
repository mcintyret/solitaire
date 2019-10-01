import { Card } from "../model/Card";
import { DropSource, DropTarget } from "../model/drop";

export namespace DropCard {
    export const TYPE = "DROP_CARD";

    export interface Opts {
        card: Card;
        dropTarget: DropTarget;
        dropSource: DropSource;
    }

    export interface Action extends Opts{
        type: typeof TYPE;
    }

    export function execute(opts: Opts): Action {
        return { type: TYPE, ...opts };
    }
}