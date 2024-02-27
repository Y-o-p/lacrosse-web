import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
        slug: params.slug
    }

	error(404, 'Not found');
}