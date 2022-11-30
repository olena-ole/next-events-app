import { getAllEvents } from '../../helpers/api-utils'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function AllEventsPage(props) {
    const { allEvents } = props
    const router = useRouter()

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath)
    }

    return (
        <Fragment>
            <Head>
                <title>All Events</title>
                <meta name="description" content="Find a lot of great events that allow you to evolve..."/>
            </Head>
            <EventsSearch onSearch={findEventsHandler}/>
            <EventList items={allEvents}/>
        </Fragment>
    )
}

export async function getStaticProps() {
    const allEvents = await getAllEvents()

    return {
        props: {
            allEvents: allEvents
        },
        revalidate: 60
    }

}