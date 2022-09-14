export interface Subject {
	class: string;
	day: number;
	name: string;
	teacher: string | null;
	startAt: string;
	duration: number;
}

export interface ScheduleDefinition {
	class: string;
	day: number;
	subjects: Subject[];
}

export class Schedules {
	subjects: Subject[];
	#class: string;
	#day: number;
	constructor() {
		this.subjects = [];
	}

	create(c: string, day: number) {
		this.#class = c;
		this.#day = day;
		return this;
	}

	addSubject(duration: number, startAt: string, name?: string, teacher?: string) {
		const prevSubject = this.subjects.at(-1) || {};
		const subject: Subjects = {
			class: this.#class,
			day: this.#day,
			startAt,
			duration,
			name: name ?? prevSubject.name,
			teacher: teacher === null ? teacher : teacher || prevSubject.teacher
		};
		this.subjects.push(subject);
		return this;
	}

	availableClass(): string[] {
		const set = new Set();
		for (const subject of this.subjects) {
			set.add(subject.class);
		}
		return [...set];
	}

	availableTeacher(): string[] {
		const set = new Set();
		for (const subject of this.subjects) {
			if (subject.teacher === null) {
				continue;
			}
			set.add(subject.teacher);
		}
		return [...set];
	}
}
