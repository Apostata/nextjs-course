import { Fragment, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllEventsWithReactQuery } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import {  IEvent } from '../../models/events_models';
import Head from 'next/head';

function FilteredEventsPage(props:PropsWithChildren) {
  const router = useRouter();
  const filterData = router.query.slug;

  const select = useCallback((data:IEvent[])=>{
    return data
  },[])

  const {data:loadedEvents, error, isLoading} = getAllEventsWithReactQuery(true, select)

  const filteredYear = filterData?.[0] || 'this current year';
  const filteredMonth = filterData?.[1] || 'and month';

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  const pageHeadData = (
    <Head>
    <title>Filtered Events</title>
    {filterData?.length >0? <meta name='description' content={`All events for ${numMonth}/${numYear}`}/>:<meta name='description' content='A List of filtered events'/>}
  </Head>
  )

  if (isLoading) {
    return <>{pageHeadData}<p className='center'>Loading...</p></>;
  }

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if(filteredEvents && !isLoading){
    const date = new Date(numYear, numMonth - 1);

    return (
      <Fragment>
        {pageHeadData}
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
      </Fragment>
    );
  }
}

export default FilteredEventsPage;
