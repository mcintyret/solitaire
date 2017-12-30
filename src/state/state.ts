import { Card } from "../model/Card";

export interface AppState {
    gameState: GameState | null;
    settingsState: SettingsState;
}

export interface GameState {
    deckFaceUp: Card[];
    deckFaceDown: Card[];
    stacks: Card[][];
    homeBase: Array<Card | undefined>;
}

export interface SettingsState {

}

export const INITIAL_STATE: AppState = {
    gameState: null,
    settingsState: {}
};