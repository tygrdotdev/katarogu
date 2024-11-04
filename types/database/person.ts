import Person from "@/types/person";

export default interface PersonCollection extends Person {
	_id: string;
	created: Date;
	updated: Date;
}