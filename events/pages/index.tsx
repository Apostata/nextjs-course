import Head from 'next/head';

import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import { PropsWithChildren } from 'react';
import { Event } from '../models/events_models';
import { GetStaticProps } from 'next';
interface Props extends PropsWithChildren{
  events: Event[]
}

const HomePage = (props: Props)=> {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export  const getStaticProps:GetStaticProps = async() => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
