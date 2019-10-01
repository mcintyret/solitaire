import * as React from "react";
import { Card as ModelCard, isRed, rankToString } from "../model/Card";
import * as classNames from "classnames";
import { DropCardFromDeck } from "../actions/dropCardFromDeck";

export interface DropTarget {
    type: "homebase" | "stack",
    index: number;
}

export interface BaseCardProps {
    topOffset?: number;
    dropTarget?: DropTarget;
    onClick?(): void;
}

export interface CardProps extends BaseCardProps {
    card: ModelCard;
    onDrop?(opts: DropCardFromDeck.Opts): void;
}

interface State {
    isDragging: boolean;
    xTranslate: number;
    yTranslate: number;
}

export class Card extends React.PureComponent<CardProps, State> {
    state: State = {
        isDragging: false,
        xTranslate: 0,
        yTranslate: 0
    };

    render() {
        const { card: { suit, rank }, topOffset, dropTarget } = this.props;
        const { isDragging, xTranslate, yTranslate } = this.state;
        const className = classNames("solitaire-card", {
            "-red": isRed(suit),
            "-black": !isRed(suit),
            "-dragging": isDragging
        });

        const style = {
            top: (topOffset || 0) + yTranslate,
            right: xTranslate
        };

        return (
            <div
                className={className}
                data-dropTarget={dropTarget && JSON.stringify(dropTarget)}
                style={style}
                {...this.getMouseHandlers()}
            >
                <div className="solitaire-rank">{rankToString(rank)}</div>
                <div className="solitaire-suit">{suit}</div>
            </div>
        );
    }

    private getMouseHandlers() {
        if (this.props.onDrop === undefined) {
            return {};
        }
        return {
            onMouseDown: this.handleMouseDown,
            onMouseMove: this.handleMouseMove,
            onMouseUp: this.handleMouseUp,
            onMouseLeave: this.handleMouseLeave
        };
    }

    private handleMouseDown = () => this.setState({ isDragging: true });
    private handleMouseLeave = () => this.setState({ isDragging: false, xTranslate: 0, yTranslate: 0 });
    private handleMouseUp = (evt: React.MouseEvent) => {
        this.handleMouseLeave();
        const target = document.elementsFromPoint(evt.pageX, evt.pageY)[1] as HTMLElement;
        const dropTarget: DropTarget | undefined = target.dataset.droptarget && JSON.parse(target.dataset.droptarget);
        const { onDrop, card } = this.props;
        dropTarget && onDrop && onDrop({ card, dropTarget });
    };

    private handleMouseMove = (evt: React.MouseEvent) => {
        if (!this.state.isDragging) {
            return;
        }
        const { movementX, movementY } = evt;

        this.setState(state => ({
            xTranslate: state.xTranslate - movementX,
            yTranslate: state.yTranslate + movementY
        }));
    };
}

export const FaceDownCard = simpleCard("-face-down");

export const EmptyCard = simpleCard("-empty");

function simpleCard(className: string) {
    return (props: BaseCardProps) => {
        const { topOffset, dropTarget, ...otherProps } = props;
        const style = { top: topOffset || 0 };
        return (
            <div
                className={classNames("solitaire-card", className)}
                style={style}
                data-dropTarget={dropTarget && JSON.stringify(dropTarget)}
                {...otherProps}
            />
        );
    };
}

export function renderCard(card: ModelCard | undefined, props: BaseCardProps = {}) {
    return card === undefined ? <EmptyCard {...props}/> : <Card card={card} {...props}/>;
}