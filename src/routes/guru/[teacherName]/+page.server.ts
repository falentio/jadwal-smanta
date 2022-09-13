import type { PageServerLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { smantaSchedules } from "$lib/smanta"

export const load: PageServerLoad = ({ params }) => {
	if (!smantaSchedules.availableTeacher().includes(params.teacherName.replace(/-/gi, " "))) {
		throw error(404, "teacher not found")
	}
	const schedules = smantaSchedules.subjects
			.filter(i => i.teacher?.replace(/\s/gi, "-") === params.teacherName)
	return {
		schedules,
	}
}