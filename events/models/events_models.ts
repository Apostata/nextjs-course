export type EventEntity = {
	title: string
	image:string
	description:string
	date:string
	location: string
	isFeatured: boolean
  }


export interface IEvent extends EventEntity {
  id: string
}

export class Event implements IEvent{
	id: string
	title: string
	image: string
	description: string
	date: string
	location: string
	isFeatured: boolean
	constructor(event:IEvent){
		this.id = event.id
		this.title= event.title
		this.image = event.image
		this.description = event.description
		this.date = event.date
		this.location = event.location
		this.isFeatured = event.isFeatured
	}
}