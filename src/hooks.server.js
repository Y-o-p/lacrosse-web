import { connectToDB } from "$lib/db";
import { queryDB } from "$lib/db";
//import type { Handle } from "@sveltejs/kit";



export async function handle({event, resolve}) {
    console.log("Hello World");
    const dbconn = connectToDB();
    
    event.locals = { dbconn };
    console.log(await queryDB());

    //const response = await resolve(event);
    //dbconn.release();

    //return response;
    return await resolve(event);
} //satisfies Handle;