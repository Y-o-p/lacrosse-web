import { getPlayerStats, patchPlayerStats } from "./api";

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
    successful: boolean;
}

export interface Penalty extends ScorebookAction {
    by: Player;
    duration: number;
}

export interface GroundBall extends ScorebookAction {
    by: Player;
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
        case ActionType.Turnover: {
            const turnover = action as Turnover;
            return `${turnover.by.first_name} ${turnover.by.last_name} turnover`;
        }
        case ActionType.ClearAttempted: {
            const clearAttempted = action as ClearAttempted;
            return `${clearAttempted.by.first_name} ${clearAttempted.by.last_name} clear attempted`;
        }
        case ActionType.Penalty: {
            const penalty = action as Penalty;
            return `${penalty.by.first_name} ${penalty.by.last_name} got a penalty`;
        }
        case ActionType.GroundBall: {
            const ground = action as GroundBall;
            return `${ground.by.first_name} ${ground.by.last_name} recovered the ball`;
        }
        case ActionType.Timeout: {
            const timeout = action as Timeout;
            return `Timeout`;
        }
        case ActionType.Faceoff: {
            const faceoff = action as Faceoff;
            return `${faceoff.homePlayer.first_name} ${faceoff.homePlayer.last_name} faced ${faceoff.awayPlayer.first_name} ${faceoff.awayPlayer.last_name}`;
        }
    }
    return action.date;
}

export async function performAction(action: ScorebookAction, undo = false) {
    const polarity = undo ? -1 : 1;
    switch (action.actionType) {
        case ActionType.Shot: {
            const shot = action as Shot;
            if (shot.by === null) {
                throw new Error("Missing parameters");
            }
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
            break;
        }
        case ActionType.Turnover: {
            const turnover = action as Turnover;
            if (turnover.by === null || turnover.causedBy === null) {
                throw new Error("Missing parameters");
            }
            var turnoverBy: PlayerStats = await getPlayerStats(turnover.by.playerstat_id);
            console.log(turnoverBy);
            var turnoverCausedBy: PlayerStats = await getPlayerStats(turnover.causedBy.playerstat_id);
            console.log(turnoverCausedBy);
            break;
            // NOTE: there is no turnover stat
        }
        case ActionType.ClearAttempted: {
            const clear = action as ClearAttempted;
            if (clear.by === null) {
                throw new Error("Missing parameters");
            }
            var clearAttemptedBy: PlayerStats = await getPlayerStats(clear.by.playerstat_id);
            clearAttemptedBy.clears_attempted += polarity;
            if (clear.successful) {
                clearAttemptedBy.clears_made += polarity;
            }
            await patchPlayerStats(clearAttemptedBy);
            break;
        }
        case ActionType.Penalty: {
            const penalty = action as Penalty;
            if (penalty.by === null) {
                throw new Error("Missing parameters");
            }
            var penaltyBy: PlayerStats = await getPlayerStats(penalty.by.playerstat_id);
            penaltyBy.penalties += polarity;
            await patchPlayerStats(penaltyBy);
            break;
        }
        case ActionType.GroundBall: {
            const ground = action as GroundBall;
            if (ground.by === null) {
                throw new Error("Missing parameters");
            }
            // NOTE: there is no ground ball stat
            var groundBy: PlayerStats = await getPlayerStats(ground.by.playerstat_id);
            //groundBy. += polarity;
            //await patchPlayerStats(penaltyBy);
            break;
        }
        case ActionType.Timeout: {
            const timeout = action as Timeout;
            break;
        }
        case ActionType.Faceoff: {
            const faceoff = action as Faceoff;
            if (faceoff.homePlayer === null || faceoff.awayPlayer === null) {
                throw new Error("Missing parameters");
            }
            var homePlayer: PlayerStats = await getPlayerStats(faceoff.homePlayer.playerstat_id);
            var awayPlayer: PlayerStats = await getPlayerStats(faceoff.awayPlayer.playerstat_id);
            if (faceoff.homeWon) {
                homePlayer.faceoffs_won += polarity;
                awayPlayer.faceoffs_lost += polarity;
            }
            else {
                homePlayer.faceoffs_lost += polarity;
                awayPlayer.faceoffs_won += polarity;
            }
            await patchPlayerStats(homePlayer);
            await patchPlayerStats(awayPlayer);
            break;
        }
    }
}