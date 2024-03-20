// This script is specifically for use by the /api routes.

import { error, json } from "@sveltejs/kit";
import { deleteRowsFromVals, getRowsFromVals } from "./db";
import { objFromUrlParams } from "./util";

export async function selectRowsFromUrlParams(tableName: string, urlParams: URLSearchParams): Promise<Response> {
    return responseFromFunction(async () => { 
        const obj = objFromUrlParams(urlParams);
        return getRowsFromVals(tableName, obj);
    });
}

export async function deleteRowsFromUrlParams(tableName: string, urlParams: URLSearchParams): Promise<Response> {
    return responseFromFunction(async () => { 
        const obj = objFromUrlParams(urlParams);
        return deleteRowsFromVals(tableName, obj);
    });
}

export async function responseFromFunction(func: Function): Promise<Response> {
    try {
        const result = await func();
        return json(result);
    }
    catch (err) {
        console.log(err);
        return error(500, "Internal Server Error");
    }
}