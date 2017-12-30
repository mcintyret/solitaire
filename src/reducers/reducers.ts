import { gameState } from "./gameStateReducer";
import { settingsState } from "./settingsStateReducer";
import { GameState, SettingsState } from "../state/state";

export type Reducer = {
    gameState: (state: GameState | null | undefined, action: any) => GameState | null,
    settingsState: (state: SettingsState | undefined, action: any) => SettingsState,
}

export const reducers: Reducer = {
    gameState,
    settingsState
}
