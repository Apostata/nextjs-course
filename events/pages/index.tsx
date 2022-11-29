import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';
import { PropsWithChildren } from 'react';
import { Event } from '../models/events_models';
import Head from 'next/head'

interface Props extends PropsWithChildren{
  events: Event[]
}

function HomePage(props:Props) {
  return (
    <div>
      <Head>
        <title>Nextjs events</title>
        <meta name='description' content='Find a lot o great mocked events for you to spend your fucking time!'/>
      </Head>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  }
}

export default HomePage;
