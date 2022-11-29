import { Fragment, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { Event } from '../../models/events_models';
import{ getAllEventsWithReactQuery} from '../../helpers/api-util'
import Head from 'next/head';

interface Props extends PropsWithChildren{
  events: Event[]
}

function AllEventsPage(props:Props) {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
       <Head>
        <title>All events</title>
        <meta name='description' content='Find a lot o great mocked events for you to spend your fucking time!'/>
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events
    },
    revalidate: 60
  };
}

export default AllEventsPage;
