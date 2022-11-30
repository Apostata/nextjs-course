export type CommentEntity ={
	email: string,
	name: string,
	text: string,
}

export interface IComment extends CommentEntity{
	id: string
}