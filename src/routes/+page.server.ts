import type { PageServerLoad } from "./$types"
import { smantaSchedules } from "$lib/smanta"

export const load: PageServerLoad = () => {
	return {
		availableClass: smantaSchedules.availableClass().sort(),
		availableTeacher: smantaSchedules.availableTeacher().sort(),
	}
}