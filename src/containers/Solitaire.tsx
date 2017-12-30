import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../state/state";
import { Dispatch } from "redux";
import { NewGame } from "../actions/newGame";
import { GameBoard } from "../components/GameBoard";

export interface StateProps {
    state: AppState;
}

export interface DispatchCallbacks {
    newGame(): void;
}

export function mapStateToProps(state: AppState): StateProps {
    return {
        state
    };
}

export function mapDispatchToProps(dispatch: Dispatch<AppState>): DispatchCallbacks {
    return {
        newGame: () => dispatch(NewGame.execute())
    };
}

export interface SolitaireProps extends StateProps, DispatchCallbacks {
    
}

export class SolitaireContainer extends React.PureComponent<SolitaireProps, {}> {

    constructor(props: SolitaireProps) {
        super(props);
        props.newGame();
    }

    render() {
        if (this.props.state.gameState == null) {
            return <div>"No Game!"</div>;
        }
        return <GameBoard game={this.props.state.gameState} />
    }
}

export const WrappedSolitaireContainer = connect(mapStateToProps, mapDispatchToProps)(SolitaireContainer);