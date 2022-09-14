import type { PageServerLoad } from './$types';
import { smantaSchedules } from '$lib/smanta';

export const load: PageServerLoad = ({ setHeaders }) => {
	setHeaders({
		'Cache-Control': 'public, max-age=7200'
	});
	return {
		availableClass: smantaSchedules.availableClass().sort(),
		availableTeacher: smantaSchedules.availableTeacher().sort()
	};
};
