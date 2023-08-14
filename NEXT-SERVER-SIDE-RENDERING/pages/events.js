//// Example for CLIENT-SIDE DATA FETCHING + PRE-RENDERING:
import { useState } from 'react';
import { useRouter } from 'next/router';

const EventList = ({ eventList }) => {
  const [events, setEvents] = useState(eventList);
  const router = useRouter();

  const fetchSportEvents = async () => {
    const response = await fetch(`http://localhost:4000/events?category=sports`);
    const data = await response.json();
    setEvents(data);

    //add the route to the URL in the browser:
    router.push('/events?category=sports', undefined, { shallow: true })
  }

  return (
    <>
      <button onClick={fetchSportEvents} >Sport Events</button>
      <h1>List of Events:</h1>
      {events.map(event => {
        return (
          <div key={event.id}>
            <h2>
              {event.id} {event.title} {event.date} | {event.category}
            </h2>
            <p>{event.description}</p>
            <hr />
          </div>
        )
      })}
    </>
  )
}

export default EventList;

// fetch all events for SEO purposes first, but filter the events client-side with fetchSportEvents for the user, but the URL will still stay the same (user cannot share his filtered results as a link)
// for that we have to use shallow routing >> with which you can update URL in the browser without running the code inside getServerSideProps
// >> define the CONTEXT parameter > query > category
export async function getServerSideProps(context) {
  const { query } = context;
  const { category } = query;
  const queryString = category ? 'category=sports' : '';

  const response = await fetch(`http://localhost:4000/events?${queryString}`);
  const data = await response.json();

  return {
    props: {
      eventList: data,
    }
  }
}