import { apiCall, getPlayerStats } from "./api";
import { toJson } from "./util";

export enum ActionType {
    Shot,
    Turnover,
    ClearAttempted,
    Penalty,
    GroundBall,
    Sub,
    Timeout,
    Faceoff
}

export interface ScorebookAction {
    readonly actionType: ActionType;
    date: Date;
}

export interface Shot extends ScorebookAction {
    by: BigInt;
    goal: Boolean;
    assistedBy?: BigInt;
    savedBy?: BigInt;
}

export interface Turnover extends ScorebookAction {
    by: BigInt;
    causedBy: BigInt;
}

export interface ClearAttempted extends ScorebookAction {
    by: BigInt;
}

export interface Penalty extends ScorebookAction {
    by: BigInt;
    duration: number;
}

export interface Timeout extends ScorebookAction {
}

export interface Faceoff extends ScorebookAction {
    homePlayer: BigInt;
    awayPlayer: BigInt;
    homeWon: BigInt;
}

export async function performAction(game: BigInt, action: ScorebookAction) {
    switch (action.actionType) {
        case ActionType.Shot: {
            var shotBy: PlayerStats = await (apiCall("GET", `/api/player-stats/${(action as Shot).by}`))[0];
        }
    }
}

export async function undoAction(game: BigInt, action: ScorebookAction) {
    switch (action.actionType) {
        case ActionType.Shot: {
            // 
        }
    }
}