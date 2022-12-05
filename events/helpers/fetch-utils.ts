import { IComment } from './../models/coment_model';
import { useQuery, useMutation, useQueryClient } from "react-query"


import { IEvent } from "../models/events_models";
import { firebaseResponseToJson, jsonToEvent, jsonToEvents } from "./transformation_utils";


export  const getAllEvents= async () =>{
  try{
    const response = await fetch('https://next-course-dd8a9-default-rtdb.firebaseio.com/events.json');
    const res = await response.json();
    const data = firebaseResponseToJson(res)
    return data
  } catch(e){

    return new Error("Error on getEvents");
  }
}

export  const getAllCommentsByEventId= async (id:string) =>{
	try{
	  const response = await fetch(`/api/events/${id}/comments`);
	  const res = await response.json();
	  return res
	} catch(e){
  
	  return new Error(`Error on getComments from the event:${id}`);
	}
  }

export  const getSingleEvent = async (id:string) => {
  try{
    const response = await fetch(`https://next-course-dd8a9-default-rtdb.firebaseio.com/events/${id}.json`);
    const res = await response.json();
    return res
  } catch(e){

    return new Error("Error on getEvents");
  }
}

export  const getFeaturedEvents = async () =>{
  const  allEvents = await getAllEvents();
  if(!(allEvents instanceof Error) ){
    return allEvents.filter((event) => event.isFeatured)
  } else{
    return null
  }
  
}

export const getEventById = async (id:string) :Promise<IEvent | Error>=> {
  const json = await getSingleEvent(id);
//   return jsonToEvent(json, id)
return json
}

export  const  getFilteredEvents = async (dateFilter:{year:number, month:number})=> {
  const { year, month } = dateFilter;
  const json = await getAllEvents();
  const allEvents= jsonToEvents(json)

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}


const postNewsletterSignUp = async (email:string) =>{
	try{
		const response = await fetch('/api/newsletters',{
			method: 'POST',
			body:JSON.stringify({email}),
			headers:{
			'Content-Type': 'application/json'
			}
		})
		const data = await response.json()
	  	return data
	} catch(e){
		return new Error('Error on signup to newsletter')
	}
}

const postEventComment = async (comment:IComment) =>{
	const {email, name, text, eventId} = comment
	try{
		const response = await fetch('/api/comments',{
			method: 'POST',
			body:JSON.stringify({email, name, text, eventId}),
			headers:{
			'Content-Type': 'application/json'
			}
		})
		const data = await response.json()
	  	return data
	} catch(e){
		return new Error('Error on add comment')
	}
}

// React queries and mutations
export const getAllEventsWithReactQuery =  (enabled:boolean, select?: (data: any) => IEvent[])=>{
	const {data, error, isLoading } = useQuery(['getEvents'], async()=> {
		const res = await getAllEvents()
		return res
	}, {
		refetchOnWindowFocus: false,
		enabled,
    select: select? (data)=>select(data) : undefined
	})
	return {data, error, isLoading}
}


export const getAllCommentsByEventIdsWithReactQuery =  (eventId:string, enabled:boolean, select?: (data: any) => IComment[])=>{
	const {data, error, isLoading } = useQuery(['getCommentsByEventId', eventId], async()=> {
		const res = await getAllCommentsByEventId(eventId)
		return res?.data
	}, {
		refetchOnWindowFocus: false,
		enabled,
    select: select? (data)=>select(data) : undefined
	})
	return {data, error, isLoading}
}

export const postNewsletterUserAddMutation = (onSuccessCallback?:(data: any, variables: string, context: unknown) => void | Promise<unknown>) =>{
	const {mutate:signUp, error, isSuccess, data:res} = useMutation(postNewsletterSignUp, {onSuccess: onSuccessCallback})
	return {signUp, error, isSuccess, data:res?.data}
}

export const postEventCommentAddMutation = (onSuccessCallback?:(data: any, variables: IComment, context: unknown) => void | Promise<unknown>) =>{
	const {mutate:postComment, error, isSuccess, isLoading, data:res} = useMutation(postEventComment, {onSuccess: onSuccessCallback})
	return {postComment, error, isSuccess, isLoading, data:res?.data}
}