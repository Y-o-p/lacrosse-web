import { toJson } from "./util";

enum ActionType {
    Shot,
    Turnover,
    ClearAttempted,
    Penalty,
    GroundBall,
    Sub,
    Timeout,
    Faceoff
}

interface ScorebookAction {
    readonly actionType: ActionType;
    date: Date;
}

export interface Shot extends ScorebookAction {
    actionType: ActionType.Shot;
    by: BigInt;
    goal: Boolean;
    assistedBy?: BigInt;
    savedBy?: BigInt;
}

export interface Turnover extends ScorebookAction {
    actionType: ActionType.Turnover;
    by: BigInt;
    causedBy: BigInt;
}

export interface ClearAttempted extends ScorebookAction {
    actionType: ActionType.ClearAttempted;
    by: BigInt;
}

export interface Penalty extends ScorebookAction {
    actionType: ActionType.Penalty;
    by: BigInt;
    duration: number;
}

export interface Timeout extends ScorebookAction {
    actionType: ActionType.Timeout;
}

export interface Faceoff extends ScorebookAction {
    actionType: ActionType.Faceoff;
    homePlayer: BigInt;
    awayPlayer: BigInt;
    homeWon: BigInt;
}

async function performAction(game: BigInt, action: ScorebookAction) {
    switch (action.actionType) {
        case ActionType.Shot: {
            // 
            var goal = await (await fetch("/api/", {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: toJson(action)

            })).json();
        }
    }
}

async function undoAction(game: BigInt, action: ScorebookAction) {
    switch (action.actionType) {
        case ActionType.Shot: {
            // 
        }
    }
}