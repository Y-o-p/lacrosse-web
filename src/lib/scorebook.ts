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
    homeWon: Boolean;
}

export async function performAction(game: BigInt, action: ScorebookAction) {
    switch (action.actionType) {
        case ActionType.Shot: {
            const shot = action as Shot;
            var shotBy: PlayerStats = await getPlayerStats(shot.by);
            shotBy.shots++;
            if (shot.goal) {
                shotBy.goals++;
            }
            if (shot.assistedBy !== undefined) {
                var assistedBy: PlayerStats = await getPlayerStats(shot.assistedBy);
                assistedBy.assists++;
            }
            if (shot.savedBy !== undefined) {
                var savedBy: PlayerStats = await getPlayerStats(shot.savedBy);
                savedBy.saves++;
            }
            console.log(shotBy);
        }
    }
}

export async function undoAction(game: BigInt, action: ScorebookAction) {
    switch (action.actionType) {
        case ActionType.Shot: {
            
        }
    }
}