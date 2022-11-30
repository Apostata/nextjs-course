export type CommentEntity ={
	email: string,
	name: string,
	text: string,
	eventId: string
}

export interface IComment extends CommentEntity{
	id: string
}