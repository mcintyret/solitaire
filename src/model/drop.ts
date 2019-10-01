export interface DropTarget {
    type: "homebase" | "stack",
    index: number;
}

export interface StackDropSource {
    type: "stack";
    index: number;
}

export interface DeckDropSource {
    type: "deck";
}

export type DropSource = StackDropSource | DeckDropSource;