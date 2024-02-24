export async function handle({event, resolve}) {    
    event.locals = { 
        user: "webmaster"
    };

    return await resolve(event);
}