import { IEvent, Event } from "../models/events_models"

export const jsonToEvents = (data:any)=>{
	return Object.keys(data).map((key)=>new Event({
		...jsonToEvent(data, key)
	})
)
}

export const jsonToEvent = (data:any, id:string)=>new Event({
		id,
		...data
		})

export const EventsToJson = (events:Event[]) : IEvent[] =>{
	return events.map(event=>eventToJson(event))
}

export const eventToJson = (event:Event) : IEvent =>({...event})
	
export const firebaseResponseToJson = (res:any)=>{
	return Object.keys(res).map(key=>({
		id:key,
		...res[key]
	}))
}