import ScorebookModal from "../routes/my-team/live-stats/scorebookModal.svelte";
import { toJson } from "./util";

enum ActionType {
    Shot,

}

interface ScorebookAction {
    readonly actionType: ActionType;
    date: Date;
}

export interface Shot extends ScorebookAction {
    actionType: ActionType.Shot;
    shotBy: BigInt;
    goal: Boolean;
    assistedBy?: BigInt;
    savedBy?: BigInt;
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