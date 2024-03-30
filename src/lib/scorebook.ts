import { apiCall, getPlayerStats, patchPlayerStats } from "./api";
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
    by: Player;
    goal: Boolean;
    assistedBy?: Player;
    savedBy?: Player;
}

export interface Turnover extends ScorebookAction {
    by: Player;
    causedBy: Player;
}

export interface ClearAttempted extends ScorebookAction {
    by: Player;
}

export interface Penalty extends ScorebookAction {
    by: Player;
    duration: number;
}

export interface Timeout extends ScorebookAction {
}

export interface Faceoff extends ScorebookAction {
    homePlayer: Player;
    awayPlayer: Player;
    homeWon: Boolean;
}

export function actionToString(action: ScorebookAction) {
    switch (action.actionType) {
        case ActionType.Shot: {
            const shot = action as Shot;
            return `${shot.by.first_name} ${shot.by.last_name} shot`;
        }
    }
    return action.date;
}

export async function performAction(action: ScorebookAction, undo = false) {
    const polarity = undo ? -1 : 1;
    switch (action.actionType) {
        case ActionType.Shot: {
            const shot = action as Shot;
            console.log(shot);
            var shotBy: PlayerStats = await getPlayerStats(shot.by.playerstat_id);
            shotBy.shots += polarity;
            if (shot.goal) {
                shotBy.goals += polarity;
            }
            if (shot.assistedBy !== null) {
                var assistedBy: PlayerStats = await getPlayerStats(shot.assistedBy.playerstat_id);
                assistedBy.assists += polarity;
                await patchPlayerStats(assistedBy);
            }
            if (shot.savedBy !== null) {
                var savedBy: PlayerStats = await getPlayerStats(shot.savedBy.playerstat_id);
                savedBy.saves += polarity;
                await patchPlayerStats(savedBy);
            }
            await patchPlayerStats(shotBy);
            console.log(shotBy);

        }
    }
}