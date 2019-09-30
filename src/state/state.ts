import { Card } from "../model/Card";
import { Stack } from "../model/Stack";

export interface AppState {
    gameState: GameState | null;
    settingsState: SettingsState;
}

export interface GameState {
    deckFaceUp: Card[];
    deckFaceDown: Card[];
    stacks: Stack[];
    homeBase: Array<Card | undefined>;
}

export interface SettingsState {

}

export const INITIAL_STATE: AppState = {
    gameState: null,
    settingsState: {}
};