import { Fragment, PropsWithChildren } from 'react';
import Head from 'next/head';

import { getEventById, getFeaturedEvents } from '../../helpers/fetch-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
// import ErrorAlert from '../../components/ui/error-alert';
import Comments from '../../components/input/comments';
import { IEvent } from '../../models/events_models';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface Props extends PropsWithChildren{
  selectedEvent: IEvent
}

function EventDetailPage(props: Props) {
  const router = useRouter();
  const eventId = router.query.eventId as string;
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
        <meta
          name='description'
          content={event.description}
        />
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
      <Comments eventId={eventId} />
    </Fragment>
  );
}

export const getStaticProps:GetStaticProps = async (context)=> {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId as string);

  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map(event => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: 'blocking'
  };
}

export default EventDetailPage;
