import type { RequestEvent } from "@sveltejs/kit"
import { getUserById } from '$lib/db';

export const authenticateUser = (event: RequestEvent) => {
    // get the cookies from the request
    const { cookies } = event

    // get the user token from the cookie
    const userToken = cookies.get("auth")
    return userToken
}