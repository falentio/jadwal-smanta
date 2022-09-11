import type { PageServerLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { smantaSchedules } from "$lib/smanta"

export const load: PageServerLoad = ({ params }) => {
	if (!smantaSchedules.availableClass().includes(params.className.replace(/-/gi, " "))) {
		throw error(404, "class not found")
	}
	const schedules = smantaSchedules.subjects
			.filter(i => i.class.replace(/\s/gi, "-") === params.className)
	return {
		schedules,
	}
}