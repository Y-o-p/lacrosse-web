import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
        id: params.id
    }

	error(404, 'Not found');
}