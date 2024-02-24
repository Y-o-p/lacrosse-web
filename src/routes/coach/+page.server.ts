// FOR DEMONSTRATION ONLY

import { getCoach } from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	return locals;
}