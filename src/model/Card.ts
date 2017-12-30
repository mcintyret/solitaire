import { values, shuffle } from "lodash";

export function isRed(suit: Suit): boolean {
    return suit === "HEARTS" || suit === "DIAMONDS";
}

export const Suit = {
    HEARTS: "HEARTS" as "HEARTS",
    DIAMONDS: "DIAMONDS" as "DIAMONDS",
    CLUBS: "CLUBS" as "CLUBS",
    SPADES: "SPADES" as "SPADES"
};

export type Suit = (typeof Suit)[keyof typeof Suit];

export const Rank = {
    ACE: 1 as 1,
    TWO: 2 as 2,
    THREE: 3 as 3,
    FOUR: 4 as 4,
    FIVE: 5 as 5,
    SIX: 6 as 6,
    SEVEN: 7 as 7,
    EIGHT: 8 as 8,
    NINE: 9 as 9,
    TEN: 10 as 10,
    JACK: 11 as 11,
    QUEEN: 12 as 12,
    KING: 13 as 13
}

export type Rank = (typeof Rank)[keyof typeof Rank];

export function rankToString(rank: Rank): string {
    switch (rank) {
        case 1:
            return "A";
        case 11:
            return "J";
        case 12:
            return "Q";
        case 13: 
            return "K";
        default:
            return rank + "";
    }
}

export interface CardState {
    rank: Rank;
    suit: Suit;
}

export class Card {
    constructor(private state: CardState) {

    }

    get suit() {
        return this.state.suit;
    }

    get rank() {
        return this.state.rank;
    }
}

export function newDeck(): Card[] {
    const deck: Card[] = [];
    values(Rank).forEach(rank => {
        values(Suit).forEach(suit => {
            deck.push(new Card({rank, suit}));
        });
    });
    return shuffle(deck);
}
