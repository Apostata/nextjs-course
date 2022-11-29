import { Fragment, PropsWithChildren } from 'react';

import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import { IEvent, Event } from '../../models/events_models';
import { GetStaticProps } from 'next';
import { IGetStaticProps } from '../../models/next_modesls';
import Head from 'next/head';

interface Props extends PropsWithChildren{
  selectedEvent: IEvent
}

function EventDetailPage(props: Props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
       <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description}/>
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}



export const getStaticProps:GetStaticProps = async (context)=> {
  const eventId = context.params.eventId as string;

  const res = await getEventById(eventId);
  console.log(res)
  return {
    props: {
      selectedEvent: {...res} 
    },
    revalidate: 30
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  let paths: any;
  if(!(events instanceof Error)){
    paths = events.map(event => ({ params: { eventId: event.id } }));
  }
   
  return {
    paths: paths,
    fallback: 'blocking'
  };
}

export default EventDetailPage;
