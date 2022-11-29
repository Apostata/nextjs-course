import { useQuery } from "react-query";
import { json } from "stream/consumers";
import { IEvent } from "../models/events_models";
import { firebaseResponseToJson, jsonToEvent, jsonToEvents } from "./transformation_utils";



export async function getAllEvents() {
  try{
    const response = await fetch('https://next-course-dd8a9-default-rtdb.firebaseio.com/events.json');
    const res = await response.json();
    const data = firebaseResponseToJson(res)
    return data
  } catch(e){

    return new Error("Error on getEvents");
  }
}

export async function getSingleEvent(id:string) {
  try{
    const response = await fetch(`https://next-course-dd8a9-default-rtdb.firebaseio.com/events/${id}.json`);
    const res = await response.json();
    return (res)
  } catch(e){

    return new Error("Error on getEvents");
  }
}


export const getAllEventsWithReactQuery =  (enabled:boolean, select?: (data: any) => IEvent[])=>{
	const {data, error, isLoading } = useQuery(['getSales'], async()=> {
		const res = await getAllEvents()
		return res
	}, {
		refetchOnWindowFocus: false,
		enabled,
    select: select? (data)=>select(data) : undefined
	})
	return {data, error, isLoading}
}

export async function getFeaturedEvents() {
  const  allEvents = await getAllEvents();
  if(!(allEvents instanceof Error) ){
    return allEvents.filter((event) => event.isFeatured)
  } else{
    return null
  }
  
}

export const getEventById = async (id:string) :Promise<IEvent | Error>=> {
  const json = await getSingleEvent(id);
  return jsonToEvent(json, id)
}

export async function getFilteredEvents(dateFilter:{year:number, month:number}) {
  const { year, month } = dateFilter;
  const json = await getAllEvents();
  const allEvents= jsonToEvents(json)

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}