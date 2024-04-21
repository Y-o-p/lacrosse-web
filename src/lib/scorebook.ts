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
    time: String;
    home: boolean;
}

export interface Shot extends ScorebookAction {
    by: Player;
    goal: Boolean;
    goalie: Player;
    assistedBy?: Player;
    savedBy?: Player;
}

export interface Turnover extends ScorebookAction {
    by: Player;
    causedBy?: Player;
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
            var message = "";
            if (shot.goal) {
                message = `Goal by ${shot.by.last_name}`
            }
            else {
                message = `Shot by ${shot.by.last_name}`
            }
            if (shot.assistedBy !== null) {
                message += `, assist by ${shot.assistedBy.last_name}`
            }
            if (shot.savedBy !== null) {
                message += `, save by ${shot.savedBy.last_name}`
            }
            return message;
        }
        case ActionType.Turnover: {
            const turnover = action as Turnover;
            var message = `Turnover by ${turnover.by.last_name}`;
            if (turnover.causedBy !== null) {
                message += `, caused by ${turnover.causedBy.last_name}`;
            }
            return message;
        }
        case ActionType.ClearAttempted: {
            const clearAttempted = action as ClearAttempted;
            if (clearAttempted.successful) {
                return `Clear by ${clearAttempted.by.last_name}`;
            }
            else {
                return `Clear attempted by ${clearAttempted.by.last_name}`;
            }
        }
        case ActionType.Penalty: {
            const penalty = action as Penalty;
            var message = `Penalty on ${penalty.by.last_name}`;
            if (penalty.duration !== null) {
                message += `, out for ${penalty.duration}`;
            }
            return message;
        }
        case ActionType.GroundBall: {
            const ground = action as GroundBall;
            return `Ground ball recovered by ${ground.by.last_name}`;
        }
        case ActionType.Timeout: {
            const timeout = action as Timeout;
            return `Timeout`;
        }
        case ActionType.Faceoff: {
            const faceoff = action as Faceoff;
            const wonBy = faceoff.homeWon ? faceoff.homePlayer : faceoff.awayPlayer;
            const lostBy = faceoff.homeWon ? faceoff.awayPlayer : faceoff.homePlayer;
            return `Faceoff won by ${wonBy.last_name}, lost by ${lostBy.last_name}`;
        }
    }
    return action.time;
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
                
                if (shot.goalie !== undefined) {
                    var goalie: PlayerStats = await getPlayerStats(shot.goalie.playerstat_id);
                    goalie.goals_allowed += polarity;
                    let test = await patchPlayerStats(goalie);
                    console.log(test);
                }
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
            if (turnover.by === null) {
                throw new Error("Missing parameters");
            }
            var turnoverBy: PlayerStats = await getPlayerStats(turnover.by.playerstat_id);
            turnoverBy.turnovers += polarity;
            await patchPlayerStats(turnoverBy);
            if (turnover.causedBy !== null) {
                var turnoverCausedBy: PlayerStats = await getPlayerStats(turnover.causedBy.playerstat_id);
                turnoverCausedBy.turnovers_caused += polarity;
                await patchPlayerStats(turnoverCausedBy);
            }
            break;
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
            var groundBy: PlayerStats = await getPlayerStats(ground.by.playerstat_id);
            groundBy.ground_balls += polarity;
            await patchPlayerStats(groundBy);
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