import { connectToDB } from "$lib/db";

export async function handle({event, resolve}) {
    console.log("Hello World");
    const dbconn = connectToDB();
    
    event.locals = { dbconn };

    return await resolve(event);
}