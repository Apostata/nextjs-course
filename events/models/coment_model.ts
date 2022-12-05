export type CommentEntity ={
	email: string,
	name: string,
	text: string,
	eventId: string
}

export interface IComment extends CommentEntity{
	id: string
}
export class Comment implements IComment{
	id: string
	email: string
	name: string
	text: string
	eventId: string

	constructor(id: string,
		email: string,
		name: string,
		text: string,
		eventId: string,
	){
		this.id = id
		this.email = email
		this.name = name
		this.text = text
		this.eventId = eventId
	}
}